import { Link } from 'react-router-dom';
import { ProductType } from '../types/ProductTypes';

const Hero = ({ products }: { products: ProductType[] }) => {
  console.log('ini', products);

  return (
    <>
      <div className="grid items-center gap-2 lg:grid-cols-2 ">
        <div className="max-wxl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Selamat datang di Mern Shop
          </h1>
          <p className="mt-8 text-lg leading-8 ">
            Destinasi belanja online terpercaya Anda yang menawarkan berbagai
            produk berkualitas dengan harga kompetitif. Di Mern Shop, kami
            berkomitmen untuk menyediakan pengalaman belanja yang mudah, aman,
            dan menyenangkan untuk semua pelanggan kami.
          </p>
          <div>
            <Link to={'/products'} className="mt-4 btn btn-primary">
              Product Kami
            </Link>
          </div>
        </div>
        <div className="hidden p-4 space-x-4 lg:carousel carousel-center bg-neutral rounded-box h-72">
          {products.map((product) => (
            <div key={product?._id} className="h-full carousel-item">
              <img
                src={product?.image}
                className="object-cover h-full rounded-box"
                alt={product?.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
