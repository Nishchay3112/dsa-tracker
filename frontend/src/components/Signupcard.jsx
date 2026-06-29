import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signupcard = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [useremail, setuseremail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    if (!username || !password || !useremail) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        'https://dsa-tracker-lwd0.onrender.com/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email: useremail,
            password
          })
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        alert(data?.message || 'Signup failed');
        setLoading(false);
        return;
      }

      // success
      console.log('Signup success:', data);

      // redirect to login
      navigate('/login');

    } catch (err) {
      console.error('Network error:', err);
      alert('Server not reachable');
    }

    setusername('');
    setpassword('');
    setuseremail('');
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submitHandler}
        className="w-full bg-white rounded-3xl shadow-xl px-8 py-8 max-w-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>
          <p className="text-slate-500 mt-2">
            Sign up to get started
          </p>
        </div>

        {/* Username */}
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
        />

        {/* Email */}
        <input
          type="email"
          value={useremail}
          onChange={(e) => setuseremail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default Signupcard;