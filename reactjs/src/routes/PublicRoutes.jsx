import LoginSignUpPage from '#Pages/LoginSignupPage.jsx';
import { Route, Routes } from 'react-router';

export default function PublicRoutes() {
  return (
    { path: "/", Component: Root },

    <Routes>
      <Route path="/" element={<LoginSignUpPage />} />
      {/* <Route path="/" element={<LoginSignUpPage />} /> */}
    </Routes>
  );
}