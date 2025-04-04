import { Loader } from '#Components/Layouts/Loader.jsx';
import { UserContext } from '#Contexts/userContext.jsx';
import BoardListPage from '#Pages/BoardListPage.jsx';
import HomePage from '#Pages/HomePage.jsx';
import { useContext } from 'react';
import { Route, Navigate, Outlet, useLocation } from 'react-router';

const RedirectToLogin = () => {
  const { isAuthenticated, isUserLoading } = useContext(UserContext);
  let location = useLocation();

  if (isUserLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default function PrivateRoutes() {
  return (
    <>
      <Route element={<RedirectToLogin />}>
        <Route path="boards" element={<BoardListPage />} />
        <Route path="home" element={<HomePage />} />
      </Route>
    </>
  );
}
