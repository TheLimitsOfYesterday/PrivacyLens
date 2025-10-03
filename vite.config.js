import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
    plugins: [svelte()],
    build: {
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'src/popup/popup.html'),
                background: resolve(__dirname, 'src/background/background.html'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
        outDir: 'dist',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            lines: 80,
            functions: 80,
            branches: 80,
            statements: 80,
        },   
    },
});