// src/pages/Login.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken, setUserData } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setUserData(data.userData); // <-- save user data in context
          toast.success('Account created successfully!');
          navigate('/'); // redirect after signup
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setUserData(data.userData); // <-- save user data in context
          toast.success('Logged in successfully!');
          navigate('/'); // redirect after login
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('Error in login/signup:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
          />
        </div>

        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className='text-primary underline cursor-pointer'
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className='text-primary underline cursor-pointer'
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;