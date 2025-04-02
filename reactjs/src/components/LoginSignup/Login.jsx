import axiosWrap from '#Api/axiosWrap.js';
import { loginUser } from '#Api/usersApi.js';
import { ThemedInput } from '#Components/ThemedInputs.jsx';
import useEffectOnlyMount from '#Hooks/useEffectOnlyMount.jsx';
import useStorage from '#Hooks/useStorage.jsx';
import { checkEmail, checkPassword } from '#Utils/appConstants.js';
import { useState } from 'react';
import { toast } from 'react-fox-toast';
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
  const { setLocal } = useStorage();
  const navigatePage = useNavigate();

  useEffectOnlyMount(() => {
    toast.warning('Please Login to proceed further');
  }, []);

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

  const handleLogin = (e) => {
    e.preventDefault();
    Object.keys(userData).map((name) => handleValidation(name, userData[name]));
    const noErrors = formErrors?.email == '' && formErrors?.password == '';
    if (!noErrors) {
      toast.error('Please enter valid data');
      return null;
    }
    const { email, password } = userData;
    const loginPromise = loginUser({
      emailUsername: email,
      password,
      })
        .then((resp) => {
          const jwt = resp.headers['authorization'];
          axiosWrap.defaults.headers.common['authorization'] = `Bearer ${jwt}`;
          localStorage.setItem('authJWT', jwt);
        })
        .catch((err) => {
          console.log(err);
        });
      toast.promise(loginPromise, {
        loading: 'Peeking into our registry...',
        success: (data) => {
          console.log(data, '123');
          return `${data.msg}`;
        },
        error: () => 'Please try again later',
      },
    );
  };

  const { email, password } = userData;
  const iStyle =
    'rounded p-1 ring-2 ring-indigo-300 dark:ring-amber-200 focus:border-indigo-500 focus:bg-indigo-200 dark:border-amber-300 dark:focus:border-amber-500 dark:focus:bg-slate-700';
  console.count('Login UI');

  return (
    <div className="flex flex-col items-stretch justify-around w-full">
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
          className="
          bg-indigo-600 text-zinc-100 dark:bg-amber-400 dark:text-slate-800
          hover:bg-indigo-700
          hover:text-zinc-100
          dark:hover:bg-amber-400
          dark:hover:text-slate-800
          rounded p-1 m-1 w-1/2 hover:scale-105 duration-200 ease-in-out"
          onClick={handleLogin}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
