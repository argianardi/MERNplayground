import { useLoaderData } from 'react-router-dom';
import customAPI from '../api';
import { ProductType } from '../types/ProductTypes';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';

export const ProductViewLoader = async ({ request }: { request: Request }) => {
  const response = await customAPI.get('/products');
  console.log('request', request);

  const products = response?.data?.data;

  return { products };
};

const ProductView = () => {
  const { products } = useLoaderData() as { products: ProductType[] };
  console.log('products', products);

  return (
    <>
      <Filter />
      <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
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
        ))}
      </div>
    </>
  );
};

export default ProductView;
