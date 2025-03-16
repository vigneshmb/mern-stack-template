import { BrowserRouter } from 'react-router';

import './App.css';
import AppRoutes from '#Routes/Routes.jsx';

function App() {
  return (
    <div className="h-dvh bg-amber-100 dark:bg-zinc-900 m-0 p-0 overflow-auto">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
