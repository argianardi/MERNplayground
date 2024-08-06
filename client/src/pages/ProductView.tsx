import { useLoaderData } from 'react-router-dom';
import customAPI from '../api';
import { ProductLoaderType } from '../types/ProductTypes';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

export const ProductViewLoader = async ({ request }: { request: Request }) => {
  const params = Object.fromEntries([
    ...new URL(request?.url).searchParams.entries(),
  ]);

  const response = await customAPI.get('/products', { params: params });
  console.log('request', request);
  console.log('params', params);

  const products = response?.data?.data;
  const pagination = response.data?.pagination;

  return { products, params, pagination };
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
        <Pagination />
      </div>
    </>
  );
};

export default ProductView;
