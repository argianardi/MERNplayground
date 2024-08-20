import FormInput from './form/FormInput';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import useAuthWithoutCookies from '../hooks/useAuthWithoutCookies';

const FormAuthWithoutCookies = ({ isRegister }: { isRegister: boolean }) => {
  const { handleSubmit, errors, isLoading, formData, handleChange } =
    useAuthWithoutCookies(isRegister);

  return (
    <div className="place-items-center grid h-screen">
      <form
        className="card w-96 bg-base-300 gap-y-4 flex flex-col p-8 shadow-lg"
        onSubmit={(event) => handleSubmit(event)}
      >
        <h4 className="text-3xl font-bold text-center">
          {isRegister ? 'Register' : 'Login'}
        </h4>
        {isRegister && (
          <FormInput
            type="text"
            name="name"
            label="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        )}
        <FormInput
          type="email"
          name="email"
          label="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          type="password"
          name="password"
          label="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4">
            <button className="btn btn-primary btn-block">
              {isRegister ? 'Register' : 'Login'}
            </button>
          </div>
        )}

        {errors.apiError && <ErrorMessage message={errors.apiError} />}

        {isRegister ? (
          <p className="text-center">
            Sudah punya akun?{' '}
            <Link
              to={'/login-without-cookie'}
              className="link link-hover link-accent ml-2"
            >
              Login
            </Link>
          </p>
        ) : (
          <p className="text-center">
            Belum punya akun?{' '}
            <Link
              to={'/register-without-cookie'}
              className="link link-hover link-accent ml-2"
            >
              Register
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default FormAuthWithoutCookies;
