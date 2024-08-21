import customAPI from '.';

export const authService = async (url: string, data: Record<string, any>) => {
  console.log(data);

  try {
    const response = await customAPI.post(url, data);
    console.log(response);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error?.response.data.message || 'Something went wrong');
    } else {
      throw new Error('Network error');
    }
  }
};

export const logout = async () => {
  try {
    await customAPI.post('/auth/logout');
  } catch (error: any) {
    if (error.response) {
      throw new Error(error?.response.data.message || 'Something went wrong');
    } else {
      throw new Error('Network error');
    }
  }
};
