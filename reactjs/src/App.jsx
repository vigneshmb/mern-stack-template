import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';

import './App.css';
import AppRoutes from '#Routes/Routes.jsx';

function App() {
  return (
    <div className="h-screen w-screen bg-amber-100/10 dark:bg-zinc-900 m-0 p-0 overflow-auto">
      <Toaster gap={15} position="top-right" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
