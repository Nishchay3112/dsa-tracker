import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const Dashboard = () => {
  const [User, setUser] = useState('');
  const Navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [platform, setPlatform] = useState('');
  const [topics, setTopics] = useState('');
  const [notes, setNotes] = useState('');
  const [arrow, setArrow] = useState('up');
  async function addProblemHandler(e) {
    e.preventDefault();

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

    if (res.ok) {
      setTitle('');
      setDifficulty('');
      setPlatform('');
      setTopics('');
      setNotes('');
    }
  }

  useEffect(() => {
    async function fetchUser() {
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
    }

    fetchUser();
  }, []);

  async function logoutHandler() {
    const res = await fetch(
      'https://dsa-tracker-lwd0.onrender.com/user/logout',
      {
        credentials: 'include'
      }
    );

    if (res.ok) {
      Navigate('/login');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome back,
              <span className="bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {" "} {User.username || "Coder"}
              </span>
            </h1>

            <p className="mt-2 text-slate-600 text-lg">
              Keep building momentum and track your coding progress.
            </p>
          </div>

          <button className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm flex items-center gap-3 group" onClick={() => {
            Navigate('/profileImport');
          }}>
            Import Profile <span className="text-2xl transition duration 400 group-hover:rotate-90"><GoArrowUpRight /></span>
          </button>

          <button
            onClick={logoutHandler}
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8">
          {/* Card Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl">
              ✏️
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Add New Problem
              </h2>

              <p className="text-slate-500">
                Save a solved problem and keep your preparation organized.
              </p>
            </div>
          </div>

          <form onSubmit={addProblemHandler}>
            {/* Problem Title */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-slate-700" >
                Problem Title
              </label>

              <input
                type="text"
                placeholder="Two Sum"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Difficulty + Platform */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Difficulty */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700" >
                  Difficulty
                </label>

                <div className="relative">
                  <select
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      text-slate-700
                      shadow-sm
                      appearance-none
                      cursor-pointer
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                      focus:border-purple-500
                      transition
                    " value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    ▼
                  </span>
                </div>
              </div>

              {/* Platform */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Platform
                </label>

                <div className="relative">
                  <select
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      text-slate-700
                      shadow-sm
                      appearance-none
                      cursor-pointer
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                      focus:border-purple-500
                      transition
                    " value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="">Select Platform</option>
                    <option value="LeetCode">LeetCode</option>
                    <option value="GFG">GFG</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="Codechef">Codechef</option>
                    <option value="AtCoder">AtCoder</option>
                    <option value="SPOJ">SPOJ</option>
                    <option value="Other">Other</option>
                  </select>

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-slate-700" >
                Topics
              </label>

              <input
                type="text"
                placeholder="Array, HashMap, Two Pointers"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" value={topics}
                onChange={(e) => setTopics(e.target.value)}
              />

              <p className="mt-2 text-sm text-slate-500">
                Separate topics using commas.
              </p>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label className="block mb-2 text-sm font-semibold text-slate-700" >
                Notes
              </label>

              <textarea
                rows="5"
                placeholder="Requires two pointer approach..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between">
              <button
                className="w-2/5 py-3.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition"
              >
                Add Problem
              </button>
              <button
                className="w-2/5 py-3.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition" onClick={() => {
                  Navigate('/problems');
                }}
              >
                View Problems
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;