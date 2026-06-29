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

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data?.message || 'Login failed');
        setLoading(false);
        return;
      }

      navigate('/dashboard');

    } catch (err) {
      alert('Server not reachable');
      console.error(err);
    }

    setusername('');
    setpassword('');
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submitHandler} className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-xl"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-xl"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>
    </div>
  );
};

export default Card;