import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const Dashboard = () => {
  const [User, setUser] = useState(null);
  const Navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [platform, setPlatform] = useState('');
  const [topics, setTopics] = useState('');
  const [notes, setNotes] = useState('');

  async function addProblemHandler(e) {
    e.preventDefault();

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

      if (res.ok) {
        setTitle('');
        setDifficulty('');
        setPlatform('');
        setTopics('');
        setNotes('');
      }
    } catch (err) {
      console.error("Add problem failed:", err);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          'https://dsa-tracker-lwd0.onrender.com/user/me',
          {
            credentials: 'include'
          }
        );

        if (!res.ok) {
          Navigate('/login');
          return;
        }

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.error("User fetch failed:", err);
        Navigate('/login');
      }
    }

    fetchUser();
  }, []);

  async function logoutHandler() {
    try {
      const res = await fetch(
        'https://dsa-tracker-lwd0.onrender.com/user/logout',
        {
          credentials: 'include'
        }
      );

      if (res.ok) {
        Navigate('/login');
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome back,
              <span className="bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {" "} {User?.username || "Coder"}
              </span>
            </h1>

            <p className="mt-2 text-slate-600 text-lg">
              Keep building momentum and track your coding progress.
            </p>
          </div>

          <button
            className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm flex items-center gap-3 group"
            onClick={() => Navigate('/profileImport')}
          >
            Import Profile
            <span className="text-2xl transition duration-400 group-hover:rotate-90">
              <GoArrowUpRight />
            </span>
          </button>

          <button
            onClick={logoutHandler}
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-sm"
          >
            Logout
          </button>

        </div>

        {/* Form */}
        <form onSubmit={addProblemHandler}>
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8">

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
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-xl"
            >
              Add Problem
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};

export default Dashboard;