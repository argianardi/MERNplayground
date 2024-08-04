import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from '../types/ProductTypes';
import customAPI from '../api';
import { FaPlus } from 'react-icons/fa';
import { formatToRupiah } from '../utils/currencyFormatter';

const DetailProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductType>({} as ProductType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductById();
  }, [id]);

  const fetchProductById = async () => {
    try {
      setIsLoading(true);
      const response = await customAPI.get(`/products/${id}`);
      setProduct(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="shadow-xl card lg:card-side bg-base-300">
        <figure>
          <img
            src={product?.image}
            alt={product?.name}
            className="w-[800px] h-[500px] object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product?.name}</h2>
          <span className="mt-2 text-3xl font-bold text-accent">
            {formatToRupiah(product?.price)}
          </span>
          <span className="badge badge-primary">{product?.category}</span>
          <span className="mt-3 font-bold">Stok: {product?.stock}</span>
          <p>{product?.description}</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary btn-lg">
              <FaPlus /> Keranjang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
