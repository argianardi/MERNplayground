## Manage pages Menggunakan React Router Dom

Berikut langkah - langkahnya [ref](https://www.youtube.com/watch?v=57fS83g11m8&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=6):

- Install [react router dom](https://reactrouter.com/en/main/start/tutorial)
- Buat konfigurasi pages menggunakan react router dom

  ```js
  // src/app.js

  import { createBrowserRouter, RouterProvider } from 'react-router-dom';
  import PublicLayout from './layouts/PublicLayout';
  import HomeView from './pages/HomeView';
  import ProductView from './pages/ProductView';
  import OrderView from './pages/OrderView';
  import CartView from './pages/CartView';
  import AboutView from './pages/AboutView';
  import LoginView from './pages/auth/LoginView';
  import Register from './pages/auth/Register';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <HomeView />,
        },
        {
          path: 'products',
          element: <ProductView />,
        },
        {
          path: 'orders',
          element: <OrderView />,
        },
        {
          path: 'cart',
          element: <CartView />,
        },
        {
          path: 'about',
          element: <AboutView />,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginView />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  ]);

  function App() {
    return <RouterProvider router={router} />;
  }

  export default App;
  ```

## Layoting Responsive halaman WEB (Header, Main dan Footer ) dengan DaisyUI

Dibahas lebih lanjut [di sini](https://www.youtube.com/watch?v=BOfD3fOMbMM&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=5)

## Buat Koneksi Antar BACKEND dan FRONTEND dengan VITE Menggunakan Concurrently

Berikut adalah tutorial langkah demi langkah untuk membuat koneksi antara project backend dan project frontend menggunakan [Vite proxy](https://v3.vitejs.dev/config/server-options.html#server-proxy) dan [concurrently](https://www.npmjs.com/package/concurrently):

1. Buat File Package di Folder Pembungkus project Backend dan Frontend <br/>
   Arahkan terminal ke folder pembungkus project backend dan project frontend, dengan command:

   ```js
   npm init -y
   ```

2. Install Package [Concurrently](https://www.npmjs.com/package/concurrently) <br/>

3. Tambahkan Konfigurasi untuk menjalankan project backend dan project frontend dalam satu command. <br/>
   Buka file package.json yang ada di folder pembungkus project backend dan frontend.

   ```js
   // package.json

   {
     "name": "mernplayground",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       //------------------------------------------------------------------------------------------------
       "server": "npm run dev --prefix server",
       "client": "npm run dev --prefix client",
       "dev": "concurrently \"npm run server\" \"npm run client\""
       //------------------------------------------------------------------------------------------------
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "dependencies": {
       "concurrently": "^8.2.2"
     }
   }
   ```

   Concurrently adalah package npm yang dirancang untuk memudahkan pengembangan dengan memungkinkan beberapa perintah atau skrip berjalan secara bersamaan dalam satu proses terminal. Ini sangat berguna dalam skenario pengembangan di mana kita mungkin perlu menjalankan server backend dan frontend secara paralel. Concurrently ini sangat berguna untuk menjalankan beberapa perintah secara bersamaan dalam satu terminal, yang sangat berguna dalam pengembangan web di mana sering kali diperlukan untuk menjalankan server frontend dan backend secara bersamaan. Dalam contoh ini:

   - client menjalankan server frontend.
   - server menjalankan server backend.
   - dev menggunakan concurrently untuk menjalankan kedua perintah (npm run server dan npm run client) secara bersamaan.
   - Setelah dikonfigurasi, kita dapat menjalankan kedua server secara bersamaan dengan satu command `npm run dev`

4. Konfigurasi Vite Server Proxy <br/>
   Buka file vite.config.js yang ada di folder frontend. Tambahkan konfigurasi untuk mendaftarkan api dari project backend yang akan kita hubungkan ke project frontend.

   ```js
   // vite.config.ts

   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react-swc';

   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3001',
           changeOrigin: true,
         },
       },
     },
   });
   ```

5. Pengujian API dengan Axios di Project Frontend <br/>
   Buat atau buka file komponen React di folder frontend untuk melakukan pengujian API dari project backend yang ingin kita hubungkan.

   ```js
   import axios from 'axios';

   try {
     const data = await axios.get('/api/v1/products');
     console.log(data);
   } catch (error) {
     console.log(error);
   }

   const HomeView = () => {
     return <div className="text-red-600 font-bold underline">HomeView</div>;
   };

   export default HomeView;
   ```
