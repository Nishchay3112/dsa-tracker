import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [platform, setPlatform] = useState("");
  const [topics, setTopics] = useState("");
  const [notes, setNotes] = useState("");

  // ================= FETCH USER =================
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        "https://dsa-tracker-lwd0.onrender.com/user/me",
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, []);

  // ================= ADD PROBLEM =================
  async function addProblemHandler(e) {
    e.preventDefault();

    const res = await fetch(
      "https://dsa-tracker-lwd0.onrender.com/user/dashboard",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          difficulty,
          platform,
          topics,
          notes,
        }),
      }
    );

    if (res.ok) {
      setTitle("");
      setDifficulty("");
      setPlatform("");
      setTopics("");
      setNotes("");
    }

    if (res.status === 401) {
      navigate("/login");
    }
  }

  // ================= LOGOUT =================
  async function logoutHandler() {
    const res = await fetch(
      "https://dsa-tracker-lwd0.onrender.com/user/logout",
      {
        credentials: "include",
      }
    );

    if (res.ok) {
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome{" "}
              <span className="text-indigo-600">
                {user?.username || "Coder"}
              </span>
            </h1>

            <p className="text-slate-600 mt-2">
              Track your DSA progress 🚀
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/profileImport")}
              className="px-5 py-2 bg-blue-500 text-white rounded-xl flex items-center gap-2"
            >
              Import Profile <GoArrowUpRight />
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
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Problem Title"
              className="w-full mb-3 px-4 py-3 border rounded-xl"
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mb-3 px-4 py-3 border rounded-xl"
            >
              <option value="">Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full mb-3 px-4 py-3 border rounded-xl"
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
              placeholder="Topics (comma separated)"
              className="w-full mb-3 px-4 py-3 border rounded-xl"
            />

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="w-full mb-3 px-4 py-3 border rounded-xl"
            />

            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
              Add Problem
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};

export default Dashboard;