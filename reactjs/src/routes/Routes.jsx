import { Route, Routes } from 'react-router';
import App from '../App';
import HomePage from '#Pages/HomePage.jsx';
import BoardListPage from '#Pages/BoardListPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="board" element={<BoardListPage />}>
        <Route index element={<BoardListPage />} />
        {/* <Route path="board/:id" element={<Project />} /> */}
      </Route>
    </Routes>
  );
}
