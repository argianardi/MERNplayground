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

### Path

[Path](https://nodejs.org/api/path.html) adalah modul bawaan Node.js yang menyediakan utilitas untuk bekerja dengan path file dan direktori. Dengan mengimpor modul ini, kita bisa menggunakan berbagai metode untuk memanipulasi path file. Path digunakan untuk membantu dalam menangani dan membangun path file secara aman dan konsisten.

#### Menggunakan Path Module Untuk Multer

Biasanya, modul path akan sangat berguna ketika kita perlu menggabungkan atau memanipulasi path file atau direktori secara dinamis. Sebagai contoh, jika kita ingin memastikan path file bersifat cross-platform, kita mungkin akan menggunakan path.join() atau path.resolve().

Misalnya, alih-alih menentukan direktori secara langsung seperti ini:

```js
destination: function (req, file, cb) {
  cb(null, '/temp/my-uploads/');
}
```

Kita bisa menggunakan path untuk membangun path file dengan lebih aman:

```js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'temp', 'my-uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
```

Dalam contoh tersebut, `path.join(**dirname, 'temp', 'my-uploads')` menggabungkan `**dirname` (direktori saat ini) dengan `temp` dan `my-uploads` untuk membentuk path direktori yang aman dan konsisten.

#### Contoh Penggunaan Path Module

Berikut adalah beberapa metode yang sering digunakan dari modul path:

- `path.join()`: Menggabungkan segmen path menjadi satu path.

  ```js
  const fullPath = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
  console.log(fullPath); // '/foo/bar/baz/asdf'
  ```

- `path.resolve()`: Menyelesaikan path absolut.

  ```js
  const fullPath = path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
  console.log(fullPath); // '/tmp/subfile'
  ```

- `path.basename()`: Mengembalikan nama file dari path.

  ```js
  const fileName = path.basename('/foo/bar/baz/asdf/quux.html');
  console.log(fileName); // 'quux.html'
  ```

- `path.extname()`: Mengembalikan ekstensi dari path file.

  ```js
  const ext = path.extname('/foo/bar/baz/asdf/quux.html');
  console.log(ext); // '.html'
  ```

Dengan menggunakan path, kita dapat memastikan bahwa manipulasi path file di aplikasi kita konsisten dan aman, terlepas dari lingkungan sistem operasi di mana aplikasi tersebut berjalan.

### MIME

MIME (Multipurpose Internet Mail Extensions) adalah standar yang digunakan untuk mengidentifikasi jenis file yang sedang ditransfer melalui internet. MIME type memberikan informasi tentang format konten file, sehingga aplikasi atau perangkat lunak yang menerima file tersebut dapat menanganinya dengan benar.

MIME type terdiri dari dua bagian utama yang dipisahkan oleh garis miring (/):

- Tipe Utama (Type)<br/>
  Menunjukkan kategori umum file, seperti image untuk gambar, text untuk teks, audio untuk suara, video untuk video, dan application untuk aplikasi.
- Subtipe (Subtype) <br/>
  Menunjukkan format spesifik file dalam kategori tersebut, seperti jpeg, png, html, json, dll.

**Contoh MIME type**

- image/jpeg untuk file gambar dengan format JPEG.
- image/png untuk file gambar dengan format PNG.
- text/html untuk file HTML.
- application/json untuk file JSON.

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

  // Duplicate data error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];

    res.status(400).json({
      code: '400',
      status: 'error',
      message: `The ${field} already exists`,
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

## Fitur Login Menggunakan JWT

Berikut langkah - langkahnya [ref](https://www.youtube.com/watch?v=ADLwHJButZ0&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=20):

1. Tambahkan Method Compare Password Model User <br/>
   Tambahkan method comparePassword untuk membandingkan password yang di requst user (melalui body req) dengan password dari data user yang tersimpan di database.

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

   //----------------------------------------------------------------------------------
   userSchema.methods.comparePassword = async function (reqBodyPassword) {
     return await bcrypt.compare(reqBodyPassword, this.password);
   };
   //----------------------------------------------------------------------------------

   const User = mongoose.model('User', userSchema);

   export default User;
   ```

2. Buat Kontroler Untuk Login <br/>
   Kontroler ini akan mengurus proses login yaitu validation dan juga akan membuat token JWT serta mengirimkannya dalam cookie.

   ```js
   // controllers/ authController.js

   import jwt from 'jsonwebtoken';
   import asyncHandler from '../middlewares/asyncHandler.js';
   import User from '../models/users.js';

   const signToken = (id) => {
     return jwt.sign({ id }, process.env.JWT_SECRET, {
       expiresIn: '6d',
     });
   };

   const createSendResToken = (user, statusCode, res) => {
     const token = signToken(user._id);
     const isDev = process.env.NODE_ENV === 'development' ? false : true;
     const cookieOption = {
       expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
       httpOnly: true,
       security: isDev,
     };

     res.cookie('jwt', token, cookieOption);

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

   //-------------------------------------------------------------------------------------------
   export const loginUser = asyncHandler(async (req, res) => {
     // Email validation
     if (!req.body.email) {
       res.status(400);
       throw new Error('Please add an email');
     }

     // Password validation
     if (!req.body.password) {
       res.status(400);
       throw new Error('Please add a password');
     }

     const userData = await User.findOne({ email: req.body.email });

     if (userData && (await userData.comparePassword(req.body.password))) {
       createSendResToken(userData, 200, res);
     } else {
       res.status(400);
       throw new Error('Invalid credentials');
     }
   });
   //-------------------------------------------------------------------------------------------
   ```

3. Tambahkan route baru untuk login menggunakan controller login tadi <br/>

   ```js
   // routes/authRoute.js

   import express from 'express';
   import { loginUser, registerUser } from '../controller/authController.js';

   const router = express.Router();

   router.post('/register', registerUser);
   //-----------------------------------------------------------------------------------------
   router.post('/login', loginUser);
   //-----------------------------------------------------------------------------------------
   router.get('/logout', (req, res) => {
     res.send('Logout');
   });

   router.get('/getuser', (req, res) => {
     res.send('Get User');
   });

   export default router;
   ```

## Proteksi endpoint, Logout, dan Get User

Kita akan membahas cara melakukan proteksi endpoint, membuat fungsi logout, dan mengambil data user yang sedang login menggunakan [JWT](https://www.npmjs.com/package/jsonwebtoken). Kita harus membuat controller, middleware, dan route yang diperlukan [ref](https://www.youtube.com/watch?v=fEoI93Z3Efo&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=19)

- authController <br/>
  Pertama, kita akan membuat beberapa fungsi di authController untuk registrasi, login, mendapatkan user yang sedang login, dan logout.

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

  const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const isDev = process.env.NODE_ENV === 'development' ? false : true;
    const cookieOption = {
      expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      security: isDev,
    };

    res.cookie('jwt', token, cookieOption);

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

  export const loginUser = asyncHandler(async (req, res) => {
    // Email validation
    if (!req.body.email) {
      res.status(400);
      throw new Error('Please add an email');
    }

    // Password validation
    if (!req.body.password) {
      res.status(400);
      throw new Error('Please add a password');
    }

    const userData = await User.findOne({ email: req.body.email });

    if (userData && (await userData.comparePassword(req.body.password))) {
      createSendResToken(userData, 200, res);
    } else {
      res.status(400);
      throw new Error('Invalid credentials');
    }
  });

  //--------------------------------------------------------------------------------------------------------------
  export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      return res.status(200).json({
        code: '200',
        status: 'Success',
        message: 'Request was successful.',
        data: user,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(200).json({
      message: 'Logout Berhasil',
    });
  };
  //--------------------------------------------------------------------------------------------------------------
  ```

- Membuat protectedMiddleware<br/>
  Middleware ini akan melindungi endpoint yang hanya bisa diakses oleh user yang sudah login.

  ```js
  // middlewares/authMiddleware.js

  import jwt from 'jsonwebtoken';
  import User from '../models/users.js';
  import asyncHandler from './asyncHandler.js';

  export const protectedMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized to access this route');
      }
    } else {
      res.status(401);
      throw new Error('Not Authorized, no token');
    }
  });
  ```

- Mengupdate authRoutes <br/>
  Tambahkan route untuk registrasi, login, logout, dan mengambil user yang sedang login.

  ```js
  // routes/authRouter.js
  import express from 'express';
  import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
  } from '../controller/authController.js';
  import { protectedMiddleware } from '../middlewares/authMidleware.js';

  const router = express.Router();

  router.post('/register', registerUser);

  router.post('/login', loginUser);

  //------------------------------------------------------------------------------------------------
  router.get('/logout', protectedMiddleware, logoutUser);

  router.get('/getuser', protectedMiddleware, getCurrentUser);
  //------------------------------------------------------------------------------------------------

  export default router;
  ```

## Membuat Fitur Create Product

kita akan membuat fitur untuk menambahkan produk baru ke database. Berikut adalah langkah-langkah yang diperlukan [ref](https://www.youtube.com/watch?v=tLs-dAsaxq0&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=18) [ref2](https://www.youtube.com/watch?v=39ReBTjqIjE&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=18):

1. Membuat Schema Produk dengan menggunakan Mongoose.

   ```js
   // models/products.js
   import mongoose, { Schema } from 'mongoose';

   const productSchema = new Schema({
     name: {
       type: String,
       required: [true, 'Name is required'],
       unique: [true, 'Name is already taken'],
     },
     price: {
       type: Number,
       required: [true, 'Price is required'],
     },
     description: {
       type: String,
       required: [true, 'Description is required'],
     },
     image: {
       type: String,
       default: null,
     },
     category: {
       type: String,
       required: [true, 'Category is required'],
       enum: ['Sepatu', 'Kemeja', 'Baju', 'Celana'],
     },
     stock: {
       type: Number,
       default: 0,
     },
   });

   const Product = mongoose.model('Product', productSchema);
   export default Product;
   ```

2. Buat Controller untuk menambahkan data produk baru ke database.

   ```js
   // controllers/productController.js

   import asyncHandler from '../middlewares/asyncHandler.js';
   import Product from '../models/products.js';

   export const CreateProduct = asyncHandler(async (req, res) => {
     const newProduct = await Product.create(req.body);

     return res.status(201).json({
       code: '201',
       status: 'Scuccess',
       message: 'Product created successfully',
       data: newProduct,
     });
   });
   ```

3. Buat Router untuk Product untuk menghandle request ke endpoint product.

   ```js
   // routes/productRouter.js

   import express from 'express';
   import { CreateProduct } from '../controller/productController.js';

   const router = express.Router();

   router.post('/', CreateProduct);

   export default router;
   ```

4. Tambahkan router product tadi ke File Entry Point agar bisa menggunakan router product yang telah kita buat.

   ```js
   // index.js

   import express from 'express';
   import dotenv from 'dotenv';
   import cookieParser from 'cookie-parser';

   dotenv.config();
   const app = express();

   import connectDB from './config/db.js';
   import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
   import authRouter from './routes/authRouter.js';
   //--------------------------------------------------------------------------------------
   import productRouter from './routes/productRouter.js';
   //--------------------------------------------------------------------------------------

   // Middleware
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(cookieParser());

   // Route
   app.use('/api/v1/auth', authRouter);
   //--------------------------------------------------------------------------------------
   app.use('/api/v1/products', productRouter);
   //--------------------------------------------------------------------------------------

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

## Fitur Get All Products dan Get Product By Id

- Tambahkan Controller untuk Get All Products dan Get Product By Id<br/>
  Tambahkan logic untuk Get All Products dan Get Product By ID.

  ```js
  // controllers/productController.js

  import mongoose from 'mongoose';
  import asyncHandler from '../middlewares/asyncHandler.js';
  import Product from '../models/products.js';

  export const CreateProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    return res.status(201).json({
      code: '201',
      status: 'Scuccess',
      message: 'Product created successfully',
      data: newProduct,
    });
  });

  //-------------------------------------------------------------------------------------------
  export const GetAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();

    return res.status(200).json({
      code: '200',
      status: 'Success',
      message: 'Request was successful',
      data: products,
    });
  });

  export const GetProductById = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req?.params?.id)) {
      res.status(404);
      throw new Error('Invalid ID format');
    }

    const product = await Product.findById(req?.params?.id);

    if (!product) {
      res.status(404);
      throw new Error('ID not found');
    }

    return res.status(200).json({
      code: '200',
      status: 'Success',
      message: 'Request was successful',
      data: product,
    });
  });
  //-------------------------------------------------------------------------------------------
  ```

- Tambahkan Route untuk Get All Products dan Get Product By Id<br/>
  Tambahkan route untuk menggunakan cotroller get all products dan get product by id tadi

  ```js
  // routes/productRouter.js

  import express from 'express';
  import {
    CreateProduct,
    GetAllProduct,
    GetProductById,
  } from '../controller/productController.js';

  const router = express.Router();

  router.post('/', CreateProduct);
  //-------------------------------------------------------------------
  router.get('/', GetAllProduct);
  router.get('/:id', GetProductById);
  //-------------------------------------------------------------------

  export default router;
  ```

## Update Product

Berikut langkah - langkahnya [ref](https://www.youtube.com/watch?v=Qe0Jbz2JnBI&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=15):

- Buat logic untuk melakukan update product di bagian product controller

  ```js
  // controllers/productControler.js

  import mongoose from 'mongoose';
  import asyncHandler from '../middlewares/asyncHandler.js';
  import Product from '../models/products.js';

  export const CreateProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    return res.status(201).json({
      code: '201',
      status: 'Scuccess',
      message: 'Product created successfully',
      data: newProduct,
    });
  });

  export const GetAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();

    return res.status(200).json({
      code: '200',
      status: 'Success',
      message: 'Request was successful',
      data: products,
    });
  });

  export const GetProductById = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req?.params?.id)) {
      res.status(404);
      throw new Error('Invalid ID format');
    }

    const product = await Product.findById(req?.params?.id);

    if (!product) {
      res.status(404);
      throw new Error('ID not found');
    }

    return res.status(200).json({
      code: '200',
      status: 'Success',
      message: 'Request was successful',
      data: product,
    });
  });

  //----------------------------------------------------------------------------------------
  export const UpdateProduct = asyncHandler(async (req, res) => {
    //   Check Id format
    if (!mongoose.isValidObjectId(req?.params?.id)) {
      res.status(404);
      throw new Error('Invalid ID format');
    }

    const updateProduct = await Product.findByIdAndUpdate(
      req?.params?.id,
      req?.body,
      { runValidators: true, new: true }
    );

    // check if product is not exist
    if (!updateProduct) {
      res.status(404);
      throw new Error('ID not found');
    }

    return res.status(201).json({
      code: '201',
      status: 'Success',
      message: 'Product updated successfully',
      data: updateProduct,
    });
  });
  //----------------------------------------------------------------------------------------
  ```

- Tambahkan router untuk Update Product menggunakan controller update product tadi

  ```js
  // routes/productRouter.js

  import express from 'express';
  import {
    CreateProduct,
    GetAllProduct,
    GetProductById,
    UpdateProduct,
  } from '../controller/productController.js';

  const router = express.Router();

  router.post('/', CreateProduct);
  router.get('/', GetAllProduct);
  router.get('/:id', GetProductById);
  //----------------------------------------------------------
  router.put('/:id', UpdateProduct);
  //----------------------------------------------------------

  export default router;
  ```

## Delete Product

Berikut langkah - langkahnya [ref](https://www.youtube.com/watch?v=Qe0Jbz2JnBI&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=15):

- Buat logic untuk melakukan delete product di bagian product controller

  ```js
  // controllers/productController.js

  import mongoose from 'mongoose';
  import asyncHandler from '../middlewares/asyncHandler.js';
  import Product from '../models/products.js';

  export const CreateProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    return res.status(201).json({
      code: '201',
      status: 'Scuccess',
      message: 'Product created successfully',
      data: newProduct,
    });
  });

  export const GetAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();

    return res.status(200).json({
      code: '200',
      status: 'Success',
      message: 'Request was successful',
      data: products,
    });
  });

  export const GetProductById = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req?.params?.id)) {
      res.status(404);
      throw new Error('Invalid ID format');
    }

    const product = await Product.findById(req?.params?.id);

    if (!product) {
      res.status(404);
      throw new Error('ID not found');
    }

    return res.status(200).json({
      code: '200',
      status: 'Success',
      message: 'Request was successful',
      data: product,
    });
  });

  export const UpdateProduct = asyncHandler(async (req, res) => {
    //   Check Id format
    if (!mongoose.isValidObjectId(req?.params?.id)) {
      res.status(404);
      throw new Error('Invalid ID format');
    }

    const updateProduct = await Product.findByIdAndUpdate(
      req?.params?.id,
      req?.body,
      { runValidators: true, new: true }
    );

    // check if product is not exist
    if (!updateProduct) {
      res.status(404);
      throw new Error('ID not found');
    }

    return res.status(201).json({
      code: '201',
      status: 'Success',
      message: 'Product updated successfully',
      data: updateProduct,
    });
  });

  //--------------------------------------------------------------------------------------------------------
  export const DeleteProduct = asyncHandler(async (req, res) => {
    //   Check Id format
    if (!mongoose.isValidObjectId(req?.params?.id)) {
      res.status(404);
      throw new Error('Invalid ID format');
    }

    const deletedProduct = await Product.findByIdAndDelete(req?.params?.id);

    // Check if product is not exist
    if (!deletedProduct) {
      res.status(404);
      throw new Error('ID not found');
    }

    return res.status(201).json({
      code: '200',
      status: 'Success',
      message: 'Product deleted successfully',
      data: deletedProduct,
    });
  });
  //--------------------------------------------------------------------------------------------------------
  ```

- Tambahkan router untuk delete Product menggunakan controller delete product tadi

  ```js
  // routes/productRouter.js

  import express from 'express';
  import {
    CreateProduct,
    DeleteProduct,
    GetAllProduct,
    GetProductById,
    UpdateProduct,
  } from '../controller/productController.js';

  const router = express.Router();

  router.post('/', CreateProduct);
  router.get('/', GetAllProduct);
  router.get('/:id', GetProductById);
  router.put('/:id', UpdateProduct);
  //-----------------------------------------------------------------
  router.delete('/:id', DeleteProduct);
  //-----------------------------------------------------------------

  export default router;
  ```

## Buat Authorization Berdasarkan Role

Kita akan membahas cara menambahkan authorization berdasarkan role dalam aplikasi. Kita akan menambahkan middleware untuk melindungi rute tertentu berdasarkan berdasarka role user. [ref](https://www.youtube.com/watch?v=XHpGL2LTmTw&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=14)

- Buat Owner Middleware:

  - Middleware ini memeriksa apakah pengguna yang terautentikasi memiliki role 'owner'.
  - Jika pengguna memiliki role 'owner', maka request akan dilanjutkan ke handler berikutnya.
  - Jika tidak, middleware akan mengirimkan respons dengan status 401 (Unauthorized).

    ```js
    // middlewares/authMiddleware.js

    import jwt from 'jsonwebtoken';
    import User from '../models/users.js';
    import asyncHandler from './asyncHandler.js';

    export const protectedMiddleware = asyncHandler(async (req, res, next) => {
      let token;
      token = req.cookies.jwt;
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.id).select('-password');
          next();
        } catch (error) {
          res.status(401);
          throw new Error('Not authorized to access this route');
        }
      } else {
        res.status(401);
        throw new Error('Not Authorized, no token');
      }
    });

    //---------------------------------------------------------------------------------------------------
    export const ownerMiddleware = (req, res, next) => {
      if (req?.user && req?.user?.role === 'owner') {
        next();
      } else {
        res.status(401);
        throw new Error('Not authorized as an owner');
      }
    };
    //---------------------------------------------------------------------------------------------------
    ```

- Tambahkan owner middleware yang mengatur proteksi berdasarkan role tadi ke route yang ingin diproteksi<br/>

  ```js
  // routes/productRouter.js

  import express from 'express';
  import {
    CreateProduct,
    DeleteProduct,
    GetAllProduct,
    GetProductById,
    UpdateProduct,
  } from '../controller/productController.js';
  import {
    ownerMiddleware,
    protectedMiddleware,
  } from '../middlewares/authMidleware.js';

  const router = express.Router();

  router.post('/', protectedMiddleware, ownerMiddleware, CreateProduct);
  router.get('/', protectedMiddleware, GetAllProduct);
  router.get('/:id', protectedMiddleware, GetProductById);
  router.put('/:id', protectedMiddleware, ownerMiddleware, UpdateProduct);
  router.delete('/:id', protectedMiddleware, ownerMiddleware, DeleteProduct);

  export default router;
  ```

## Upload file (image) menggunakan Multer

Berikut adalah penjelasan lengkap tentang cara mengunggah file menggunakan [Multer](https://www.npmjs.com/package/multer) di ExpressJS [ref](https://www.youtube.com/watch?v=KnkSIJIr1Aw&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=13):

1. Buat utils untuk Upload File <br/>
   Buat utils untuk mengatur penyimpanan file yang diupload menggunakan Multer.

   ```js
   import multer from 'multer';
   import path from 'path';

   const FILE_TYPES = {
     'image/png': 'png',
     'image/jpg': 'jpg',
     'image/jpeg': 'jpeg',
   };

   const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       const isValidFormat = FILE_TYPES[file.mimetype];
       let uploadError = new Error('Invalid image type');
       console.log(path.parse(file.originalname).name.replace(/\s+/g, '_'));

       if (isValidFormat) {
         uploadError = null;
       }

       cb(uploadError, 'public/uploads');
     },

     filename: function (req, file, cb) {
       const originalFileName = path
         .parse(file.originalname)
         .name.replace(/\s+/g, '-');
       const uniqueFileName = `${originalFileName}-${Date.now()}${path.extname(
         file.originalname
       )}`;
       cb(null, uniqueFileName);
     },
   });

   export const upload = multer({ storage: storage });
   ```

   Berikut fungsi utils tersebut:

   - Menentukan Tipe File yang Diizinkan

     ```js
     const FILE_TYPES = {
       'image/png': 'png',
       'image/jpg': 'jpg',
       'image/jpeg': 'jpeg',
     };
     ```

     Objek FILE_TYPES menentukan tipe file yang diizinkan untuk diunggah. Key adalah tipe [MIME](#mime) dari file, dan value adalah ekstensi file yang sesuai.

   - Konfigurasi penyimpanan<br/>
     Konfigurasi penyimpanan `multer.diskStorage` menentukan bagaimana dan di mana file yang diunggah akan disimpan:

     - Destination Function:

       - Memeriksa apakah tipe file valid dengan memeriksa tipe MIME terhadap FILE_TYPES.
       - Jika tipe file valid, uploadError diatur ke null, jika tidak, diatur ke pesan kesalahan.
       - Callback cb dipanggil dengan parameter uploadError dan direktori tujuan 'public/uploads'.

     - filename Function:

       - Menghasilkan nama file unik dengan menggabungkan nama file original, timestamp saat ini, dan ekstensi file asli.
       - `path.parse()` adalah metode yang memecah path file menjadi beberapa bagian (root, dir, base, ext, name). Dalam konteks ini, kita hanya menggunakan file.originalname sebagai input untuk `path.parse()`
       - Hasil dari path.parse(file.originalname) adalah sebuah objek yang berisi:
         ```js
         {
           root: '',        // root dari path (biasanya kosong jika hanya nama file yang diberikan)
           dir: '',         // direktori dari path (biasanya kosong jika hanya nama file yang diberikan)
           base: 'example file.jpg', // nama lengkap file termasuk ekstensi
           ext: '.jpg',     // ekstensi file
           name: 'example file'  // nama file tanpa ekstensi
         }
         ```
       - Callback cb dipanggil dengan null (tidak ada kesalahan) dan nama file yang unik.

2. Controller Produk <br/>
   Tambahkan fungsi UploadImage untuk menghandle unggahan file dan modifikasi.

   ```js
   // controllers/productController.js

   import mongoose from 'mongoose';
   import asyncHandler from '../middlewares/asyncHandler.js';
   import Product from '../models/products.js';

   export const CreateProduct = asyncHandler(async (req, res) => {
     const newProduct = await Product.create(req.body);

     return res.status(201).json({
       code: '201',
       status: 'Scuccess',
       message: 'Product created successfully',
       data: newProduct,
     });
   });

   export const GetAllProduct = asyncHandler(async (req, res) => {
     const products = await Product.find();

     return res.status(200).json({
       code: '200',
       status: 'Success',
       message: 'Request was successful',
       data: products,
     });
   });

   export const GetProductById = asyncHandler(async (req, res) => {
     if (!mongoose.isValidObjectId(req?.params?.id)) {
       res.status(404);
       throw new Error('Invalid ID format');
     }

     const product = await Product.findById(req?.params?.id);

     if (!product) {
       res.status(404);
       throw new Error('ID not found');
     }

     return res.status(200).json({
       code: '200',
       status: 'Success',
       message: 'Request was successful',
       data: product,
     });
   });

   export const UpdateProduct = asyncHandler(async (req, res) => {
     //   Check Id format
     if (!mongoose.isValidObjectId(req?.params?.id)) {
       res.status(404);
       throw new Error('Invalid ID format');
     }

     // check if product is exist
     const updateProduct = await Product.findByIdAndUpdate(
       req?.params?.id,
       req?.body,
       { runValidators: true, new: true }
     );

     // check if product is not exist
     if (!updateProduct) {
       res.status(404);
       throw new Error('ID not found');
     }

     return res.status(201).json({
       code: '201',
       status: 'Success',
       message: 'Product updated successfully',
       data: updateProduct,
     });
   });

   export const DeleteProduct = asyncHandler(async (req, res) => {
     //   Check Id format
     if (!mongoose.isValidObjectId(req?.params?.id)) {
       res.status(404);
       throw new Error('Invalid ID format');
     }

     const deletedProduct = await Product.findByIdAndDelete(req?.params?.id);

     // Check if product is not exist
     if (!deletedProduct) {
       res.status(404);
       throw new Error('ID not found');
     }

     return res.status(201).json({
       code: '200',
       status: 'Success',
       message: 'Product deleted successfully',
       data: deletedProduct,
     });
   });

   //----------------------------------------------------------------------------------------------
   export const UploadImage = asyncHandler(async (req, res) => {
     const image = req?.file;

     if (!image) {
       res.status(400);
       throw new Error('Please add an image');
     }

     const imageFileName = image.filename;
     const pathImageFile = `/uploads/${imageFileName}`;

     res.status(200).json({
       code: '200',
       status: 'Success',
       message: 'Image uploaded successfully',
       data: pathImageFile,
     });
   });
   //----------------------------------------------------------------------------------------------
   ```

3. Rute Upload File <br/>
   Tambahkan rute untuk mengupload file.

   ```js
   // routes/productRouter.js

   import express from 'express';
   import {
     CreateProduct,
     DeleteProduct,
     GetAllProduct,
     GetProductById,
     UpdateProduct,
     UploadImage,
   } from '../controller/productController.js';
   import {
     ownerMiddleware,
     protectedMiddleware,
   } from '../middlewares/authMidleware.js';
   import { upload } from '../utils/uploadFileHandler.js';

   const router = express.Router();

   router.post('/', ownerMiddleware, CreateProduct);
   router.get('/', protectedMiddleware, GetAllProduct);
   router.get('/:id', protectedMiddleware, GetProductById);
   router.put('/:id', protectedMiddleware, ownerMiddleware, UpdateProduct);
   router.delete('/:id', protectedMiddleware, ownerMiddleware, DeleteProduct);
   //---------------------------------------------------------------------------------------------
   router.post(
     '/file-upload',
     protectedMiddleware,
     ownerMiddleware,
     upload.single('image'),
     UploadImage
   );
   //---------------------------------------------------------------------------------------------

   export default router;
   ```

4. Tambahkan middleware statis yang mengarah ke folder public. <br/>
   Ini berguna agar kita bisa melihat gambar yang kita upload ke database melalui browser menggunakan domain dasar, port, dan path yang kita set di database. Jadi, di browser kita bisa memeriksa gambar yang kita unggah di database tersebut dengan URL `baseDomain:port/pathFile`.

   ```js
   // index.js

   import express from 'express';
   import dotenv from 'dotenv';
   import cookieParser from 'cookie-parser';

   dotenv.config();
   const app = express();

   import connectDB from './config/db.js';
   import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
   import authRouter from './routes/authRouter.js';
   import productRouter from './routes/productRouter.js';

   // Middleware
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(cookieParser());
   //-------------------------------------------------------------------------------------------
   app.use(express.static('./public'));
   //-------------------------------------------------------------------------------------------

   // Route
   app.use('/api/v1/auth', authRouter);
   app.use('/api/v1/products', productRouter);

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

