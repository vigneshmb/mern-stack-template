import { PublicLayout } from '#Components/Layouts/Layout.jsx';
import { ThemedLoader } from '#Components/Layouts/Loader.jsx';
import { UserContext } from '#Contexts/userContext.jsx';
import LoginSignUpPage from '#Pages/LoginSignupPage.jsx';
import NotFoundPage from '#Pages/NotFound.jsx';
import { useContext } from 'react';
import { Navigate, Outlet, Route, useLocation } from 'react-router';

const RedirectToHome = () => {
  const { isAuthenticated, isUserLoading } = useContext(UserContext);
  let location = useLocation();
  let from = location.state?.from?.pathname || '/home';

  if (isUserLoading) {
    return <ThemedLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to={from} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
export default function PublicRoutes() {
  return (
    <>
      <Route element={<PublicLayout />}>
        <Route element={<RedirectToHome />}>
          <Route path="/login" element={<LoginSignUpPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  );
}
