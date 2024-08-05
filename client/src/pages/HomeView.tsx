import { useEffect, useState } from 'react';
import customAPI from '../api';
import ProductCard from '../components/ProductCard';
import { ProductType } from '../types/ProductTypes';
import { useLoaderData } from 'react-router-dom';
import Hero from '../components/Hero';

export const HomeLoader = async () => {
  try {
    // setIsLoading(true);
    const response = await customAPI.get('/products?limit=3');
    // setProducts(response?.data?.data);
    const products: ProductType[] = response?.data?.data;
    return { products };
  } catch (error) {
    console.log(error);
  } finally {
    // setIsLoading(false);
  }
};

const HomeView = () => {
  const { products } = useLoaderData() as { products: ProductType[] };

  // const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  return (
    <>
      <Hero products={products} />
      <div className="pb-5 mt-5 border-b border-primary">
        <h2 className="text-2xl font-bold capitalize">Product List</h2>
      </div>
      <div className="grid gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product: ProductType) => (
          <ProductCard
            key={product?._id}
            _id={product?._id}
            name={product.name}
            price={product?.price}
            image={product?.image}
            description={product?.description}
            category={product?.category}
            stock={product?.stock}
          />
        ))}
      </div>
    </>
  );
};

export default HomeView;
