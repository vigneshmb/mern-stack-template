import { UserContext } from '#Contexts/userContext.jsx';
import { useContext } from 'react';
import { NavLink } from 'react-router';

export const HeaderPublic = () => {
  return (
    <div className="mb-3 p-3 bg-indigo-500 dark:bg-amber-300 dark:text-slate-700 text-zinc-100">
      <div className="flex items-center justify-center">
        <div className="w-14 h-14 rounded-full ml-2 bg-amber-50 text-slate-700 flex justify-center items-center">
          Logo
        </div>
        <h1 className="text-4xl font-extrabold text-center mx-2">
          MERN Stack Template
        </h1>
      </div>
    </div>
  );
};

export const HeaderPrivate = () => {
  return (
    <div className="flex justify-between items-stretch mb-3 p-0 bg-indigo-500 dark:bg-amber-300 dark:text-slate-700 text-zinc-100">
      <div className="flex items-center p-2">
        <div className="w-14 h-14 rounded-full ml-2 bg-amber-50 text-slate-700 flex justify-center items-center">
          Logo
        </div>
        <h1 className="text-4xl font-extrabold text-left mx-2">
          MERN Stack Template
        </h1>
      </div>

      <div className="flex items-center justify-center p-1">
        <Navbar />
        <UserControl />
      </div>
    </div>
  );
};

const Navbar = () => {
  const commonStyle = `m-2 p-2 rounded-md`;
  const linkStyle = (active) =>
    active
      ? `bg-indigo-800 dark:bg-amber-700`
      : `bg-indigo-600 dark:bg-amber-500`;
  return (
    <div className="flex items-center justify-center mx-4 h-full">
      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => `${commonStyle} ${linkStyle(isActive)}`}
        >
          Home
        </NavLink>

        <NavLink
          to="/boards"
          className={({ isActive }) => `${commonStyle} ${linkStyle(isActive)}`}
        >
          Boards
        </NavLink>
      </nav>
    </div>
  );
};

const UserControl = () => {
  const { userData } = useContext(UserContext);
  const { username, firstName } = userData;
  // const commonStyle = `m-2 p-2 rounded-md`;
  // const linkStyle = (active) =>
  //   active
  //     ? `bg-indigo-800 dark:bg-amber-700`
  //     : `bg-indigo-600 dark:bg-amber-500`;
  return (
    <div className="flex items-center justify-center bg-indigo-600 ml-3 p-4 dark:bg-amber-300 hover:bg-indigo-800 hover:dark:bg-amber-700 dark:text-slate-700 text-zinc-100 rounded-sm">
      <h2>Hi, {username || firstName || 'User'}</h2>
    </div>
  );
};
