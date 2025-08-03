import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			include: '**/*.svg',
		}),
	],
	server: {
		proxy: {
			'/coingecko': {
				target: 'https://api.coingecko.com/api/v3',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/coingecko/, ''),
			},
		},
	},
});
