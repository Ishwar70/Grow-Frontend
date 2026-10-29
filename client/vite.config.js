import {defineConfig} from 'vite';
export default defineConfig({server:{port:5173,proxy:{'/api':'https://grow-backend-lake.vercel.app'}},build:{cssCodeSplit:true}});
