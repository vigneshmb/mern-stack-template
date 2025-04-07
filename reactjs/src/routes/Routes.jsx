import { Routes } from 'react-router';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { UserProvider } from '#Contexts/userContext.jsx';
import { TaskProvider } from '#Contexts/TaskContext.jsx';

export default function AppRoutes() {
  return (
    <UserProvider>
      <TaskProvider>
        <Routes>
          {PublicRoutes()}
          {PrivateRoutes()}
        </Routes>
      </TaskProvider>
    </UserProvider>
  );
}
