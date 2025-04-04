import { UserContext } from '#Contexts/userContext.jsx';
import LoginSignUpPage from '#Pages/LoginSignupPage.jsx';
import NotFoundPage from '#Pages/NotFound.jsx';
import { useContext } from 'react';
import { Navigate, Outlet, Route } from 'react-router';

const RedirectToHome = () => {
  const { isAuthenticated } = useContext(UserContext);
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/boards" />;
  }

  return <Outlet />;
};
export default function PublicRoutes() {
  return (
    <>
      <Route element={<RedirectToHome />}>
        <Route path="/login" element={<LoginSignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  );
}
