// src/hooks/useProductsWithoutCookie.ts

import { useEffect, useState } from 'react';
import { ProductType } from '../types/ProductTypes';
import { getAllProductsWithoutCookie } from '../services/productServiceWithoutCookie';
import { useNavigate } from 'react-router-dom';

interface PaginationType {
  totalItems: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}

export const useProductsWithoutCookie = (
  name: string | null,
  category: string | null,
  page: number
) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await getAllProductsWithoutCookie({
          navigate,
          name,
          category,
          page,
          limit: 10,
        });

        setProducts(data.data);
        setPagination(data.pagination);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
  }, [name, category, page, navigate]);

  return { products, pagination, error, isLoading };
};
