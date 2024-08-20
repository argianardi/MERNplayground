import { useEffect, useState } from 'react';
import { ProductType } from '../types/ProductTypes';
import { getAllProductsWithoutCookie } from '../services/productServiceWithoutCookie';
import { useNavigate } from 'react-router-dom';

export const useProductsWithoutCookie = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await getAllProductsWithoutCookie(navigate);
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
  }, []);

  return { products, error, isLoading };
};
