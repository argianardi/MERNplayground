import FormAuthWithoutCookies from '../../components/FormAuthWithoutCookies';

const LoginViewWithoutCookie = () => {
  return (
    <main>
      <FormAuthWithoutCookies isRegister={false} />
    </main>
  );
};

export default LoginViewWithoutCookie;
