## Kumpulan Fitur

### Mengubah Format Angka Menjadi Mata Uang Rupiah Menggunakan Intl.NumberFormat

Intl.NumberFormat adalah bagian dari API Internationalization (Intl) di JavaScript yang menyediakan cara mudah untuk memformat angka ke dalam bentuk yang lebih sesuai dengan budaya atau lokal tertentu. kita dapat menggunakannya untuk memformat angka ke dalam format mata uang, persen, dan lain-lain.

Untuk mengubah format angka menjadi mata uang Rupiah, kita dapat menggunakan Intl.NumberFormat dengan menyertakan lokal id-ID (Bahasa Indonesia) dan opsi mata uang IDR. Untuk menjaga kode tetap terorganisir dan mudah diakses, disarankan untuk menyimpan fungsi format mata uang dalam folder khusus yang menyimpan utility functions atau helper functions. Sebagai contoh, kita bisa membuat folder `utils` atau `helpers` di dalam root directory atau di dalam folder `src `jika kita menggunakan struktur proyek yang lebih kompleks. Berikut langkah-langkahnya:

- Buat folder `utils` di root directory atau di dalam folder `src`.
- Buat file `currencyFormatter.ts` di dalam folder `utils`.
- Buat fungsi format mata uang di dalam file tersebut.

  ```ts
  // src/utils/currencyFormat.ts

  export const formatToRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  ```

- Impor dan gunakan fungsi tersebut di mana pun kita membutuhkannya dalam proyek kita.

  ```tsx
  // src/components/ProductCard.ts

  import { ProductType } from '../types/ProductTypes';
  import { formatToRupiah } from '../utils/currencyFormatter';

  const ProductCard = ({
    _id,
    name,
    image,
    price,
    description,
  }: ProductType) => {
    return (
      <div key={_id} className="shadow-xl card bg-base-300">
        <figure>
          <img src={image} alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-primary">{name}</h2>
          <p className="font-bold text-accent">{formatToRupiah(price)}</p>
          <p>{description.substring(0, 5)}...</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
  };

  export default ProductCard;
  ```

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

