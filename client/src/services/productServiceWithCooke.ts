import customAPI from '.';

interface GetAllProductsPropsType {
  name: string | null;
  category: string | null;
  page: number;
  limit?: number;
}

export const getAllProductsWithCookie = async ({
  name,
  category,
  page = 1,
  limit = 10,
}: GetAllProductsPropsType) => {
  try {
    const response = await customAPI.get('/products', {
      params: {
        name,
        category,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error?.response.data.message || 'Something went wrong');
    } else {
      throw new Error('Network error');
    }
  }
};