## Cara Membuat Seed untuk Product

Menyediakan data awal atau seed data ke dalam database sering kali diperlukan untuk tujuan development dan testing. Berikut adalah langkah-langkah untuk membuat seed data:

- Instalasi dan Konfigurasi Database <br>
  Pastikan kita telah menginstal dan mengonfigurasi MongoDB serta telah membuat model Product.
- Buat file bernama `seedProduct.js` di folder project kita.

  ```js
  // seedProduct.js

  import Product from './models/products.js';
  import connectDB from './config/db.js';

  const products = [
    {
      name: 'nike air max',
      price: 500000,
      description: 'Sepatu olahraga',
      category: 'Sepatu',
    },
    .....
  ];

  connectDB();

  async function seedManyProducts() {
    try {
      const response = await Product.insertMany(products);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  seedManyProducts();
  ```

- Data Produk<br/>
  Assign data products yang merupakan array yang berisi objek-objek produk yang akan diinsert ke dalam database yang digunakan untuk kepentingan development dan testing. Setiap objek produk memiliki atribut seperti name, price, description, dan category.
- Koneksi ke Database <br/>
  connectDB() digunakan untuk menghubungkan ke database.
- Fungsi seedManyProducts <br/>
  seedManyProducts adalah fungsi asinkron yang menggunakan Product.insertMany untuk menambahkan semua produk dari array products ke dalam database.
