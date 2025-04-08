import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

const webAppManifest = {
  registerType: 'prompt',
  includeAssets: ['**/*'],
  manifest: {
    name: 'MERN Stack Template',
    short_name: 'MERN App',
    description:
      'An app which is used as a Template for MERN stack applications.',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#181818',
    background_color: '#e8eac2',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env,
    },
    plugins: [react(), tailwindcss(), VitePWA(webAppManifest)],
  };
});
