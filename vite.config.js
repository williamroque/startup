import { defineConfig } from 'vite';


export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:4000',
        },
        host: '0.0.0.0'
    },
});
