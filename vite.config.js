import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
    plugins: [
        reactRefresh()
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            }
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: './src/index.jsx', // 修改为相对于项目根目录的路径
            }
        }
    }
});