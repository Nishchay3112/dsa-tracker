import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const Dashboard = () => {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [platform, setPlatform] = useState('');
  const [topics, setTopics] = useState('');
  const [notes, setNotes] = useState('');

  const Navigate = useNavigate();

  // GET USER
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          'https://dsa-tracker-lwd0.onrender.com/user/me',
          { credentials: 'include' }
        );

        if (!res.ok) {
          Navigate('/login');
          return;
        }

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.error(err);
        Navigate('/login');
      }
    }

    fetchUser();
  }, []);

  // ADD PROBLEM
  async function addProblemHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        'https://dsa-tracker-lwd0.onrender.com/user/dashboard',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            difficulty,
            platform,
            topics,
            notes
          })
        }
      );

      if (res.status === 401) {
        Navigate('/login');
        return;
      }

      if (!res.ok) {
        alert("Failed to add problem");
        return;
      }

      // success
      setTitle('');
      setDifficulty('');
      setPlatform('');
      setTopics('');
      setNotes('');

      alert("Problem added successfully");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  }

  // LOGOUT
  async function logoutHandler() {
    try {
      const res = await fetch(
        'https://dsa-tracker-lwd0.onrender.com/user/logout',
        { credentials: 'include' }
      );

      if (res.ok) {
        setUser(null);
        Navigate('/login');
      }

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex justify-between mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome, {User?.username || "Coder"}
            </h1>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => Navigate('/profileImport')}
              className="px-5 py-2 bg-blue-500 text-white rounded-xl"
            >
              Import Profile
            </button>

            <button
              onClick={logoutHandler}
              className="px-5 py-2 bg-red-500 text-white rounded-xl"
            >
              Logout
            </button>

          </div>
        </div>

        {/* FORM */}
        <form onSubmit={addProblemHandler}>
          <div className="bg-white p-8 rounded-3xl shadow-xl">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Problem Title"
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            >
              <option value="">Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            >
              <option value="">Platform</option>
              <option>LeetCode</option>
              <option>GFG</option>
              <option>Codeforces</option>
              <option>Codechef</option>
            </select>

            <input
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="Topics"
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            />

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            />

            <button
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-xl"
            >
              {loading ? "Adding..." : "Add Problem"}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};

export default Dashboard;