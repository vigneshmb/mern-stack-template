import { Route, Routes } from 'react-router';
import App from '../App';
import HomePage from '#Pages/HomePage.jsx';
import BoardListPage from '#Pages/BoardListPage.jsx';
import LoginSignUpPage from '#Pages/LoginSignupPage.jsx';
import PublicRoutes from './PublicRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* <PublicRoutes/> */}
      <Route path="/" element={<LoginSignUpPage />} />
      <Route path="boards" element={<BoardListPage />}>
        <Route index element={<BoardListPage />} />
        {/* <Route path="board/:id" element={<Project />} /> */}
      </Route>
    </Routes>
  );
}
