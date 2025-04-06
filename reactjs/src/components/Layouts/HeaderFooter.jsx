import { logoutUser } from '#Api/usersApi.js';
import { UserContext } from '#Contexts/userContext.jsx';
import useStorage from '#Hooks/useStorage.jsx';
import {
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router';

export const HeaderPublic = () => {
  return (
    <header className="mb-3 p-3 bg-indigo-500 dark:bg-amber-100 dark:text-slate-700 text-zinc-100">
      <div className="flex items-center justify-center">
        <div className="w-14 h-14 rounded-full ml-2 bg-amber-50 text-slate-700 flex justify-center items-center">
          Logo
        </div>
        <h1 className="text-4xl font-extrabold text-center mx-2">
          MERN Stack Template
        </h1>
      </div>
    </header>
  );
};

export const HeaderPrivate = () => {
  return (
    <header className="flex justify-between items-stretch mb-3 p-0 bg-indigo-500 dark:bg-amber-100 dark:text-slate-700 text-zinc-100">
      <div className="flex items-center p-1">
        <HeaderLogo />
        <h1 className="text-4xl font-extrabold text-left mx-2">
          MERN Stack Template
        </h1>
      </div>

      <div className="flex items-center justify-center px-0.5">
        {/* <Navbar /> */}
        <UserControl />
      </div>
    </header>
  );
};

const HeaderLogo = () => {
  return (
    <div className="w-14 h-14 rounded-full ml-2 bg-amber-500 text-slate-700 flex justify-center items-center">
      Logo
    </div>
  );
};

const Navbar = () => {
  const commonStyle = `m-2 p-2 rounded-md`;
  const linkStyle = (active) =>
    active
      ? `bg-indigo-800 dark:bg-amber-600`
      : `bg-indigo-600 dark:bg-amber-500`;
  return (
    <nav className="flex items-center justify-center mx-4 h-full">
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
  );
};

const UserControl = () => {
  const { userData } = useContext(UserContext);
  const { username, firstName } = userData || {};
  const [openFlow, setOpenFlow] = useState(false);
  const navigatePage = useNavigate();
  const { clearLocal, clearSession } = useStorage();
  const { updateUserData } = useContext(UserContext);

  const handleLogout = () => {
    logoutUser().then((resp) => {
      const { msg, status } = resp;
      status && status === 200
        ? toast.success(msg || 'Thank you. See you soon')
        : toast.error(msg || 'enayitho gothilla');
      updateUserData(false, {});
      clearLocal();
      clearSession();
      navigatePage('/home');
    });
  };

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setOpenFlow(true)}
      onMouseLeave={() => setOpenFlow(false)}
    >
      <div className="flex items-center justify-center bg-indigo-600 mx-2 px-1 py-2 dark:bg-amber-500 hover:bg-indigo-800 hover:dark:bg-amber-600 dark:text-slate-700 text-zinc-100 rounded-sm">
        <div
          className={`ml-1 mr-2 w-8 h-8 rounded-full ${openFlow ? 'bg-amber-400' : 'bg-amber-600'}`}
        ></div>
        <div className="ml-1 mr-2 flex flex-col">
          <div className="flex">
            <h2>Hi, {username || firstName || 'User'}</h2>
            <span className="place-items-center">
              {openFlow ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
        </div>
      </div>
      <div className={`${openFlow ? '' : 'hidden'} relative block`}>
        <UserDropMenu handleLogout={handleLogout} />
      </div>
    </div>
  );
};

const UserDropMenu = ({ handleLogout }) => {
  const listItemStyle = 'hover:bg-amber-300 ';
  return (
    <div className="absolute z-10 inset-x-0 p-2 ml-2 mr-2 bg-amber-300 rounded-b-md">
      <ul className="flex flex-col gap-2">
        <li className={listItemStyle}>Settings</li>
        <li className={listItemStyle} onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};
