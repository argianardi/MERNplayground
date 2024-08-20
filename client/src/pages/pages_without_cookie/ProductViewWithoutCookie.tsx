import ProductCard from '../../components/ProductCard';
import { useProductsWithoutCookie } from '../../hooks/useProductsWithoutCookie';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const ProductViewWithoutCookie = () => {
  const { products, error, isLoading } = useProductsWithoutCookie();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
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
    </>
  );
};

export default ProductViewWithoutCookie;
