## Glosarium

### Format application/x-www-form-urlencoded

application/x-www-form-urlencoded adalah salah satu format untuk mengirim data dari client (misalnya, browser) ke server, sering digunakan saat mengirimkan data dari form HTML.

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
  - Nama input menjadi "key" dan nilai yang dimasukkan user menjadi "value".
  - Pasangan key-value dipisahkan oleh tanda sama dengan (=).
- Multiple Pairs:
  - Jika ada lebih dari satu input dalam form, masing-masing pasangan key-value dipisahkan oleh ampersand (&).
- Encoding:
  - Karakter khusus seperti spasi atau ampersand dalam nilai input dikodekan agar sesuai dengan URL.
  - Misalnya, spasi dikodekan sebagai + atau %20.
- Form HTML:
  - Ketika form dengan method POST dan Content-Type diset ke application/x-www-form-urlencoded dikirimkan, data form akan dikirimkan dalam format ini.

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

## Fitur Register Menggunakan JWT

Untuk membuat fitur login menggunakan jwt kita perlu install [jwt](https://www.npmjs.com/package/jsonwebtoken), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [validator](https://www.npmjs.com/package/validator) dan [cookie parser](https://www.npmjs.com/package/cookie-parser) [ref](https://www.youtube.com/watch?v=GyxcNTF7sbQ&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=22):

- Jsonwebtoken (JWT)
  - JWT adalah standar untuk mengamankan pertukaran informasi antara dua pihak, biasanya antara server dan client.
  - JWT sering digunakan untuk otentikasi dan otorisasi di aplikasi web. Setelah user berhasil login, server mengirimkan JWT ke client. Client kemudian menyertakan JWT ini dalam setiap request berikutnya ke server untuk mengakses sumber daya yang dilindungi.
  - JWT juga bisa digunakan untuk menyimpan data user dengan aman karena token ini dienkripsi dan hanya dapat dibaca oleh server yang memiliki kunci rahasia.
- bcryptjs
  - bcryptjs digunakan untuk hashing password. Ini penting untuk keamanan karena password user tidak disimpan dalam bentuk teks asli di database, melainkan dalam bentuk hash yang sulit dipecahkan.
  - Proses hashing menggunakan bcryptjs melibatkan "salt", yang menambah tingkat kesulitan untuk memecahkan hash tersebut.
- validator
  - Disini kita gunakan package validator ini untuk menutupi kelemahan mongoose yang tidak bisa memvalidasi format email
  - validator adalah library untuk validasi dan sanitasi string. Ini sangat berguna untuk memeriksa apakah input pengguna valid dan aman sebelum diproses lebih lanjut.
  - Library ini menyediakan berbagai fungsi untuk memvalidasi email, URL, nomor telepon, dan banyak lagi.
- cookie-parser
  - cookie-parser adalah middleware untuk Express yang digunakan untuk mengurai (parse) cookie yang dikirimkan oleh client dalam request HTTP.
  - Ini mempermudah pengelolaan cookie di server, memungkinkan kita membaca dan menulis cookie dengan mudah.

Berikut langkah - langkah untuk membuat fitru register menggunakan jwt [ref](https://www.youtube.com/watch?v=GyxcNTF7sbQ&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=22):

1. Buat User Model <br>
   Pertama, kita perlu memperbarui model user untuk menambahkan validasi, enkripsi/hashing password, dan role user.

   ```js
   // models/users.js

   import mongoose, { Schema } from 'mongoose';
   import validator from 'validator';
   import bcrypt from 'bcryptjs';

   const userSchema = new Schema({
     name: {
       type: String,
       required: [true, 'Name is required'],
       unique: [true, 'Name must be unique'],
     },
     email: {
       type: String,
       required: [true, 'Email is required'],
       unique: [true, 'Email must be unique'],
       validate: {
         validator: validator.isEmail,
         message: '{VALUE} is not a valid email',
       },
     },
     password: {
       type: String,
       required: [true, 'Password is required'],
       minLength: [6, 'Password must be at least 6 characters long'],
     },
     role: {
       type: String,
       enum: ['user', 'owner'],
       default: 'user',
     },
   });

   userSchema.pre('save', async function () {
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
   });

   const User = mongoose.model('User', userSchema);

   export default User;
   ```

2. Buat Controller untuk Registrasi User <br/>
   Selanjutnya, kita buat controller yang akan menangani logika registrasi user dan menghasilkan JWT.

   ```js
   // controllers/authController.js

   import jwt from 'jsonwebtoken';
   import asyncHandler from '../middlewares/asyncHandler.js';
   import User from '../models/users.js';

   const signToken = (id) => {
     return jwt.sign({ id }, process.env.JWT_SECRET, {
       expiresIn: '6d',
     });
   };

   // Fungsi untuk membuat token, menyimpannya di cookie, dan mengirim respon ke client.
   const createSendResToken = (user, statusCode, res) => {
     const token = signToken(user._id);
     const isDev = process.env.NODE_ENV === 'development' ? false : true;
     const cookieOption = {
       expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
       httpOnly: true,
       security: isDev,
     };

     res.cookie('jwt', token, cookieOption);

     // Hapus password dari objek user sebelum mengirimnya ke client.
     user.password = undefined;

     res.status(statusCode).json({
       code: statusCode.toString(),
       status: 'Success',
       message: 'User created successfully',
       data: user,
     });
   };

   export const registerUser = asyncHandler(async (req, res) => {
     const isOwner = (await User.countDocuments()) === 0;
     const role = isOwner ? 'owner' : 'user';

     const createUser = await User.create({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
       role: role,
     });

     createSendResToken(createUser, 201, res);
   });
   ```

   Berikut alur dari logic controller register tersebut:

   - User mengirim request POST ke endpoint /register dengan data name, email, dan password.
   - Method registerUser mengecek apakah user yang register tersebut adalah data user pertama di database atau bukan, jika iya jadikan rolenya owner kalau bukan jadikan user.
   - Buat user baru dengan data dari request body.
   - Menghasilkan token JWT untuk user baru.
   - Menyimpan token di cookie.
   - Mengirim respon ke client dengan data user (tanpa password) dan pesan sukses.

3. Tambahkan variabel `JWT_SECRET` dan `NODE_ENV` di file `.env`

   ```js
   // .env

   PORT = 3001;
   NODE_ENV = development;
   JWT_SECRET = sz4vjs65nqw3e0so23v242iumpzkpb;
   ```

4. Buat Router untuk Registrasi <br/>
   Kemudian, buat router untuk menangani rute registrasi user menggunakan auth controller tadi.

   ```js
   // routes/authRoute.js

   import express from 'express';
   import User from '../models/users.js';
   import asyncHandler from '../middlewares/asyncHandler.js';
   //------------------------------------------------------------------------------------------------
   import { registerUser } from '../controller/authController.js';
   //------------------------------------------------------------------------------------------------

   const router = express.Router();

   //------------------------------------------------------------------------------------------------
   router.post('/register', registerUser);
   //------------------------------------------------------------------------------------------------

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

5. Tambahkan middleware cookie parser di fil entry point kita

   ```js
   // index.js

   import express from 'express';
   import dotenv from 'dotenv';
   //-----------------------------------------------------------------------------------------------
   import cookieParser from 'cookie-parser';
   //-----------------------------------------------------------------------------------------------

   dotenv.config();
   const app = express();

   import authRouter from './routes/authRouter.js';
   import connectDB from './config/db.js';
   import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

   // Middleware
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   //-----------------------------------------------------------------------------------------------
   app.use(cookieParser());
   //-----------------------------------------------------------------------------------------------

   // Route
   app.use('/api/v1/auth', authRouter);

   // Error handling
   app.use(notFound);
   app.use(errorHandler);

   // Connect DB
   connectDB();

   // Port
   const PORT = process.env.PORT || 3010;

   // Server
   app.listen(PORT, () => {
     console.log(`Server running on port http://localhost:${PORT}`);
   });
   ```
