import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function userchangeHandler(e) {
    setusername(e.target.value);
  }

  function passchangeHandler(e) {
    setpassword(e.target.value);
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://dsa-tracker-lwd0.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.log('Login failed:', data);
        alert(data?.message || 'Login failed');
        setLoading(false);
        return;
      }

      // optional debug
      console.log('Login success:', data);

      navigate('/dashboard');

    } catch (err) {
      console.error('Network error:', err);
      alert('Server not reachable. Check backend.');
    }

    setusername('');
    setpassword('');
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-slate-500 mt-2">
            Sign in to continue
          </p>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={userchangeHandler}
            placeholder="Enter username"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={passchangeHandler}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Card;