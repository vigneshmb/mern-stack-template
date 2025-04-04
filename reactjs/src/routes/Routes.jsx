import { Routes } from 'react-router';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { UserProvider } from '#Contexts/userContext.jsx';

export default function AppRoutes() {
  return (
    <UserProvider>
      <Routes>
        {PublicRoutes()}
        {PrivateRoutes()}
      </Routes>
    </UserProvider>
  );
}
