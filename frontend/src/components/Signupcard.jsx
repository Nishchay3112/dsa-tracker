import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signupcard = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [useremail, setuseremail] = useState('');
  const Navigate = useNavigate();

  function userchangeHandler(e) {
    setusername(e.target.value);
  }

  function passchangeHandler(e) {
    setpassword(e.target.value);
  }

  function useremailchangeHandler(e) {
    setuseremail(e.target.value);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        email: useremail,
        password
      })
    });

    if (res.ok) {
      Navigate('/login');
    }

    setusername('');
    setpassword('');
    setuseremail('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submitHandler}
        className="w-full bg-white rounded-3xl shadow-xl px-8 py-2.5 max-w-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>
          <p className="text-slate-500 mt-2">
            Sign up to get started
          </p>
        </div>

        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-slate-700"
          >
            Username
          </label>

          <input
            type="text"
            id="username"
            value={username}
            onChange={userchangeHandler}
            placeholder="Enter username"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="exampleInputEmail1"
            className="block mb-2 text-sm font-medium text-slate-700"
          >
            Email Address
          </label>

          <input
            type="email"
            id="exampleInputEmail1"
            value={useremail}
            onChange={useremailchangeHandler}
            placeholder="Enter email"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="exampleInputPassword1"
            className="block mb-2 text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <input
            type="password"
            id="exampleInputPassword1"
            value={password}
            onChange={passchangeHandler}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signupcard;