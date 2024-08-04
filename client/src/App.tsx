import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import HomeView from './pages/HomeView';
import ProductView from './pages/ProductView';
import OrderView from './pages/OrderView';
import CartView from './pages/CartView';
import AboutView from './pages/AboutView';
import LoginView from './pages/auth/LoginView';
import Register from './pages/auth/Register';
import DetailProduct from './pages/DetailProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: 'products',
        element: <ProductView />,
      },
      {
        path: 'products/:id',
        element: <DetailProduct />,
      },
      {
        path: 'orders',
        element: <OrderView />,
      },
      {
        path: 'cart',
        element: <CartView />,
      },
      {
        path: 'about',
        element: <AboutView />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginView />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
