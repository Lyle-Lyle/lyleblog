import Footer from '@/components/frontend/footer';
import Header from '@/components/frontend/header';
import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

const FrontendLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default FrontendLayout;
