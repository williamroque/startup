const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'User already exists' });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ username: user.username });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.get('/gallery/:username', verifyAuth, async (req, res) => {
    const { username } = req.params;

    if (username) {
        const user = await findUser('username', username);

        if (!user) {
            res.status(404).send({ msg: 'User does not exist' });
        } else {
            res.send(user.gallery);
        }
    } else {
        const user = await findUser('token', req.cookies[authCookieName]);
        res.send(user.gallery);
    }
});

apiRouter.get('/gallery', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    res.send(user.gallery);
});

apiRouter.get('/user-dictionary', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    res.send(user.dictionary);
});

apiRouter.post('/add-frame', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    user.gallery.push(req.body);

    res.send(user.gallery);
});

apiRouter.post('/add-character', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    user.dictionary.push(req.body);

    res.send(user.dictionary);
});

apiRouter.post('/remove-frame', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    user.gallery = user.gallery.filter(frame => frame.id !== req.body.id);

    res.send(user.gallery);
});

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        gallery: [],
        dictionary: []
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
