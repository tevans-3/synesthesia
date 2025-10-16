import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    server: {
    port: 64381
    }, 
    "scripts": { 
      "start":"react-scripts start",
    "build": "GENERATE_SOURCEMAP=false react-scripts build", 
    "test": "react-scripts test --env=jsdom", 
    "eject": "react-scripts eject"
  }
  })
