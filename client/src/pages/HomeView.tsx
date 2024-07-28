import axios from 'axios';

try {
  const data = await axios.get('/api/v1/products');
  console.log(data);
} catch (error) {
  console.log(error);
}

const HomeView = () => {
  return <div className="text-red-600 font-bold underline">HomeView</div>;
};

export default HomeView;
