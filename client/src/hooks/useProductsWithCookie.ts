import { useEffect, useState } from 'react';
import { ProductType } from '../types/ProductTypes';
import { getAllProductsWithCookie } from '../services/productServiceWithCooke';

interface UseProductsWithCookieReturnType {
  products: ProductType[];
  pagination: PaginationType | null;
  error: string | null;
  isLoading: boolean;
}

interface PaginationType {
  totalItems: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}

export const useProductsWithCookie = (
  name: string | null,
  category: string | null,
  page: number
): UseProductsWithCookieReturnType => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await getAllProductsWithCookie({
          name,
          category,
          page,
          limit: 10,
        });
        setProducts(data?.data);
        // console.log(data);
        setPagination(data?.pagination);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
  }, [name, category]);

  return { products, pagination, error, isLoading };
};

export default useProductsWithCookie;
