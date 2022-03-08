import { defineConfig } from 'vite';
import * as path from 'path'
const prefix = `monaco-editor/esm/vs`;
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    jsonWorker: [`${prefix}/language/json/json.worker`],
                    // cssWorker: [`${prefix}/language/css/css.worker`],
                    // htmlWorker: [`${prefix}/language/html/html.worker`],
                    tsWorker: [`${prefix}/language/typescript/ts.worker`],
                    editorWorker: [`${prefix}/editor/editor.worker`],
                },
            },
        },
    },
    resolve: {
        alias: {
            '@/': path.join(__dirname, './src/'),
        },
    },
});
