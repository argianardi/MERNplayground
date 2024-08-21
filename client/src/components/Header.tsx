import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const isAuthenticated = !!Cookies.get('jwt');
  const { logout } = useAuth(false);

  return (
    <header className="bg-neutral text-neutral-content py-2">
      {isAuthenticated ? (
        <div className="sm:justify-end flex justify-end max-w-6xl px-8 mx-auto border">
          <button
            className="link link-hover sm:text-sm text-xs"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="sm:justify-end flex justify-center max-w-6xl px-8 mx-auto border">
          <div className="gap-x-6 flex items-center justify-center">
            <Link to={'/login'} className="link link-hover sm:text-sm text-xs">
              Sign In
            </Link>
            <Link
              to={'/register'}
              className="link link-hover sm:text-sm text-xs"
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
