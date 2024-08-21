import { NavigateFunction } from 'react-router-dom';
import customAPI from '.';

// Get token from local storage
const token = localStorage.getItem('jwt');

interface GetAllProductsPropsType {
  navigate: NavigateFunction;
  name: string | null;
  category: string | null;
  page: number;
  limit: number;
}

export const getAllProductsWithoutCookie = async ({
  navigate,
  name,
  category,
  page = 1,
  limit = 10,
}: GetAllProductsPropsType) => {
  try {
    const response = await customAPI.get('/products/without-cookie', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name,
        category,
        page,
        limit,
      },
    });
    // console.log(response.data.data);

    return response?.data;
  } catch (error: any) {
    if (error?.response) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('jwt');
        navigate('/login-without-cookie');

        throw new Error('Session expired, please log in again');
      } else {
        throw new Error(
          error?.response?.data?.message || 'Something went wrong'
        );
      }
    } else {
      throw new Error('Network error');
    }
  }
};
