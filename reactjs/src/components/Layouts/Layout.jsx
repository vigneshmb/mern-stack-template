import { Outlet } from 'react-router';
import { HeaderPrivate, HeaderPublic } from './HeaderFooter';

export const PublicLayout = () => {
  return (
    <>
      <HeaderPublic />
      <Outlet/>
    </>
  );
};

export const PrivateLayout = () => {
  return (
    <>
      <HeaderPrivate />
      <Outlet/>
    </>
  );
};
