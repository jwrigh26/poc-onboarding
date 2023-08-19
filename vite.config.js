import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TurnedIn } from './node_modules/@mui/icons-material/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: false, // Disabling esbuild, since we'll be using swc
  swc: {
    jsxImportSource: '@emotion/react',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    flow: true,
    // Additional SWC options can be provided here as needed.
  },
  server: {
    port: 9090, // will be used if available, or the next free one if not
  },
  build: {
    target: 'es2018', // You can adjust the target based on your browser support requirements
    // Additional build options can be provided here as needed.
  },
  // More configuration options can be included based on your project's requirements.
});