Berikut adalah tutorial langkah demi langkah untuk membuat koneksi antara project backend dan project frontend menggunakan [Vite proxy](https://v3.vitejs.dev/config/server-options.html#server-proxy) dan [concurrently](https://www.npmjs.com/package/concurrently) [ref](https://www.youtube.com/watch?v=iQuw7aK39i0&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=4):

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

## Mengatur API Calls dengan Axios

Dalam mengembangkan aplikasi web dengan React, seringkali kita perlu berkomunikasi dengan server melalui API. Mengatur pemanggilan API dengan baik adalah best practice untuk menjaga kode tetap bersih, mudah dipelihara, dan konsisten. Kita akan belajar cara mengatur pemanggilan API di aplikasi React menggunakan Axios dan TypeScript [ref](https://www.youtube.com/watch?v=MAEaXwQ91mo&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=5).

1. Buat File Konfigurasi API <br/>
   File ini berisi konfigurasi dasar untuk semua pemanggilan API menggunakan Axios. Tujuannya untuk membuat instance Axios yang bisa digunakan kembali di seluruh aplikasi.

   ```js
   // src/api.ts

   import axios from 'axios';

   const customAPI = axios.create({
     baseURL: '/api/v1',
   });

   export default customAPI;
   ```

2. Lakukan pemanggilan API menggunakan instance axios yang kita buat tadi <br/>

   ```js
   // src/pages/HomeView.tsx

   import { useEffect, useState } from 'react';
   import customAPI from '../api';

   const HomeView = () => {
     const [products, setProducts] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     const getAllProducts = async () => {
       try {
         setIsLoading(true);
         const response = await customAPI.get('/products');
         setProducts(response?.data?.data);
         setIsLoading(false);
       } catch (error) {
         console.log(error);
       } finally {
         setIsLoading(false);
       }
     };

     useEffect(() => {
       getAllProducts();
     }, []);

     console.log(products);
     console.log(isLoading);

     return <div className="text-red-600 font-bold underline">HomeView</div>;
   };

   export default HomeView;
   ```

## Form Filter untuk Produk Menggunakan React Router

Dalam pengembangan aplikasi, misalnya aplikasi e-commerce, form filter adalah fitur penting yang membantu user menemukan produk dengan lebih mudah. Kali ini akan membahas cara membuat form filter produk dengan menggunakan React dan React Router. Kita akan membuat form filter yang mencakup input pencarian dan dropdown kategori.

1. Membuat Komponen Input Form <br/>
   Komponen pertama yang akan kita buat adalah komponen `FormInput` yang akan digunakan untuk menerima input pencarian dari user.

   ```tsx
   // src/components/form/FormInput.tsx
   interface FormInputType {
     defaultValue?: string;
     label: string;
     type: string;
     name: string;
   }

   const FormInput = ({ label, name, type, defaultValue }: FormInputType) => {
     return (
       <label className="form-control">
         <label className="label">
           <span className="capitalize label-text">{label}</span>
         </label>
         <input
           type={type}
           name={name}
           defaultValue={defaultValue}
           className="input input-bordered"
         />
       </label>
     );
   };

   export default FormInput;
   ```

   Komponen ini menerima properti label, name, type, dan defaultValue yang digunakan untuk membuat input form bisa dijadikan reusable.

2. Membuat Komponen Select Form<br/>
   Komponen kedua adalah FormSelect yang akan digunakan untuk memilih kategori produk.

   ```tsx
   // src/components/form/FormSelect.tsx
   interface FormSelectType {
     defaultValue?: string;
     label: string;
     list: string[];
     name: string;
   }

   const FormSelect = ({ defaultValue, label, list, name }: FormSelectType) => {
     return (
       <div className="form-control">
         <label className="label">
           <span className="capitalize label-text">{label}</span>
         </label>
         <select
           name={name}
           defaultValue={defaultValue}
           className="select select-bordered"
         >
           {list.map((item) => (
             <option key={item} value={item}>
               {item}
             </option>
           ))}
         </select>
       </div>
     );
   };

   export default FormSelect;
   ```

Komponen ini menerima properti label, name, list, dan defaultValue untuk membuat dropdown yang dapat digunakan ulang.

4. Membuat Komponen Filter<br/>
   Setelah kita memiliki komponen input dan select, kita akan membuat komponen Filter yang menggabungkan kedua komponen tersebut.

   ```tsx
   // src/components/Filter.tsx

   import { Form, Link, useLoaderData } from 'react-router-dom';
   import FormInput from './form/FormInput';
   import FormSelect from './form/FormSelect';

   const Filter = () => {
     const categories = ['Sepatu', 'Baju', 'Celana'];
     const { params } = useLoaderData() as {
       params: { [key: string]: string };
     };
     const { name, category } = params;

     return (
       <Form
         method="get"
         className="grid grid-cols-2 px-8 py-4 rounded-md bg-base-200 gap-x-4 gap-y-3"
       >
         <FormInput
           label="Search Product"
           name="name"
           type="search"
           defaultValue={name}
         />
         <FormSelect
           label="Select category"
           name="category"
           list={categories}
           defaultValue={category}
         />
         <button type="submit" className="btn btn-primary">
           Search
         </button>
         <Link to={'/products'} className="btn btn-accent">
           Reset
         </Link>
       </Form>
     );
   };

   export default Filter;
   ```

   Komponen ini menggabungkan FormInput dan FormSelect serta menyediakan tombol Search dan Reset. Data dari loader digunakan untuk mengisi nilai default pada form.

5. Menyiapkan Loader untuk Mengambil Data Produk<br/>
   Loader digunakan untuk mengambil data produk dari API sebelum komponen dirender.

   ```tsx
   import { useLoaderData } from 'react-router-dom';
   import customAPI from '../api';
   import { ProductType } from '../types/ProductTypes';
   import Filter from '../components/Filter';
   import ProductCard from '../components/ProductCard';

   //------------------------------------------------------------------------------------------------------------
   export const ProductViewLoader = async ({
     request,
   }: {
     request: Request;
   }) => {
     const params = Object.fromEntries([
       ...new URL(request?.url).searchParams.entries(),
     ]);

     const response = await customAPI.get('/products', { params: params });
     console.log('request', request);
     console.log('params', params);

     const products = response?.data?.data;

     return { products, params };
   };
   //------------------------------------------------------------------------------------------------------------

   const ProductView = () => {
     return <div>Product View</div>;
   };

   export default ProductView;
   ```

6. Import dan assign loader di product view tadi di bagian router <br/>

   ```tsx
   // src/App.tsx

   import { createBrowserRouter, RouterProvider } from 'react-router-dom';

   // Components
   import PublicLayout from './layouts/PublicLayout';
   import HomeView from './pages/HomeView';
   import ProductView from './pages/ProductView';
   import OrderView from './pages/OrderView';
   import CartView from './pages/CartView';
   import AboutView from './pages/AboutView';
   import LoginView from './pages/auth/LoginView';
   import Register from './pages/auth/Register';
   import DetailProduct from './pages/DetailProduct';

   // Loader
   import { HomeLoader } from './pages/HomeView';
   //---------------------------------------------------------------------------------
   import { ProductViewLoader } from './pages/ProductView';
   //---------------------------------------------------------------------------------

   const router = createBrowserRouter([
     {
       path: '/',
       element: <PublicLayout />,
       children: [
         {
           index: true,
           element: <HomeView />,
           loader: HomeLoader,
         },
         {
           path: 'products',
           element: <ProductView />,
           //---------------------------------------------------------------------------------
           loader: ProductViewLoader,
           //---------------------------------------------------------------------------------
         },
         {
           path: 'products/:id',
           element: <DetailProduct />,
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

7. Ambil data product dengan memanfaatkan `useLoader`<br/>

   ```tsx
   // src/pages/ProductView.tsx

   import { useLoaderData } from 'react-router-dom';
   import customAPI from '../api';
   import { ProductType } from '../types/ProductTypes';
   import Filter from '../components/Filter';
   import ProductCard from '../components/ProductCard';

   export const ProductViewLoader = async ({
     request,
   }: {
     request: Request;
   }) => {
     const params = Object.fromEntries([
       ...new URL(request?.url).searchParams.entries(),
     ]);

     const response = await customAPI.get('/products', { params: params });
     console.log('request', request);
     console.log('params', params);

     const products = response?.data?.data;

     return { products, params };
   };

   const ProductView = () => {
     //----------------------------------------------------------------------------------
     const { products } = useLoaderData() as { products: ProductType[] };
     console.log(products);
     //----------------------------------------------------------------------------------

     return <div>Product View</div>;
   };

   export default ProductView;
   ```

8. Tambahkan komponen Filter di pages `Product View`

   ```tsx
   // src/pages/ProductView

   import { useLoaderData } from 'react-router-dom';
   import customAPI from '../api';
   import { ProductType } from '../types/ProductTypes';
   import Filter from '../components/Filter';
   import ProductCard from '../components/ProductCard';

   export const ProductViewLoader = async ({
     request,
   }: {
     request: Request;
   }) => {
     const params = Object.fromEntries([
       ...new URL(request?.url).searchParams.entries(),
     ]);

     const response = await customAPI.get('/products', { params: params });
     console.log('request', request);
     console.log('params', params);

     const products = response?.data?.data;
     console.log(products);

     return { products, params };
   };

   const ProductView = () => {
     const { products } = useLoaderData() as { products: ProductType[] };

     return (
       <>
         <Filter />
         <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-3 lg:grid-cols-4">
           {!products?.length ? (
             <h1 className="text-3xl font-bold col-span-full">
               Produk tidak ditemukan
             </h1>
           ) : (
             products?.map((product) => (
               <ProductCard
                 key={product?._id}
                 name={product?.name}
                 category={product?.category}
                 description={product?.description}
                 image={product?.image}
                 _id={product?._id}
                 price={product?.price}
                 stock={product?.stock}
               />
             ))
           )}
         </div>
       </>
     );
   };

   export default ProductView;
   ```
