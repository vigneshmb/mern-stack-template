import { ThemedButton } from '#Components/ThemedInputs/ThemedButton.jsx';
import useBooleanToggle from '#Hooks/useBooleanToggle.jsx';
import Login from './Login';

export default function LoginSignUp() {
  const [loginSignup, toggleLoginSignup] = useBooleanToggle(true);

  const buttonStyle = `
  p-3
  hover:bg-indigo-400
  dark:hover:bg-amber-100 
  dark:hover:text-zinc-700 
  hover:text-slate-800
  h-full w-1/2 m-1 p-0.5 rounded-md`;

  return (
    <div className="flex flex-col items-center justify-center bg-indigo-600 dark:bg-slate-700 border-2 border-indigo-400 dark:border-amber-200 rounded-md ring-2 dark:ring-amber-200 ring-indigo-400 shadow-lg shadow-indigo-500 dark:shadow-amber-500">
      <div className="flex justify-center items-stretch w-md bg-indigo-300 dark:bg-slate-800 rounded-b-sm">
        <ThemedButton
          buttonHandler={(e) => {
            e.preventDefault();
            toggleLoginSignup.on();
          }}
          buttonLabel={'Login'}
          buttonStyle={`${
            loginSignup
              ? 'bg-indigo-600 text-zinc-100 dark:bg-amber-400 dark:text-slate-800'
              : 'bg-indigo-500 text-zinc-100 dark:bg-amber-200 dark:text-slate-800'
          } ${buttonStyle}`}
        />
        <ThemedButton
          buttonHandler={(e) => {
            e.preventDefault();
            toggleLoginSignup.off();
          }}
          buttonLabel={'Sign Up'}
          buttonStyle={`${
            !loginSignup
              ? 'bg-indigo-600 text-zinc-100 dark:bg-amber-400 dark:text-slate-800'
              : 'bg-indigo-500 text-zinc-100 dark:bg-amber-200 dark:text-slate-800'
          } ${buttonStyle}`}
        />
      </div>
      <div className="bg-indigo-100 dark:bg-zinc-700 text-indigo-500 dark:text-amber-400 mx-1 w-full h-full">
        {loginSignup ? <Login /> : <h1>Loading.....</h1>}
      </div>
    </div>
  );
}
