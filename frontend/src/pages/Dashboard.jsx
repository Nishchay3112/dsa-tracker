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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome back,
              <span className="text-purple-600">
                {" "} {user?.username || "Coder"}
              </span>
            </h1>

            <p className="mt-2 text-slate-600 text-lg">
              Keep building momentum and track your coding progress.
            </p>
          </div>

          <button
            className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm flex items-center gap-3 group"
            onClick={() => navigate("/profileImport")}
          >
            Import Profile
            <span className="text-2xl transition duration-300 group-hover:rotate-90">
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

        {/* FORM CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8">

          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl">✏️</div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Add New Problem
              </h2>
              <p className="text-slate-500">
                Save a solved problem and track your progress.
              </p>
            </div>
          </div>

          <form onSubmit={addProblemHandler}>

            {/* TITLE */}
            <input
              type="text"
              placeholder="Problem Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-5 px-4 py-3 border border-slate-300 rounded-xl"
            />

            {/* DROPDOWNS */}
            <div className="grid md:grid-cols-2 gap-6 mb-5">

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="">Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="">Platform</option>
                <option>LeetCode</option>
                <option>GFG</option>
                <option>Codeforces</option>
                <option>Codechef</option>
                <option>AtCoder</option>
                <option>SPOJ</option>
                <option>Other</option>
              </select>

            </div>

            {/* TOPICS */}
            <input
              type="text"
              placeholder="Topics (comma separated)"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              className="w-full mb-5 px-4 py-3 border rounded-xl"
            />

            {/* NOTES */}
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mb-5 px-4 py-3 border rounded-xl"
            />

            {/* SUBMIT */}
            <button className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700">
              Add Problem
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;