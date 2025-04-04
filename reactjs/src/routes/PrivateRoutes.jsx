import { UserContext } from '#Contexts/userContext.jsx';
import BoardListPage from '#Pages/BoardListPage.jsx';
import { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router';

const RedirectToLogin = () => {
  const {isAuthenticated} = useContext(UserContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default function PrivateRoutes() {
  return (
    <>
      <Route element={<RedirectToLogin />}>
        <Route path="boards" element={<BoardListPage />} />
      </Route>
    </>
  );
}
