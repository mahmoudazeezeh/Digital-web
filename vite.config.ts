import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Digital-web/',    // <-- ضع اسم مستودعك هنا مع سلاش في البداية والنهاية
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
