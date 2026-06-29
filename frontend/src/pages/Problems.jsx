import React, { useEffect, useState } from "react";
import ProblemCard from "../components/ProblemCard";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { GoArrowUpRight } from "react-icons/go";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [profiles, setProfiles] = useState([]);

  async function handleDelete(id) {
    const res = await fetch(`http://localhost:3001/user/delete/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      setProblems((prev) => prev.filter((p) => p._id !== id));
    }
  }

  useEffect(() => {
    async function fetchProblems() {
      try {
        const res = await fetch("http://localhost:3001/user/problems", {
          credentials: "include",
        });

        const data = await res.json();
        setProblems(data);
      } catch (err) {
        console.log("Error fetching problems:", err);
      }
    }

    async function fetchProfiles() {
      try {
        const res = await fetch("http://localhost:3001/user/profiles", {
          credentials: "include",
        });

        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        console.log("Error fetching profiles:", err);
      }
    }

    fetchProblems();
    fetchProfiles();
  }, []);

  // ---------- STATS ----------
  const easy = problems.filter((p) => p.difficulty === "Easy").length;
  const medium = problems.filter((p) => p.difficulty === "Medium").length;
  const hard = problems.filter((p) => p.difficulty === "Hard").length;

  const chartData = [
    { name: "Easy", value: easy },
    { name: "Medium", value: medium },
    { name: "Hard", value: hard },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6 bg-linear-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
          Your Problems
        </h1>

        {/* ATTACHED PROFILES */}
        {profiles.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Attached Profiles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
              {profiles.map((profile) => (
                <div
                  key={profile._id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-center">
                    <img
                      src={profile.pic}
                      alt="Profile"
                      className="w-20 h-20 rounded-full border border-slate-200 object-cover"
                    />
                  </div>

                  <div className="text-center mt-4">
                    <h3 className="font-bold text-lg text-slate-800">
                      {profile.username}
                    </h3>

                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                      {profile.platform}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5 text-center">
                    <div>
                      <p className="text-slate-500 text-xs">Solved</p>
                      <p className="font-bold text-slate-800">
                        {profile.totalSolved}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 text-xs">Easy</p>
                      <p className="font-bold text-green-500">
                        {profile.easy}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 text-xs">Medium</p>
                      <p className="font-bold text-yellow-500">
                        {profile.medium}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 text-xs">Hard</p>
                      <p className="font-bold text-red-500">
                        {profile.hard}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center py-2.5">
                  <a
                    href={
                      profile.platform === "leetcode"
                        ? `https://leetcode.com/u/${profile.username}/`
                        : "#"
                    }
                    target="_blank"
                    rel="noreferrer" className="no-underline" 
                  >
                    <button className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm flex items-center gap-3 group">
                                View Profile <span className="text-2xl transition duration 400 group-hover:rotate-90"><GoArrowUpRight /></span>
                              </button>
                  </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PIE CHART */}
        {problems.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-10 flex flex-col items-center">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Difficulty Distribution
            </h2>

            <div className="w-full h-70">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={100}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-evenly w-full mt-4">
              <p>
                <span className="text-green-500 font-bold text-xl">
                  Easy : {easy}
                </span>
              </p>

              <p>
                <span className="text-yellow-500 font-bold text-xl">
                  Medium : {medium}
                </span>
              </p>

              <p>
                <span className="text-red-500 font-bold text-xl">
                  Hard : {hard}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {problems.length === 0 && (
          <div className="text-center text-slate-500 mb-10">
            No problems added yet 🚀
          </div>
        )}

        {/* PROBLEMS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <ProblemCard
              key={problem._id}
              id={problem._id}
              title={problem.title}
              difficulty={problem.difficulty}
              platform={problem.platform}
              topics={problem.topic}
              notes={problem.notes}
              onDelete={handleDelete}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Problems;