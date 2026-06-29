import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. LOGIN REQUEST
      const res = await fetch(
        'https://dsa-tracker-lwd0.onrender.com/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        alert(data?.message || 'Login failed');
        setLoading(false);
        return;
      }

      // 2. VERIFY SESSION (IMPORTANT STEP)
      const meRes = await fetch(
        'https://dsa-tracker-lwd0.onrender.com/user/me',
        {
          credentials: 'include'
        }
      );

      if (meRes.ok) {
        navigate('/dashboard');
      } else {
        alert('Session not created properly. Try again.');
      }

    } catch (err) {
      console.error(err);
      alert('Server error or network issue');
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

        {/* Username */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Card;