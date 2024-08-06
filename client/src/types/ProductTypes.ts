export interface ProductType {
  category: string;
  description: string;
  _id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
}

export interface ProductLoaderType {
  products: ProductType[];
  pagination: {
    totalItems: number;
    pageSize: number;
    totalPages: number;
    currentPage: number;
  };
}
