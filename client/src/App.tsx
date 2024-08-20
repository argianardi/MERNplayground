import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import PublicLayout from './layouts/PublicLayout';
import HomeView from './pages/HomeView';
import ProductView from './pages/ProductView';
import OrderView from './pages/OrderView';
import CartView from './pages/CartView';
import AboutView from './pages/AboutView';
import LoginView from './pages/auth/LoginView';
import Register from './pages/auth/Register';
import DetailProduct from './pages/DetailProduct';

// Loader
import { HomeLoader } from './pages/HomeView';
import { ProductViewLoader } from './pages/ProductView';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterWithoutCookies from './pages/auth/RegisterWithoutCookies';
import ProtectedRouteWithoutCookie from './components/ProtectedRouteWithoutCookie';
import PublicLayoutWithoutCookie from './layouts/PublicLayoutWithoutCookie';
import LoginViewWithoutCookie from './pages/auth/LoginWithoutCookie';
import ProductViewWithoutCookie from './pages/pages_without_cookie/ProductViewWithoutCookie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader,
      },
      {
        path: 'products',
        element: <ProductView />,
        loader: ProductViewLoader,
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
        element: (
          <ProtectedRoute>
            <CartView />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart-without-cookie',
        element: (
          <ProtectedRouteWithoutCookie>
            <CartView />
          </ProtectedRouteWithoutCookie>
        ),
      },
      {
        path: 'about',
        element: <AboutView />,
      },
    ],
  },
  {
    path: '/without-cookie',
    element: <PublicLayoutWithoutCookie />,
    children: [
      { index: true, element: <HomeView /> },
      {
        path: 'cart',
        element: (
          <ProtectedRouteWithoutCookie>
            <CartView />
          </ProtectedRouteWithoutCookie>
        ),
      },
      {
        path: 'products',
        element: (
          <ProtectedRouteWithoutCookie>
            <ProductViewWithoutCookie />
          </ProtectedRouteWithoutCookie>
        ),
      },
    ],
  },

  {
    path: 'register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <LoginView />,
  },
  {
    path: 'register-without-cookie',
    element: <RegisterWithoutCookies />,
  },
  {
    path: '/login-without-cookie',
    element: <LoginViewWithoutCookie />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
