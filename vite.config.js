import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0', // Escucha en todas las interfaces de red
    port: parseInt(process.env.PORT) || 4173, // Usa el puerto asignado por Railway
  },
});
