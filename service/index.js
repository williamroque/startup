const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const app = express();

const {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getUserList
} = require('./database');

const { rapidAPIKey } = require('./keys');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await getUser(req.body.username)) {
        res.status(409).send({ msg: 'User already exists' });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await getUser(req.body.username);
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
    const user = await getUserByToken(req.cookies[authCookieName]);
    if (user) {
        await updateUser(user.username, { token: null });
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await getUserByToken(req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.get('/gallery/:username', verifyAuth, async (req, res) => {
    const { username } = req.params;

    if (username) {
        const user = await getUser(username);

        if (!user) {
            res.status(404).send({ msg: 'User does not exist' });
        } else {
            res.send(user.gallery);
        }
    } else {
        const user = await getUserByToken(req.cookies[authCookieName]);
        res.send(user.gallery);
    }
});

apiRouter.get('/gallery', verifyAuth, async (req, res) => {
    const user = await getUserByToken(req.cookies[authCookieName]);
    res.send(user.gallery);
});

apiRouter.get('/user-dictionary', verifyAuth, async (req, res) => {
    const user = await getUserByToken(req.cookies[authCookieName]);
    res.send(user.dictionary);
});

apiRouter.get('/user-list', verifyAuth, async (req, res) => {
    res.send(await getUserList());
});

apiRouter.get('/stroke-order-url/:character', verifyAuth, async (req, res) => {
    const { character } = req.params;
    
    const response = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${character}`, {
        method: 'get',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-rapidapi-key': rapidAPIKey,
            'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com'
        }
    });

    if (response?.status === 200) {
        const data = await response.json();
        const url = data.kanji.video.mp4;

        res.send({ url });
    } else {
        res.status(response.status).send(null);
    }
});

apiRouter.post('/add-frame', verifyAuth, async (req, res) => {
    const user = await getUserByToken(req.cookies[authCookieName]);
    user.gallery.push(req.body);
    await updateUser(user.username, { gallery: user.gallery });

    res.send(user.gallery);
});

apiRouter.post('/add-character', verifyAuth, async (req, res) => {
    const user = await getUserByToken(req.cookies[authCookieName]);
    user.dictionary.push(...[].concat(req.body));
    await updateUser(user.username, { dictionary: user.dictionary });

    res.send(user.dictionary);
});

apiRouter.post('/remove-frame', verifyAuth, async (req, res) => {
    const user = await getUserByToken(req.cookies[authCookieName]);
    user.gallery = user.gallery.filter(frame => frame.id !== req.body.id);
    await updateUser(user.username, { gallery: user.gallery });

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
        dictionary: ['石', '水', '木', '土', '金', '火']
    };
    
    await addUser(user);
    return user;
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
