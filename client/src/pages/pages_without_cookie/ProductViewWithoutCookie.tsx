import ProductCard from '../../components/ProductCard';
import { useProductsWithoutCookie } from '../../hooks/useProductsWithoutCookie';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Filter from '../../components/Filter';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';

const ProductViewWithoutCookie = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams?.get('name') || null;
  const category = searchParams?.get('category');
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { products, pagination, error, isLoading } = useProductsWithoutCookie(
    name,
    category,
    page
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <Filter resetLink="/without-cookie/products" />
      <h3 className="text-primary text-3xl font-bold text-right">
        Total: {pagination?.totalItems} Produk
      </h3>
      <div className="md:grid-cols-3 lg:grid-cols-4 grid grid-cols-2 gap-5 mt-5">
        {!products?.length ? (
          <h1 className="col-span-full text-3xl font-bold">
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
      {pagination && (
        <div className="flex justify-center mt-5">
          <Pagination pagination={pagination} />
        </div>
      )}
    </>
  );
};

export default ProductViewWithoutCookie;
