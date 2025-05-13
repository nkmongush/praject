import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { ghPages } from 'vite-plugin-gh-pages';

const base = process.env.NODE_ENV === 'production' ? '/project-LevelUP/' : '/';

export default defineConfig({
    base: base,
    plugins: [
        vue(),
        ghPages()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        assetsInlineLimit: 4096,
        outDir: 'dist', // Убедитесь, что указана папка dist
        emptyOutDir: true, // Очищать папку dist перед каждой сборкой
    },
});