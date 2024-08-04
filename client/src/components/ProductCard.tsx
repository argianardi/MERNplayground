import { Link } from 'react-router-dom';
import { ProductType } from '../types/ProductTypes';
import { formatToRupiah } from '../utils/currencyFormatter';

const ProductCard = ({ _id, name, image, price, description }: ProductType) => {
  return (
    <Link to={`products/${_id}`} className="shadow-xl card bg-base-300">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">{name}</h2>
        <p className="font-bold text-accent">{formatToRupiah(price)}</p>
        <p>{description.substring(0, 5)}...</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
