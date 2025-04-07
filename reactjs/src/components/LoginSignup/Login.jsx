import axiosWrap from '#Api/axiosWrap.js';
import { loginUser } from '#Api/usersApi.js';
import { ThemedInput } from '#Components/ThemedInputs/ThemedInputs.jsx';
import { UserContext } from '#Contexts/userContext.jsx';
import useBooleanToggle from '#Hooks/useBooleanToggle.jsx';
import { checkEmail, checkPassword } from '#Utils/appConstants.js';
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const navigatePage = useNavigate();
  const { updateUserData } = useContext(UserContext);
  const [loginLoader, setLoginLoader] = useBooleanToggle(false);

  const handleValidation = (fieldName, fieldvalue) => {
    let errorMsg = '';
    if (fieldvalue === '') {
      errorMsg = 'Please enter valid data';
    } else {
      if (fieldName === 'email') {
        errorMsg = checkEmail(fieldvalue) ? '' : 'Invalid Email ID';
      } else if (fieldName === 'password') {
        errorMsg = checkPassword(fieldvalue)
          ? ''
          : 'Password should have 8-32 characters';
      }
    }

    setFormErrors((prevErrors) => {
      return {
        ...prevErrors,
        [fieldName]: errorMsg,
      };
    });
  };

  const handleChange = ({ name, value }) => {
    handleValidation(name, value);
    setUserData((prev) => {
      let newData = {
        ...prev,
        [name]: value,
      };

      return newData;
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    Object.keys(userData).map((name) => handleValidation(name, userData[name]));
    const noErrors = formErrors?.email == '' && formErrors?.password == '';
    if (!noErrors) {
      toast.error('Please enter valid data');
      return null;
    }
    const { email, password } = userData;
    setLoginLoader.on();
    await loginUser({
      emailUsername: email,
      password,
    })
      .then((resp) => {
        const { status, msg, data, headers } = resp;
        if (status === 200) {
          const jwt = headers['authorization'];
          axiosWrap.defaults.headers.common['authorization'] = `Bearer ${jwt}`;
          localStorage.setItem('authJWT', jwt);
          toast.success(`${resp.msg}`);
          updateUserData(true, data?.[0]);
          setLoginLoader.off();
          navigatePage('/boards');
        } else {
          toast.error(msg);
          setLoginLoader.off();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err}`);
        setLoginLoader.off();
      });
  };

  const { email, password } = userData;
  const iStyle =
    'rounded p-1 ring-2 ring-indigo-300 dark:ring-amber-200 focus:border-indigo-500 focus:bg-indigo-200 dark:border-amber-300 dark:focus:border-amber-500 dark:focus:bg-slate-700';
  console.count('Login UI');

  return (
    <div className="flex flex-col items-stretch justify-around">
      <ThemedInput
        label={'Email'}
        inputName={'email'}
        inputType={'email'}
        inputId={'email'}
        inputValue={email}
        errorMsg={formErrors?.['email'] || ''}
        changeHandler={handleChange}
        divStyle={'flex flex-col mx-3 my-1 p-1'}
        labelStyle={'font-bold my-1'}
        iStyle={iStyle}
      />

      <ThemedInput
        label={'Password'}
        inputName={'password'}
        inputType={'password'}
        inputId={'password'}
        inputValue={password}
        errorMsg={formErrors?.['password'] || ''}
        changeHandler={handleChange}
        divStyle={'flex flex-col mx-3 my-1 p-1'}
        labelStyle={'font-bold my-1'}
        iStyle={iStyle}
      />
      <div className="flex justify-center items-center mx-2 my-3 p-1">
        <button
          name="login"
          type="submit"
          className={`
          bg-indigo-600 text-zinc-100 dark:bg-amber-400 dark:text-slate-800
          hover:bg-indigo-700
          hover:text-zinc-100
          dark:hover:bg-amber-400
          dark:hover:text-slate-800
          rounded p-2 m-1 w-1/2 hover:scale-105 duration-200 ease-in-out`}
          onClick={handleLogin}
          disabled={loginLoader}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
