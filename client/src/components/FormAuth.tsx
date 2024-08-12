import { Form, Link } from 'react-router-dom';
import FormInput from './form/FormInput';

const FormAuth = ({ isRegister }: { isRegister: boolean }) => {
  return (
    <div className="grid h-screen place-items-center">
      <Form
        method="POST"
        className="flex flex-col p-8 shadow-lg card w-96 bg-base-300 gap-y-4"
      >
        <h4 className="text-3xl font-bold text-center">
          {isRegister ? 'Register' : 'Login'}
        </h4>
        {isRegister && <FormInput type="text" name="name" label="name" />}
        <FormInput type="email" name="email" label="email" />
        <FormInput type="password" name="password" label="password" />
        <div className="mt-4">
          <button className="btn btn-primary btn-block">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </div>

        {isRegister ? (
          <p className="text-center">
            Sudah punya akun?{' '}
            <Link to={'/login'} className="ml-2 link link-hover link-accent">
              Login
            </Link>
          </p>
        ) : (
          <p className="text-center">
            Belum punya akun?{' '}
            <Link to={'/register'} className="ml-2 link link-hover link-accent">
              Register
            </Link>
          </p>
        )}
      </Form>
    </div>
  );
};

export default FormAuth;
