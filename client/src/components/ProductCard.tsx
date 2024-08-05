import { Link } from 'react-router-dom';
import { ProductType } from '../types/ProductTypes';
import { formatToRupiah } from '../utils/currencyFormatter';
import { truncateText } from '../utils/truncateText';

const ProductCard = ({
  _id,
  name,
  image,
  price,
  description,
  stock,
  category,
}: ProductType) => {
  return (
    <Link to={`products/${_id}`} className="shadow-xl card bg-base-300">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">{name}</h2>
        <p className="font-bold text-accent">{formatToRupiah(price)}</p>
        <p>{truncateText(description, 5)}</p>
        <div className="flex items-center justify-between">
          <p className="font-bold">Stock: {stock}</p>
          <p className="font-bold">Category: {category}</p>
        </div>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
