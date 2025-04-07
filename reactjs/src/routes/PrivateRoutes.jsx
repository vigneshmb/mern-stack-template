import { PrivateLayout } from '#Components/Layouts/Layout.jsx';
import { ThemedLoader } from '#Components/Layouts/Loader.jsx';
import { UserContext } from '#Contexts/userContext.jsx';
import { lazy, useContext } from 'react';

const HomePage = lazy(() => import('#Pages/HomePage.jsx'));
const BoardListPage = lazy(() => import('#Pages/BoardListPage.jsx'));

import TaskListPage from '#Pages/TaskListPage.jsx';
import { Navigate, Outlet, Route, useLocation } from 'react-router';

const RedirectToLogin = () => {
  const { isAuthenticated, isUserLoading } = useContext(UserContext);
  let location = useLocation();

  if (isUserLoading) {
    return <ThemedLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

// const LazyComponent = ({ children }) => {
//   return <Suspense fallback={<ThemedLoader />}>{children}</Suspense>;
// };

export default function PrivateRoutes() {
  return (
    <Route element={<PrivateLayout />}>
      <Route element={<RedirectToLogin />}>
        <Route
          path="home"
          element={
            // <LazyComponent>
            <HomePage />
            // </LazyComponent>
          }
        />
        <Route
          path="boards"
          element={
            // <LazyComponent>
            <BoardListPage />
            // </LazyComponent>
          }
        />
        <Route
          path="tasklist"
          element={
            // <LazyComponent>
            <TaskListPage />
            // </LazyComponent>
          }
        />
      </Route>
    </Route>
  );
}
