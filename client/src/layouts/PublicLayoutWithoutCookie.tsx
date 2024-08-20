import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import HeaderWithoutCookie from '../components/HeaderWithoutCookie';

const PublicLayoutWithoutCookie = () => {
  return (
    <>
      <HeaderWithoutCookie />
      <Nav />
      <main className="mx-auto max-w-6xl px-8 py-20 min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayoutWithoutCookie;
