## Key Word

- <details open>
    <summary><a href="#kumpulan-fitur">Kumpulan Fitur</a></summary>
    <ul>
      <li><a href="#mengubah-format-angka-menjadi-mata-uang-rupiah-menggunakan-intlnumberformat">Konversi Number ke Rupiah</a></li>
    </ul>
  </details>
- [Manage Pages Menggunakan React Router Dom](#manage-pages-menggunakan-react-router-dom)
- [Layoting Responsive halaman WEB (Header, Main dan Footer ) dengan DaisyUI](#layoting-responsive-halaman-web-header-main-dan-footer--dengan-daisyui)
- [Buat Koneksi Antar BACKEND dan FRONTEND dengan VITE Menggunakan Concurrently](#buat-koneksi-antar-backend-dan-frontend-dengan-vite-menggunakan-concurrently)
- [Mengatur API Calls dengan Axios](#mengatur-api-calls-dengan-axios)
- [Form Filter untuk Produk Menggunakan React Router](#form-filter-untuk-produk-menggunakan-react-router)
- [Manage pages Menggunakan React Router Dom](#manage-pages-menggunakan-react-router-dom)
- <details open>
      <summary><a href="#fitur-login-dan-register">Fitur Login dan Register</a></summary>
      <ul>
        <li><a href="#fitur-login-dan-register-tanpa-global-state">Fitur  Login dan Register Tanpa Global State</a></li>
        <li><details open>
          <ul>
            <li><a href="#mengapa-tidak-menggunakan-usestate-untuk-input-form">Mengapa Tidak Menggunakan useState untuk Input Form?</a></li>
            <li><a href="#mengelola-state-dan-validasi-form-untuk-fitur-login-dan-register-dengan-custom-hook">Mengelola State dan Validasi Form untuk Fitur Login dan Register dengan Custom Hook</a></li>
          </ul>
        </details></li>
      </ul>
    </details>
  <!-- - <details open>
      <summary><a href="#fitur-login-dan-register">Fitur Login dan Register</a></summary>
      <ul>
        <li><a href="#fitur-login-dan-register-tanpa-global-state">Fitur  Login dan Register Tanpa Global State</a></li>
        <li><details open>
          <summary><a href="#mengapa-tidak-menggunakan-usestate-untuk-input-form">Mengapa Tidak Menggunakan useState untuk Input Form?</a></summary>
          <ul>
            <li><a href="#usestate-untuk-object">useState Untuk Object</a></li>
            <li><a href="#usestate-untuk-nesting-object">useState Untuk Nesting Object</a></li>
          </ul>
        </details></li>
      </ul>
    </details> -->

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

Dalam pengembangan aplikasi, misalnya aplikasi e-commerce, form filter adalah fitur penting yang membantu user menemukan produk dengan lebih mudah. Kali ini akan membahas cara membuat form filter produk dengan menggunakan React dan React Router. Kita akan membuat form filter yang mencakup input pencarian dan dropdown kategori. Berikut langkah - langkahnya [ref](https://www.youtube.com/watch?v=Lb1pigOngeU&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=31) [ref2](https://www.youtube.com/watch?v=qTPDxpnkXpI&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=32)

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

## Fitur Pagination Menggunakan Use Loader, Use Navigate dan Use Location

Kali ini, kita akan membahas bagaimana menerapkan fitur pagination dengan menggunakan useLoaderData, useLocation, dan useNavigate dari React Router. Fitur pagination ini memungkinkan user untuk melihat daftar produk yang dibagi menjadi beberapa halaman [ref](https://www.youtube.com/watch?v=VwvnFZYwHB0&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=33).

1.  useLoaderData<br/>

    - Hook ini digunakan untuk mengakses data yang dimuat oleh loader di dalam komponen React.
    - Data ini biasanya berasal dari request API yang dilakukan di dalam loader.
    - Di dalam case pagination ini useLoaderData digunakan untuk mendapatkan informasi pagination dari API.

2.  useLocation<br/>

    - Hook ini digunakan untuk mengakses objek lokasi saat ini, yang berisi informasi tentang URL yang sedang diakses.
    - Sangat berguna untuk mendapatkan parameter query dari URL.
    - Di dalam case pagination ini useLocation digunakan untuk mendapatkan informasi URL saat ini untuk mengambil nilai `search` dan `pathname`

      - pathname adalah bagian dari URL yang mewakili path saat ini.
      - Contoh: Jika URL saat ini adalah `https://basedomain.com/products?name=igra&category=Sepatu&page=2`, maka pathname adalah `/products`.
        Dalam konteks pagination, pathname digunakan untuk memastikan navigasi tetap pada rute yang sama ketika parameter query (seperti nomor halaman) berubah.
      - search adalah bagian dari URL yang berisi query string, termasuk semua parameter query.
      - Contoh: Jika URL saat ini adalah `https://basedomain.com/products?name=igra&category=Sepatu&page=2`, maka search adalah `?name=igra&category=Sepatu`.
      - Dalam pagination, search digunakan untuk memodifikasi parameter query yang ada (seperti name untuk memfilter product berdasarnkan namanya) tanpa menghapus parameter query lainnya.

3.  useNavigate<br/>
    - Hook ini digunakan untuk melakukan navigasi programatik ke rute yang berbeda.
    - Dalam konteks pagination, ini digunakan untuk mengubah halaman tanpa perlu merefresh halaman secara keseluruhan.

Berikut langkah - langkahnya;

- Buat komponent Pagination

  ```tsx
  // src/components/Pagination.tsx
  import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
  import { ProductLoaderType } from '../types/ProductTypes';

  const Pagination = () => {
    const { pagination } = useLoaderData() as ProductLoaderType;
    const { currentPage, totalPages } = pagination;
    const { search, pathname } = useLocation(); // Mengambil `search` dan `pathname` dari URL saat ini
    const navigate = useNavigate();

    const handleChangePage = (page: number) => {
      const searchParams = new URLSearchParams(search); // Menggunakan `search` untuk mendapatkan parameter query saat ini
      searchParams.set('page', page.toString()); // Mengubah atau menambahkan parameter `page`
      navigate(`${pathname}?${searchParams.toString()}`); // Menavigasi ke URL baru dengan `pathname` dan query string yang telah dimodifikasi
    };

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className="join">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn btn-md border-none join-item ${
              currentPage === pageNumber ? 'btn-primary' : ''
            }`}
            onClick={() => handleChangePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  export default Pagination;
  ```

- Tambahkan Komponen Pagination di page `ProductView`<br/>
  Pada product view ini:

  - Menggunakan `useLoaderData` untuk mendapatkan data produk dan pagination yang sudah dimuat oleh loader.
  - Menampilkan daftar produk menggunakan komponen `ProductCard` dan pagination menggunakan komponen `Pagination`.

  ```tsx
  // src/pages/ProductView.tsx

  import { useLoaderData } from 'react-router-dom';
  import customAPI from '../api';
  import { ProductLoaderType } from '../types/ProductTypes';
  import Filter from '../components/Filter';
  import ProductCard from '../components/ProductCard';
  import Pagination from '../components/Pagination';

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
    const pagination = response.data?.pagination;

    // ----------------------------------------------------------------------------------------------
    return { products, params, pagination };
    // ----------------------------------------------------------------------------------------------
  };

  const ProductView = () => {
    const { products, pagination } = useLoaderData() as ProductLoaderType;

    return (
      <>
        <Filter />
        <h3 className="text-3xl font-bold text-right text-primary">
          Total: {pagination?.totalItems} Produk
        </h3>
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
        <div className="flex justify-center mt-5">
          //
          ----------------------------------------------------------------------------------------------
          <Pagination />
          //
          ----------------------------------------------------------------------------------------------
        </div>
      </>
    );
  };

  export default ProductView;
  ```

## Fitur Login Dan Register

Untuk melanjutkan fitur login dan register di sisi frontend, kita perlu menambahkan beberapa hal berikut:

- Mengirim Data ke Backend (API Calls)<br/>
  kita perlu mengirim data form ke backend menggunakan fetch atau library seperti Axios. Berdasarkan apakah itu halaman login atau register, kita akan mengirim permintaan POST ke endpoint /register atau /login.
- Menangani Respons dari Backend<br/>
  Setelah mengirim data, kita perlu menangani respons dari backend. Jika login atau register berhasil, simpan token JWT di cookie atau local storage dan arahkan user ke halaman yang sesuai.
- Mengelola Status Authentikasi<br/>
  kita perlu mengelola status autentikasi user di frontend, misalnya dengan menggunakan Context API atau Redux untuk menyimpan status autentikasi global.

### Fitur Login Dan Register Tanpa Global State

Berikut beberapa langkah yang bisa kita lakukan:

1.  Atur Konfigurasi Server <br/>
    Untuk menghubungkan ke server api dari backendkita perlu mengatur konfigurasi server dengan menggunakan properti server dalam objek konfigurasi Vite. Dalam contoh ini, kita akan mengarahkan request ke server api backend dengan menggunakan properti proxy.

    ```ts
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react-swc';

    export default defineConfig({
      plugins: [react()],
      //--------------------------------------------------------
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3002',
            changeOrigin: true,
          },
        },
      },
      //--------------------------------------------------------
    });
    ```

2.  Buat Custom API untuk mendaftarkan base url API Backend <br/>

    ```ts
    // src/services/index.ts

    import axios from 'axios';

    const customAPI = axios.create({
      baseURL: '/api/v1',
      withCredentials: true, // Mengizinkan pengiriman cookies bersama permintaan
    });

    export default customAPI;
    ```

    `withCredentials: true` di customAPI diata:

    - Opsi ini memberitahu axios untuk menyertakan cookies dalam permintaan yang dikirimkan ke server, bahkan jika permintaan tersebut lintas domain.
    - Ini penting jika server Anda mengandalkan cookies untuk autentikasi (seperti JWT dalam cookie) karena tanpa `withCredentials: true`, cookies tidak akan disertakan dan server tidak akan mengenali permintaan sebagai autentik.

3.  Buat auth service <br/>
    Buat service auth yang berisi method untuk melakukan fethc api untuk fitur login dan register.

    ```ts
    // src/services/authService.ts

    import customAPI from '.';

    const authService = async (url: string, data: Record<string, any>) => {
      console.log(data);

      try {
        const response = await customAPI.post(url, data);
        console.log(response);

        return response.data.data;
      } catch (error: any) {
        if (error.response) {
          throw new Error(
            error?.response.data.message || 'Something went wrong'
          );
        } else {
          throw new Error('Network error');
        }
      }
    };

    export default authService;
    ```

4.  Buat custom hook bernama `useAuth `untuk Login dan Register <br/>
    Hook ini digunakan untuk menghandle proses autentikasi dan registrasi user. `useAuth `ini bertugas untuk mengelola state untuk loading, error, dan logika submit form.

    ```ts
    // src/hooks/useAuth.ts

    import { FormEvent, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import authService from '../services/authService';

    const useAuth = (isRegister: boolean) => {
      const [error, setError] = useState<string | null>(null);
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const navigate = useNavigate();

      const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        const url = isRegister ? '/auth/register' : '/auth/login';

        try {
          const response = await authService(url, data);

          if (isRegister) {
            navigate('/login');
          } else {
            navigate('/');
          }
        } catch (error: any) {
          setError(error?.message);
        } finally {
          setIsLoading(false);
        }
      };

      return { handleSubmit, error, isLoading };
    };

    export default useAuth;
    ```

5.  Buat Komponen `FormAuth` <br/>
    `FormAuth` ini akan Menggunakan hook `useAuth` untuk menangani submit form, error handling, dan menampilkan loading spinner.

    ```tsx
    // src/components/FormAuth.tsx

    import { Link } from 'react-router-dom';
    import FormInput from './form/FormInput';
    import useAuth from '../hooks/useAuth';
    import LoadingSpinner from './LoadingSpinner';
    import ErrorMessage from './ErrorMessage';

    const FormAuth = ({ isRegister }: { isRegister: boolean }) => {
      const { handleSubmit, error, isLoading } = useAuth(isRegister);

      return (
        <div className="grid h-screen place-items-center">
          <form
            className="flex flex-col p-8 shadow-lg card w-96 bg-base-300 gap-y-4"
            onSubmit={handleSubmit}
          >
            <h4 className="text-3xl font-bold text-center">
              {isRegister ? 'Register' : 'Login'}
            </h4>
            {isRegister && <FormInput type="text" name="name" label="name" />}
            <FormInput type="email" name="email" label="email" />
            <FormInput type="password" name="password" label="password" />
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="mt-4">
                <button className="btn btn-primary btn-block">
                  {isRegister ? 'Register' : 'Login'}
                </button>
              </div>
            )}

            {error && <ErrorMessage message={error} />}

            {isRegister ? (
              <p className="text-center">
                Sudah punya akun?{' '}
                <Link
                  to={'/login'}
                  className="ml-2 link link-hover link-accent"
                >
                  Login
                </Link>
              </p>
            ) : (
              <p className="text-center">
                Belum punya akun?{' '}
                <Link
                  to={'/register'}
                  className="ml-2 link link-hover link-accent"
                >
                  Register
                </Link>
              </p>
            )}
          </form>
        </div>
      );
    };

    export default FormAuth;
    ```

    Berikut komponen `FormInput` yang digunakan di komponen `FormAuth` diatas

    ```tsx
    // src/components/form/FormInput

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

6.  Membuat Auth Protected<br/>

    Ini merupakan cara untuk melindungi page di mana hanya user yang sudah login saja yang bisa mengakses page tersebut. Kita bisa menggunakan beberapa pendekatan tergantung pada bagaimana kita mengelola autentikasi. Salah satu cara yang umum adalah dengan menggunakan React Router dan membuat komponen ProtectedRoute yang akan memeriksa apakah user sudah login sebelum mengizinkan akses ke halaman tertentu.

    Berikut adalah contoh implementasi untuk melindungi halaman CartView:

    1.  Buat Komponen ProtectedRoute<br/>
        Komponen ini akan memeriksa apakah user sudah login. Jika belum, user akan diarahkan ke halaman login. Komponen ini memeriksa apakah user sudah login dengan memeriksa keberadaan token JWT di dalam cookie. Jika tidak ada token, user akan diarahkan ke halaman login.

        ```tsx
        // src/components/ProtectedRoute.tsx

        import { ReactNode } from 'react';
        import Cookies from 'js-cookie';
        import { Navigate } from 'react-router-dom';

        const ProtectedRoute = ({ children }: { children: ReactNode }) => {
          const isAuthenticated = !!Cookies.get('jwt');

          if (!isAuthenticated) {
            return <Navigate to={'/login'} />;
          }

          return <>{children}</>;
        };

        export default ProtectedRoute;
        ```

    2.  Gunakan ProtectedRoute di App atau Routes <br/>
        Kemudian, gunakan ProtectedRoute di dalam konfigurasi React Router untuk membungkus halaman yang ingin dilindungi, seperti CartView. ProtectedRoute digunakan untuk membungkus komponen CartView. Jadi, jika user mencoba mengakses halaman CartView tanpa login, mereka akan otomatis diarahkan ke halaman login.

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
        import { ProductViewLoader } from './pages/ProductView';
        import ProtectedRoute from './components/ProtectedRoute';

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
                loader: ProductViewLoader,
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
                //---------------------------------------------------------------------------------------------
                element: (
                  <ProtectedRoute>
                    <CartView />
                  </ProtectedRoute>
                ),
                //---------------------------------------------------------------------------------------------
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

        Dengan pendekatan ini, hanya user yang sudah login dan memiliki cookie JWT yang valid yang bisa mengakses halaman CartView. Jika user tidak login, mereka akan diarahkan ke halaman LoginView.

        Untuk menentukan status autentikasi kita bisa menentukan isAuthenticated dari beberapa tempat, seperti:

        - State Global: Jika Kita menggunakan Redux, Context API, atau tools lain untuk mengelola state.
        - Cookies: Jika JWT disimpan di dalam cookies, Kita bisa memeriksa keberadaan cookie yang berisi token. untuk bisa menggunaka cookies kita harus menginstalnya dulu, dengan command `npm install js-cookie`
          Berikut contoh menggunakan cookie untuk memeriksa autentikasi:

          ```ts
          import Cookies from 'js-cookie';
          const isAuthenticated = !!Cookies.get('jwt');
          ```

#### Mengapa Tidak Menggunakan useState untuk Input Form?

Alasan mengapa fitur login dan register pada komponen `FormAuth` tidak menggunakan state dan setState untuk mengelola nilai input seperti email, name, dan password adalah karena penggunaan onSubmit event pada form lebih sederhana dan efisien dalam konteks ini. Berikut adalah penjelasan lebih lanjut:

1. Pengelolaan State Input Secara Implisit melalui Form Handling
   Dalam form HTML, elemen form seperti input secara otomatis mengelola nilai mereka sendiri. Ketika form di-submit, browser akan mengirimkan nilai dari semua input form yang memiliki atribut name melalui event submit (perlu diperhatikan agar nama di atribut name harus sama dengan nama di body request api yang kita akses). Ini berarti Anda tidak perlu secara eksplisit mengelola state untuk setiap input jika Anda hanya perlu mengirim nilai tersebut pada saat form di-submit.
2. Memanfaatkan onSubmit untuk Mengirim Data. <br/>
   Alih-alih menggunakan state untuk melacak nilai input, FormAuth memanfaatkan event onSubmit pada form untuk mengirim data ke server. Dengan cara ini, Anda bisa langsung mengambil nilai dari input melalui event submit tanpa perlu memisahkan setiap input ke dalam state individu.
3. Penggunaan Hook `useAuth` <br/>
   Dalam implementasi ini, hook `useAuth` menangani logika pengiriman form dan penanganan error/loading. Hook ini menggunakan handleSubmit, yang menangkap event submit dan mengambil data dari form untuk dikirim ke backend.
   ```ts
   const { handleSubmit, error, isLoading } = useAuth(isRegister);
   ```
4. Pengurangan Kompleksitas <br/>
   Menggunakan state untuk setiap input bisa menambah kompleksitas kode. Setiap input perlu memiliki state, onChange handler, dan setState untuk memperbarui nilai. Jika Anda hanya perlu mengambil nilai input saat form di-submit, menggunakan event.target.elements atau new FormData(event.target) sudah cukup dan lebih sederhana.
5. Skenario di mana useState Mungkin Dibutuhkan
   - Validasi secara real-time<br/>
     Jika Anda membutuhkan validasi langsung (real-time) saat pengguna mengetik, seperti memeriksa apakah email valid atau password cukup kuat, maka menggunakan state dan onChange handler mungkin diperlukan.
   - Penggunaan di luar form submission<br/>
     Jika nilai dari input digunakan di tempat lain dalam komponen atau harus diperbarui secara dinamis sebelum submit, Anda mungkin ingin mengelola nilai input dengan state.

#### Mengelola State dan Validasi Form Auth untuk Fitur Login dan Register dengan Custom Hook

Kita bisa mengelola state untuk name, email, dan password dengan menggunakan custom hook yang mengelola state dan validasi secara terpisah. Berikut adalah contoh penerapan tersebut:

1. Buat Custom Hook `useAuth` untuk Mengelola State dan Validasi <br/>
   Custom Hook `useAuth` ini digunakan untuk manage state name, email password, menghandle proses autentikasi dan register.

   ```ts
   // src/hooks/useAuth.ts

   import { ChangeEvent, FormEvent, useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import authService from '../services/authService';

   interface useAuthReturnType {
     handleSubmit: (Event: FormEvent, fields: FormDataType) => void;
     errors: ErrorsType;
     isLoading: boolean;
     formData: FormDataType;
     handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
   }

   interface FormDataType {
     name: string;
     email: string;
     password: string;
   }

   interface ErrorsType {
     name?: string;
     email?: string;
     password?: string;
     apiError?: string;
   }

   const useAuth = (isRegister: boolean): useAuthReturnType => {
     const [formData, setFormData] = useState<FormDataType>({
       name: '',
       email: '',
       password: '',
     });
     const [errors, setErrors] = useState<ErrorsType>({});
     const [isLoading, setIsLoading] = useState<boolean>(false);
     const navigate = useNavigate();

     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
       const { name, value } = event.target;

       setFormData((prevData) => ({
         ...prevData,
         [name]: value,
       }));

       // Clear the error for the field that is being modified
       setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
     };

     const validateForm = (): boolean => {
       const { name, email, password } = formData;
       const newErrors: ErrorsType = {};

       if (isRegister && !name) {
         newErrors.name = 'Name is required';
       } else if (name.length < 3 && isRegister) {
         newErrors.name = 'Name must be at least 3 characters long.';
       }

       if (!email) {
         newErrors.email = 'Email is required.';
       } else if (!/\S+@\S+\.\S+/.test(email)) {
         newErrors.email = 'Invalid email address.';
       }
       if (!password) {
         newErrors.password = 'Password is required';
       } else if (password.length < 3) {
         newErrors.password = 'Password must be at least 3 characters long.';
       }
       setErrors(newErrors);

       // If there are no errors, return true, otherwise false
       return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (event: FormEvent, fields: FormDataType) => {
       event.preventDefault();
       setIsLoading(true);
       setErrors({});

       const isValid = validateForm();

       if (!isValid) {
         setIsLoading(false);
         return;
       }

       try {
         const url = isRegister ? '/auth/register' : '/auth/login';
         await authService(url, fields);

         if (isRegister) {
           navigate('/login');
         } else {
           navigate('/');
         }
       } catch (error: any) {
         setErrors({ ...errors, apiError: error.message });
       } finally {
         setIsLoading(false);
       }
     };

     return {
       handleSubmit,
       errors,
       isLoading,
       formData,
       handleChange,
     };
   };

   export default useAuth;
   ```

   - ErrorType<br/>
     Interface ini mendefinisikan struktur error untuk setiap field, yaitu name, email, dan password.
   - errors<br/>
     State ini menyimpan pesan error untuk masing-masing field.
   - validateForm<br/>
     Fungsi ini mengecek validitas setiap field dan mengisi objek errors dengan pesan error jika ada field yang tidak valid.
   - handleChange<br/>
     Selain memperbarui formData, fungsi ini juga membersihkan pesan error untuk field yang sedang diedit.
   - handleSubmit<br/>
     Fungsi ini hanya akan melanjutkan proses submit jika semua field valid, dan jika ada error dari server, akan ditampilkan pada form secara keseluruhan (form).

2. Buat component `FormInput`

   ```tsx
   // src/components/FormInput.tsx

   import { ChangeEvent } from 'react';

   interface FormInputType {
     label: string;
     type: string;
     name: string;
     value: string;
     onChange: (event: ChangeEvent<HTMLInputElement>) => void;
     error?: string;
   }

   const FormInput = ({
     label,
     name,
     type,
     value,
     onChange,
     error,
   }: FormInputType) => {
     return (
       <div className="form-control">
         <label className="label">
           <span className="capitalize label-text">{label}</span>
         </label>
         <input
           type={type}
           name={name}
           value={value}
           onChange={onChange}
           className="input input-bordered"
         />
         {error && <span className="text-sm text-red-500">{error}</span>}
       </div>
     );
   };

   export default FormInput;
   ```

3. `FormAuth` ini akan Menggunakan hook `useAuth` untuk menangani submit form, error handling, dan menampilkan loading spinner.

   ```tsx
   // src/components/FormAut.tsx

   import { Link } from 'react-router-dom';
   import FormInput from './form/FormInput';
   import useAuth from '../hooks/useAuth';
   import LoadingSpinner from './LoadingSpinner';
   import ErrorMessage from './ErrorMessage';

   const FormAuth = ({ isRegister }: { isRegister: boolean }) => {
     const { handleSubmit, errors, isLoading, formData, handleChange } =
       useAuth(isRegister);

     return (
       <div className="grid h-screen place-items-center">
         <form
           className="flex flex-col p-8 shadow-lg card w-96 bg-base-300 gap-y-4"
           onSubmit={(event) => handleSubmit(event, formData)}
         >
           <h4 className="text-3xl font-bold text-center">
             {isRegister ? 'Register' : 'Login'}
           </h4>
           {isRegister && (
             <FormInput
               type="text"
               name="name"
               label="name"
               value={formData.name}
               onChange={handleChange}
               error={errors.name}
             />
           )}
           <FormInput
             type="email"
             name="email"
             label="email"
             value={formData.email}
             onChange={handleChange}
             error={errors.email}
           />
           <FormInput
             type="password"
             name="password"
             label="password"
             value={formData.password}
             onChange={handleChange}
             error={errors.password}
           />

           {isLoading ? (
             <LoadingSpinner />
           ) : (
             <div className="mt-4">
               <button className="btn btn-primary btn-block">
                 {isRegister ? 'Register' : 'Login'}
               </button>
             </div>
           )}

           {errors.apiError && <ErrorMessage message={errors.apiError} />}

           {isRegister ? (
             <p className="text-center">
               Sudah punya akun?{' '}
               <Link to={'/login'} className="ml-2 link link-hover link-accent">
                 Login
               </Link>
             </p>
           ) : (
             <p className="text-center">
               Belum punya akun?{' '}
               <Link
                 to={'/register'}
                 className="ml-2 link link-hover link-accent"
               >
                 Register
               </Link>
             </p>
           )}
         </form>
       </div>
     );
   };

   export default FormAuth;
   ```

## Logout

### Logout dengan Menghapus Cookies

Untuk menambahkan fitur logout, kita perlu memastikan bahwa token autentikasi yang disimpan di frontend (biasanya di localStorage atau sessionStorage) dihapus ketika user melakukan logout. Kita juga harus mengarahkan user kembali ke halaman login atau halaman lain setelah logout. Berikut adalah langkah-langkah dan contoh implementasinya:

1. Buat Fungsi Logout di authService <br/>
   Fungsi logout ini akan memanggil [API logout di backend](https://github.com/argianardi/MERNplayground/tree/learn/server#proteksi-endpoint-logout-dan-get-user), yang akan menghapus cookie JWT di server dan mengarahkan pengguna ke halaman login.

   ```ts
   // src/services/authService.ts

   import customAPI from '.';

   export const authService = async (
     url: string,
     data: Record<string, any>
   ) => {
     console.log(data);

     try {
       const response = await customAPI.post(url, data);
       console.log(response);

       return response.data.data;
     } catch (error: any) {
       if (error.response) {
         throw new Error(
           error?.response.data.message || 'Something went wrong'
         );
       } else {
         throw new Error('Network error');
       }
     }
   };

   //------------------------------------------------------------------------------------------
   export const logout = async () => {
     try {
       await customAPI.post('/auth/logout');
     } catch (error: any) {
       if (error.response) {
         throw new Error(
           error?.response.data.message || 'Something went wrong'
         );
       } else {
         throw new Error('Network error');
       }
     }
   };
   //------------------------------------------------------------------------------------------
   ```

2. Buat Fungsi logout di Hook useAuth<br/>
   Tambahkan fungsi logout ke dalam custom hook useAuth untuk menangani proses logout.

   ```ts
   // src/hooks/useAuth.ts

   import { ChangeEvent, FormEvent, useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import { authService } from '../services/authService';

   interface useAuthReturnType {
     handleSubmit: (Event: FormEvent, fields: FormDataType) => void;
     handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
     logout: () => void;
     errors: ErrorsType;
     isLoading: boolean;
     formData: FormDataType;
   }

   interface FormDataType {
     name: string;
     email: string;
     password: string;
   }

   interface ErrorsType {
     name?: string;
     email?: string;
     password?: string;
     apiError?: string;
   }

   const useAuth = (isRegister: boolean): useAuthReturnType => {
     const [formData, setFormData] = useState<FormDataType>({
       name: '',
       email: '',
       password: '',
     });
     const [errors, setErrors] = useState<ErrorsType>({});
     const [isLoading, setIsLoading] = useState<boolean>(false);
     const navigate = useNavigate();

     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
       const { name, value } = event.target;

       setFormData((prevData) => ({
         ...prevData,
         [name]: value,
       }));

       // Clear the error for the field that is being modified
       setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
     };

     const validateForm = (): boolean => {
       const { name, email, password } = formData;
       const newErrors: ErrorsType = {};

       if (isRegister && !name) {
         newErrors.name = 'Name is required';
       } else if (name.length < 3 && isRegister) {
         newErrors.name = 'Name must be at least 3 characters long.';
       }

       if (!email) {
         newErrors.email = 'Email is required.';
       } else if (!/\S+@\S+\.\S+/.test(email)) {
         newErrors.email = 'Invalid email address.';
       }
       if (!password) {
         newErrors.password = 'Password is required';
       } else if (password.length < 3) {
         newErrors.password = 'Password must be at least 3 characters long.';
       }
       setErrors(newErrors);

       // If there are no errors, return true, otherwise false
       return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (event: FormEvent, fields: FormDataType) => {
       event.preventDefault();
       setIsLoading(true);
       setErrors({});

       const isValid = validateForm();

       if (!isValid) {
         setIsLoading(false);
         return;
       }

       try {
         const url = isRegister ? '/auth/register' : '/auth/login';
         await authService(url, fields);

         if (isRegister) {
           navigate('/login');
         } else {
           navigate('/');
         }
       } catch (error: any) {
         setErrors({ ...errors, apiError: error.message });
       } finally {
         setIsLoading(false);
       }
     };

     //-----------------------------------------------------------------------------------------------------
     const logout = async () => {
       try {
         await authService('/auth/logout', {});
         navigate('/login');
       } catch (error: any) {
         setErrors({ ...errors, apiError: error.message });
       }
     };
     //-----------------------------------------------------------------------------------------------------

     return {
       handleSubmit,
       //-----------------------------------------------------------------------------------------------------
       logout,
       handleChange,
       //-----------------------------------------------------------------------------------------------------
       errors,
       isLoading,
       formData,
     };
   };

   export default useAuth;
   ```

3. Gunakan Fungsi logout di Komponen <br/>
   Di komponen yang memerlukan fitur logout, gunakan fungsi logout yang didaftarkan di Hook useLogout tadi untuk menangani logout.

   ```tsx
   // src/components/Header.tsx

   import { Link } from 'react-router-dom';
   import Cookies from 'js-cookie';
   import useAuth from '../hooks/useAuth';

   const Header = () => {
     //------------------------------------------------------------------------------------------------
     const isAuthenticated = !!Cookies.get('jwt');
     const { logout } = useAuth(false);
     //------------------------------------------------------------------------------------------------

     return (
       <header className="py-2 bg-neutral text-neutral-content">
         {isAuthenticated ? (
           <div className="flex justify-end max-w-6xl px-8 mx-auto border sm:justify-end">
             //------------------------------------------------------------------------------------------------
             <button
               className="text-xs link link-hover sm:text-sm"
               onClick={logout}
             >
               Logout
             </button>
             //------------------------------------------------------------------------------------------------
           </div>
         ) : (
           <div className="flex justify-center max-w-6xl px-8 mx-auto border sm:justify-end">
             <div className="flex items-center justify-center gap-x-6">
               <Link
                 to={'/login'}
                 className="text-xs link link-hover sm:text-sm"
               >
                 Sign In
               </Link>
               <Link
                 to={'/register'}
                 className="text-xs link link-hover sm:text-sm"
               >
                 Create Account
               </Link>
             </div>
           </div>
         )}
       </header>
     );
   };

   export default Header;
   ```
