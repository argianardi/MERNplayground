import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const isAuthenticated = !!Cookies.get('jwt');
  const { logout } = useAuth(false);

  return (
    <header className="py-2 bg-neutral text-neutral-content">
      {isAuthenticated ? (
        <div className="flex justify-end max-w-6xl px-8 mx-auto border sm:justify-end">
          <button
            className="text-xs link link-hover sm:text-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-center max-w-6xl px-8 mx-auto border sm:justify-end">
          <div className="flex items-center justify-center gap-x-6">
            <Link to={'/login'} className="text-xs link link-hover sm:text-sm">
              Sign In
            </Link>
            <Link
              to={'/register'}
              className="text-xs link link-hover sm:text-sm"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
