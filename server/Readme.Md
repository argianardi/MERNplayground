## Setup Project

- Buat initial project dengan command `npm init`, kemudian isi jawab setiap pertanyaan yang diajukan
- Install expressJS, mongoose dan dotenv, kemudian di file entry point kita lakukan hal berikut:
  - Tambahkan konfigurasi pakage dotenv
  - Buat koneksi ke express dan sample route sederhana untuk test koneksi ke expressJS di file entry point kita
- Buat file `.env` untuk menyimpan variabel Port yang kita gunakan
- Buat file `.gitignore`, tambahkan `node_modules` dan `.env` di dalamnya
- Jalankan aplikasi dengan command `npm run dev`
- Tambahkan middleware `app.use(express.json())` dan `app.use(express.urlencoded({ extended: true }))`
  - app.use(express.json()):
    - Fungsi ini digunakan untuk parsing request body yang dikirim dengan format JSON.
    - Ketika sebuah request dengan Content-Type: application/json diterima, middleware ini akan mem-parsing data JSON tersebut dan menambahkannya ke objek req.body.
  - app.use(express.urlencoded({ extended: true })):
    - Fungsi ini digunakan untuk parsing request body yang dikirim dengan format [application/x-www-form-urlencoded](#format-applicationx-www-form-urlencoded), yang biasanya digunakan oleh form HTML.
    - Opsi extended: true memungkinkan parsing request body yang lebih kompleks, termasuk nested objects. Jika diset false, hanya string atau array yang bisa diparse.

## Buat koneksi ke database

## Buat error handling

Dalam development membuat error handling dengan baik adalah salah satu aspek penting untuk memastikan aplikasi tetap stabil dan mudah di-debug. Di sini, kita akan membahas bagaimana menambahkan middleware error handling dan menggunakan async handler untuk menghindari penggunaan try-catch yang berulang-ulang [ref](https://www.youtube.com/watch?v=68QgFd-lh7I&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=22).

### Middleware Error Not Found

Middleware notFound digunakan untuk menangani route yang tidak ditemukan. Jika user mencoba mengakses route yang tidak ada di aplikasi kita, middleware ini akan membuat error dengan status 404 (Not Found) dan error message yang sesuai.

```js
// middlewares/errorMiddleware.js

export const notFound = (req, res, next) => {
  const error = new Error(`path not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
```

### Middleware errorHandler

Middleware errorHandler digunakan untuk menangani semua jenis error yang terjadi di aplikasi kita. Middleware ini akan memeriksa status kode respon dan jika error adalah error validasi dari mongoose, maka error tersebut akan diformat dan dikembalikan sebagai respon JSON.

```js
// middlewares/errorHandler.js

export const notFound = (req, res, next) => {
  const error = new Error(`path not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//------------------------------------------------------------------------------------------------------------------------
export const errorHandler = (err, req, res, next) => {
  // Jika status kode respon saat ini adalah 200 (servernya erorr tapi statusnya 200), kembalikan status kode respon 500
  const resStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Cek apakah error adalah validation error dari mongoose
  if (err.name === 'ValidationError') {
    const formattedErrors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = [err.errors[key].message];
      return acc;
    }, {});

    return res.status(400).json({
      code: '400',
      status: 'error',
      message: 'Validation error',
      errors: formattedErrors,
    });
  }

  // default error response
  res.status(resStatusCode).json({
    code: resStatusCode.toString(),
    status: 'error',
    message: message,
    stack: err.stack,
  });
};
//---------------------------------------------------------------------------------------------------------------------------------------
```

### Menggunakan Middleware Error di File Entry Point

Setelah membuat middleware error tadi, selanjutnya kita bisa mengimpor dan menggunakan middleware ini di file entry point aplikasi kita.

```js
// index.js

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

import authRouter from './routes/authRouter.js';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use('/api/v1/auth', authRouter);

//-----------------------------------------------------------------------------------------------
// Error handling
app.use(notFound);
app.use(errorHandler);
//-----------------------------------------------------------------------------------------------

// Connect DB
connectDB();

// Port
const PORT = process.env.PORT || 3010;

// Server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
```

### Buat Async Handler Menghindari Penggunaan Try-Catch Berulang

Agar lebih efisien, kita dapat menggunakan async handler untuk menangani async function tanpa harus menggunakan try-catch berulang kali di setiap route. Berikut langkah - langkahnya:

- Buat function async handler untuk dijadikan middleware

  ```js
  // middlewares/asyncHandler.js

  const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  export default asyncHandler;
  ```

- Import dan gunakan function asyn handler tadi

  ```js
  // routes/authRouter.js

  import express from 'express';
  import User from '../models/users.js';
  //---------------------------------------------------------------------------------------
  import asyncHandler from '../middlewares/asyncHandler.js';
  //---------------------------------------------------------------------------------------

  const router = express.Router();

  //---------------------------------------------------------------------------------------
  router.post(
    '/register',
    asyncHandler(async (req, res) => {
      await User.create({
        name: req.body.name,
      });
    })
  );
  //---------------------------------------------------------------------------------------

  router.post('/login', (req, res) => {
    res.send('Login');
  });

  router.get('/logout', (req, res) => {
    res.send('Logout');
  });

  router.get('/getuser', (req, res) => {
    res.send('Get User');
  });

  export default router;
  ```

  Dengan menggunakan async handler, kita tidak perlu lagi menambahkan try-catch block di setiap async function yang kita buat di route handler.

## Glosarium

### Format application/x-www-form-urlencoded

application/x-www-form-urlencoded adalah salah satu format untuk mengirim data dari klien (misalnya, browser) ke server, sering digunakan saat mengirimkan data dari form HTML.

Dalam format ini, data dikodekan dalam string key-value pairs yang dipisahkan oleh ampersand (&), di mana setiap key-value pair dipisahkan oleh tanda sama dengan (=). Misalnya, jika form HTML memiliki dua input dengan nama "name" dan "age"

```html
<form action="/submit" method="POST">
  <input type="text" name="name" value="John" />
  <input type="text" name="age" value="30" />
  <button type="submit">Submit</button>
</form>
```

Ketika form ini dikirimkan, data yang dikirimkan ke server akan terlihat seperti ini:

```
name=John&age=30
```

Berikut adalah penjelasan lebih lanjut:

- Key-Value Pairs:
  - Setiap input dalam form HTML dikodekan sebagai pasangan key-value.
  - Nama input menjadi "key" dan nilai yang dimasukkan pengguna menjadi "value".
  - Pasangan key-value dipisahkan oleh tanda sama dengan (=).
- Multiple Pairs:
  - Jika ada lebih dari satu input dalam form, masing-masing pasangan key-value dipisahkan oleh ampersand (&).
- Encoding:
  - Karakter khusus seperti spasi atau ampersand dalam nilai input dikodekan agar sesuai dengan URL.
  - Misalnya, spasi dikodekan sebagai + atau %20.
- Form HTML:
  - Ketika form dengan method POST dan Content-Type diset ke application/x-www-form-urlencoded dikirimkan, data form akan dikirimkan dalam format ini.
