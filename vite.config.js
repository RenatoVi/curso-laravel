import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        server: {
            host: '0.0.0.0',
            hmr: {
                host: process.env.VITE_APP_HOST,
                clientPort: 5173,
                protocol: 'ws',
            },
            port: 5173,
            watch: {
                usePolling: true,
            }
        },
        plugins: [
            laravel({
                input: [
                    'resources/css/app.css',
                    'resources/js/app.js',
                ],
                refresh: true,
            }),
        ],
    });
};
