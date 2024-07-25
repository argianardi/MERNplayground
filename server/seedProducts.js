import Product from './models/productModel.js';
import connectDB from './config/db.js';

const products = [
  {
    name: 'nike air max',
    price: 500000,
    description: 'Sepatu olahraga',
    category: 'Sepatu',
  },
  {
    name: 'adidas ultra boost',
    price: 600000,
    description: 'Sepatu lari',
    category: 'Sepatu',
  },
  {
    name: 'vans old skool',
    price: 350000,
    description: 'Sepatu kasual',
    category: 'Sepatu',
  },
  {
    name: 'reebok classic',
    price: 450000,
    description: 'Sepatu klasik',
    category: 'Sepatu',
  },
  {
    name: 'puma suede',
    price: 400000,
    description: 'Sepatu gaya',
    category: 'Sepatu',
  },
  {
    name: 'converse chuck taylor',
    price: 300000,
    description: 'Sepatu kanvas',
    category: 'Sepatu',
  },
  {
    name: 'timberland boots',
    price: 700000,
    description: 'Sepatu boots',
    category: 'Sepatu',
  },
  {
    name: 'under armour hovr',
    price: 550000,
    description: 'Sepatu running',
    category: 'Sepatu',
  },
  {
    name: 'new balance 574',
    price: 500000,
    description: 'Sepatu sneaker',
    category: 'Sepatu',
  },
  {
    name: 'uniqlo oxford shirt',
    price: 250000,
    description: 'Kemeja oxford',
    category: 'Kemeja',
  },
  {
    name: 'zara formal shirt',
    price: 300000,
    description: 'Kemeja formal',
    category: 'Kemeja',
  },
  {
    name: 'hm casual shirt',
    price: 200000,
    description: 'Kemeja kasual',
    category: 'Kemeja',
  },
  {
    name: 'topman denim shirt',
    price: 350000,
    description: 'Kemeja denim',
    category: 'Kemeja',
  },
  {
    name: 'gap button-down shirt',
    price: 280000,
    description: 'Kemeja button-down',
    category: 'Kemeja',
  },
  {
    name: 'banana republic slim fit shirt',
    price: 400000,
    description: 'Kemeja slim fit',
    category: 'Kemeja',
  },
  {
    name: 'brooks brothers dress shirt',
    price: 600000,
    description: 'Kemeja dress',
    category: 'Kemeja',
  },
  {
    name: 'ralph lauren polo shirt',
    price: 500000,
    description: 'Kemeja polo',
    category: 'Kemeja',
  },
  {
    name: 'calvin klein white shirt',
    price: 450000,
    description: 'Kemeja putih',
    category: 'Kemeja',
  },
  {
    name: 'tommy hilfiger check shirt',
    price: 400000,
    description: 'Kemeja kotak-kotak',
    category: 'Kemeja',
  },
  {
    name: 'nike dri-fit shirt',
    price: 350000,
    description: 'Baju olahraga',
    category: 'Baju',
  },
  {
    name: 'adidas climacool shirt',
    price: 400000,
    description: 'Baju training',
    category: 'Baju',
  },
  {
    name: 'reebok workout shirt',
    price: 300000,
    description: 'Baju workout',
    category: 'Baju',
  },
  {
    name: 'puma running shirt',
    price: 350000,
    description: 'Baju lari',
    category: 'Baju',
  },
  {
    name: 'under armour compression shirt',
    price: 450000,
    description: 'Baju kompresi',
    category: 'Baju',
  },
  {
    name: 'new balance training shirt',
    price: 380000,
    description: 'Baju training',
    category: 'Baju',
  },
  {
    name: 'uniqlo airism shirt',
    price: 250000,
    description: 'Baju kasual',
    category: 'Baju',
  },
  {
    name: 'zara basic t-shirt',
    price: 200000,
    description: 'Baju basic',
    category: 'Baju',
  },
  {
    name: 'hm v-neck shirt',
    price: 220000,
    description: 'Baju v-neck',
    category: 'Baju',
  },
  {
    name: 'gap logo t-shirt',
    price: 240000,
    description: 'Baju logo',
    category: 'Baju',
  },
  {
    name: 'levis crewneck shirt',
    price: 270000,
    description: 'Baju crewneck',
    category: 'Baju',
  },
  {
    name: 'dockers khaki pants',
    price: 400000,
    description: 'Celana khaki',
    category: 'Celana',
  },
  {
    name: 'uniqlo jeans',
    price: 350000,
    description: 'Celana jeans',
    category: 'Celana',
  },
  {
    name: 'zara slim fit pants',
    price: 300000,
    description: 'Celana slim fit',
    category: 'Celana',
  },
  {
    name: 'hm jogger pants',
    price: 250000,
    description: 'Celana jogger',
    category: 'Celana',
  },
  {
    name: 'gap chino pants',
    price: 280000,
    description: 'Celana chino',
    category: 'Celana',
  },
  {
    name: 'levis 501 jeans',
    price: 500000,
    description: 'Celana jeans klasik',
    category: 'Celana',
  },
  {
    name: 'dockers cargo pants',
    price: 420000,
    description: 'Celana cargo',
    category: 'Celana',
  },
  {
    name: 'uniqlo leggings pants',
    price: 300000,
    description: 'Celana legging',
    category: 'Celana',
  },
  {
    name: 'zara wide leg pants',
    price: 350000,
    description: 'Celana wide leg',
    category: 'Celana',
  },
  {
    name: 'hm formal trousers',
    price: 400000,
    description: 'Celana formal',
    category: 'Celana',
  },
  {
    name: 'uniqlo culottes',
    price: 320000,
    description: 'Celana kulot',
    category: 'Celana',
  },
  {
    name: 'gap sweatpants',
    price: 280000,
    description: 'Celana sweatpants',
    category: 'Celana',
  },
  {
    name: 'levis skinny jeans',
    price: 450000,
    description: 'Celana skinny jeans',
    category: 'Celana',
  },
  {
    name: 'uniqlo shorts',
    price: 200000,
    description: 'Celana pendek',
    category: 'Celana',
  },
  {
    name: 'zara bermuda shorts',
    price: 250000,
    description: 'Celana bermuda',
    category: 'Celana',
  },
  {
    name: 'hm track pants',
    price: 300000,
    description: 'Celana track',
    category: 'Celana',
  },
  {
    name: 'gap drawstring pants',
    price: 270000,
    description: 'Celana drawstring',
    category: 'Celana',
  },
];

connectDB();

async function seedManyProducts() {
  try {
    const response = await Product.insertMany(products);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

seedManyProducts();
