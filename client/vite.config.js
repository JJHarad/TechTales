import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist', 
    chunkSizeWarningLimit: 1000 // ✅ Ensure this is correct
  }
});
/*import { defineConfig } from 'vite';
iimport { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ Ensure correct output directory
    chunkSizeWarningLimit: 1000 // ✅ Increase chunk limit if needed
  }
});

});
*/
 