- Memanggil Fungsi seedManyProducts<br/>
  `seedManyProducts()` dipanggil untuk menjalankan proses seeding data.

## Menambahkan Filter dan Pagination pada Produk

Dalam pengembangan aplikasi web, memberikan kemampuan bagi user untuk memfilter dan melihat produk berdasarkan halaman tertentu adalah fitur yang sangat penting. Untuk mendukung filter dan pagination, kita perlu melakukan beberapa perubahan pada method `GetAllProduct` [ref](https://www.youtube.com/watch?v=1KFicWo_TUA&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=12)

```js
import mongoose from 'mongoose';
import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/products.js';

export const CreateProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    code: '201',
    status: 'Scuccess',
    message: 'Product created successfully',
    data: newProduct,
  });
});

export const GetAllProduct = asyncHandler(async (req, res) => {
  //---------------------------------------------------------------------------------------------------
  //   Req query
  const queryObj = { ...req?.query };

  const excludedFields = ['page', 'limit'];
  excludedFields.forEach((element) => delete queryObj[element]);

  let query = Product.find(queryObj);

  const totalItems = await Product.countDocuments(queryObj);

  // Pagination
  const page = req?.query?.page * 1 || 1;
  const limitData = req?.query?.limit * 1 || 30;
  const skipData = (page - 1) * limitData;
  const totalPages = Math.ceil(totalItems / limitData);

  query = query.skip(skipData).limit(limitData);

  if (req?.query?.page) {
    const numProduct = await Product.countDocuments();
    if (skipData >= numProduct) {
      res.status(404);
      throw new Error('This page does not exist');
    }
  }

  const products = await query;

  return res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Request was successful',
    data: products,
    page: {
      totalItems: totalItems,
      pageSize: limitData,
      totalPages: totalPages,
      currentPage: page,
    },
  });
});
//---------------------------------------------------------------------------------------------------

export const GetProductById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  const product = await Product.findById(req?.params?.id);

  if (!product) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Request was successful',
    data: product,
  });
});

export const UpdateProduct = asyncHandler(async (req, res) => {
  //   Check Id format
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  // check if product is exist
  const updateProduct = await Product.findByIdAndUpdate(
    req?.params?.id,
    req?.body,
    { runValidators: true, new: true }
  );

  // check if product is not exist
  if (!updateProduct) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(201).json({
    code: '201',
    status: 'Success',
    message: 'Product updated successfully',
    data: updateProduct,
  });
});

export const DeleteProduct = asyncHandler(async (req, res) => {
  //   Check Id format
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  const deletedProduct = await Product.findByIdAndDelete(req?.params?.id);

  // Check if product is not exist
  if (!deletedProduct) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(201).json({
    code: '200',
    status: 'Success',
    message: 'Product deleted successfully',
    data: deletedProduct,
  });
});

export const UploadImage = asyncHandler(async (req, res) => {
  const image = req?.file;

  if (!image) {
    res.status(400);
    throw new Error('Please add an image');
  }

  const imageFileName = image.filename;
  const pathImageFile = `/uploads/${imageFileName}`;

  res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Image uploaded successfully',
    data: pathImageFile,
  });
});
```

Berkut langkah - langkah code diatas:

- Menghapus Parameter Pagination dari Query Objek
  - Kita menghapus page dan limit dari queryObj untuk memastikan bahwa mereka tidak mempengaruhi filter pencarian produk di database.
    ```js
    const excludedFields = ['page', 'limit'];
    excludedFields.forEach((element) => delete queryObj[element]);
    ```
- Membuat Query Database Berdasarkan Query Objek yang Dimodifikasi
  ```js
  let query = Product.find(queryObj);
  ```
  Query ini hanya akan mempertimbangkan parameter yang relevan untuk pencarian produk, seperti name, category, atau price.
- Menambahkan Pagination ke Query:
  ```js
  const page = req?.query?.page _ 1 || 1;
  const limitData = req?.query?.limit _ 1 || 30;
  const skipData = (page - 1) \* limitData;
  query = query.skip(skipData).limit(limitData);
  ```
- Memeriksa Validitas Halaman:

  ```js
  if (req?.query?.page) {
    const numProduct = await Product.countDocuments();
    if (skipData >= numProduct) {
      res.status(404);
      throw new Error('This page does not exist');
    }
  }
  ```

## Searching Berdasarkan Nama Product

Untuk membuat fitur search kita harus melakukan beberapa perubahan pada controller `GetAllProduct` [ref](https://www.youtube.com/watch?v=Op-Qb8cOO48&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=13):

```js
// controllers/productController.js

import mongoose from 'mongoose';
import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/products.js';

export const CreateProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    code: '201',
    status: 'Scuccess',
    message: 'Product created successfully',
    data: newProduct,
  });
});

export const GetAllProduct = asyncHandler(async (req, res) => {
  //   Req query
  const queryObj = { ...req?.query };

  //-------------------------------------------------------------------------------------------------------------------------
  const excludedFields = ['page', 'limit', 'name'];
  excludedFields.forEach((element) => delete queryObj[element]);

  let query;

  if (req?.query?.name) {
    query = Product.find({
      name: { $regex: req?.query?.name, $options: 'i' },
    });
  } else {
    query = Product.find(queryObj);
  }

  const totalItems = await Product.countDocuments(query);
  //-------------------------------------------------------------------------------------------------------------------------

  // Pagination
  const page = req?.query?.page * 1 || 1;
  const limitData = req?.query?.limit * 1 || 30;
  const skipData = (page - 1) * limitData;
  const totalPages = Math.ceil(totalItems / limitData);

  query = query.skip(skipData).limit(limitData);

  if (req?.query?.page) {
    if (skipData >= totalItems) {
      res.status(404);
      throw new Error('This page does not exist');
    }
  }

  const products = await query;

  return res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Request was successful',
    data: products,
    page: {
      totalItems: totalItems,
      pageSize: limitData,
      totalPages: totalPages,
      currentPage: page,
    },
  });
});

export const GetProductById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  const product = await Product.findById(req?.params?.id);

  if (!product) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Request was successful',
    data: product,
  });
});

export const UpdateProduct = asyncHandler(async (req, res) => {
  //   Check Id format
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  // check if product is exist
  const updateProduct = await Product.findByIdAndUpdate(
    req?.params?.id,
    req?.body,
    { runValidators: true, new: true }
  );

  // check if product is not exist
  if (!updateProduct) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(201).json({
    code: '201',
    status: 'Success',
    message: 'Product updated successfully',
    data: updateProduct,
  });
});

export const DeleteProduct = asyncHandler(async (req, res) => {
  //   Check Id format
  if (!mongoose.isValidObjectId(req?.params?.id)) {
    res.status(404);
    throw new Error('Invalid ID format');
  }

  const deletedProduct = await Product.findByIdAndDelete(req?.params?.id);

  // Check if product is not exist
  if (!deletedProduct) {
    res.status(404);
    throw new Error('ID not found');
  }

  return res.status(201).json({
    code: '200',
    status: 'Success',
    message: 'Product deleted successfully',
    data: deletedProduct,
  });
});

export const UploadImage = asyncHandler(async (req, res) => {
  const image = req?.file;

  if (!image) {
    res.status(400);
    throw new Error('Please add an image');
  }

  const imageFileName = image.filename;
  const pathImageFile = `/uploads/${imageFileName}`;

  res.status(200).json({
    code: '200',
    status: 'Success',
    message: 'Image uploaded successfully',
    data: pathImageFile,
  });
});
```

- Penambahan Fitur Pencarian Nama Produk<br/>
  - Memeriksa apakah query parameter name ada.
  - Jika ada, maka query produk diubah untuk mencari nama produk yang cocok menggunakan ekspresi reguler (`$regex`) dengan opsi case-insensitive ($options: 'i'). Ini memungkinkan pencarian yang fleksibel berdasarkan nama produk.
- Penghapusan Field yang Dikecualikan <br/>
  Field name ditambahkan ke dalam daftar excludedFields yang dihapus dari queryObj. Ini untuk memastikan bahwa parameter pencarian nama tidak diproses bersama dengan parameter lainnya.
- Perhitungan Total Items dan Pagination <br/>
  Setelah menentukan query yang sesuai, controller menghitung jumlah total item berdasarkan query yang digunakan. Pagination diterapkan seperti sebelumnya, memastikan bahwa hasil pencarian dibagi dalam halaman-halaman yang sesuai.
- Penanganan Halaman Tidak Ditemukan<br/>
  Cek untuk memastikan bahwa jika skipData melebihi total item yang tersedia, maka akan mengembalikan status 404 dan pesan kesalahan.

## Membuat Fitur Post Order

Fitur "Post Order" memungkinkan user untuk membuat pesanan dengan detail produk yang ada di dalam cart mereka. Berikut adalah langkah-langkah yang diperlukan untuk mengimplementasikan fitur ini [ref](https://www.youtube.com/watch?v=zdlWcZPsv0M&list=PLBAY64k6bSAc5xoYSDyh09_1BdfHxwdQY&index=10).

1. Membuat Model dan Schema Order <br/>
   Schema Order akan mendefinisikan struktur dokumen pesanan yang akan disimpan dalam MongoDB.

   ```js
   // models/orderModel.js

   import mongoose, { Schema } from 'mongoose';

   const singleProduct = Schema({
     name: { type: String, required: true },
     quantity: { type: Number, required: true },
     price: { type: Number, required: true },
     product: {
       type: mongoose.Schema.ObjectId,
       ref: 'Product',
       required: true,
     },
   });

   const orderSchema = new Schema({
     totalPrice: {
       type: Number,
       required: [true, 'Total price is required'],
     },
     itemsDetail: [singleProduct],
     user: {
       type: Schema.ObjectId,
       ref: 'User',
       required: true,
     },
     status: {
       type: String,
       enum: ['pending', 'failed', 'success', 'canceled'],
       default: 'pending',
     },
     firstName: {
       type: String,
       required: [true, 'First name is required'],
     },
     lastName: {
       type: String,
       required: [true, 'Last name is required'],
     },
     phone: {
       type: String,
       required: [true, 'Phone number is required'],
     },
     email: {
       type: String,
       required: [true, 'Email is required'],
     },
   });

   const Order = mongoose.model('Order', orderSchema);
   export default Order;
   ```

2. Membuat Controller untuk Create Order <br/>
   Selanjutnya, kita buat controller untuk menangani request create order.

   ```js
   // controllers/orderController.js

   import asyncHandler from '../middlewares/asyncHandler.js';
   import Order from '../models/orderModel.js';
   import Product from '../models/productModel.js';

   export const CreateOrder = asyncHandler(async (req, res) => {
     const { email, firstName, lastName, phone, cartItems } = req?.body;

     if (!cartItems || cartItems.length < 1) {
       res.status(400);
       throw new Error('Cart is empty');
     }

     let orderItems = [];
     let totalPrice = 0;

     for (const cart of cartItems) {
       const productData = await Product.findOne({ _id: cart?.product });

       if (!productData) {
         res.status(404);
         throw new Error('Product not found');
       }

       const { name, price, _id } = productData;
       const singleProduct = {
         quantity: cart?.quantity,
         name,
         price,
         product: _id,
       };

       orderItems = [...orderItems, singleProduct];
       totalPrice += cart?.quantity * price;
     }

     const order = await Order.create({
       itemsDetail: orderItems,
       totalPrice,
       firstName,
       lastName,
       phone,
       email,
       user: req?.user?.id,
     });

     return res.status(201).json({
       code: '201',
       status: 'Success',
       message: 'Order created successfully',
       data: order,
     });
   });
   ```

3. Membuat Router untuk Create Order<br/>
   Router ini akan menghubungkan endpoint ke controller create order tadi yang telah dibuat.

   ```js
   // router/orderRouter.js

   import express from 'express';
   import { protectedMiddleware } from '../middlewares/authMidleware.js';
   import { CreateOrder } from '../controller/orderController.js';

   const router = express.Router();

   router.post('/', protectedMiddleware, CreateOrder);

   export default router;
   ```

4. Mengintegrasikan Order Router ke dalam File Entry Point<br/>
   Terakhir, kita tambahkan order router ini ke dalam file entry point aplikasi kita.

   ```js
   // index.js

   import express from 'express';
   import dotenv from 'dotenv';
   import cookieParser from 'cookie-parser';

   dotenv.config();
   const app = express();

   import connectDB from './config/db.js';
   import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
   import authRouter from './routes/authRouter.js';
   import productRouter from './routes/productRouter.js';
   //--------------------------------------------------------------------------
   import orderRouter from './routes/orderRouter.js';
   //--------------------------------------------------------------------------

   // Middleware
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(cookieParser());
   app.use(express.static('./public'));

   // Route
   app.use('/api/v1/auth', authRouter);
   app.use('/api/v1/products', productRouter);
   //--------------------------------------------------------------------------
   app.use('/api/v1/orders', orderRouter);
   //--------------------------------------------------------------------------

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
