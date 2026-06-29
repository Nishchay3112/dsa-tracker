import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-200">
        <h1 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          TrackDSA
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/signup')}
            className="px-5 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          Track your{' '}
          <span className="bg-linear-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            DSA Journey
          </span>
          <br />
          with clarity and consistency
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Organize solved problems, monitor your progress,
          maintain important notes, and build a consistent
          interview preparation workflow—all in one place.
        </p>
      </main>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-5">📝</div>

            <h3 className="text-xl font-semibold text-slate-900">
              Track Solved Problems
            </h3>

            <p className="mt-3 text-slate-600 leading-relaxed">
              Keep a structured record of every coding problem
              you've solved and revisit them whenever needed.
            </p>
          </div>

          <div className="group bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-5">📚</div>

            <h3 className="text-xl font-semibold text-slate-900">
              Organize by Topic
            </h3>

            <p className="mt-3 text-slate-600 leading-relaxed">
              Categorize problems across arrays, strings,
              trees, graphs, dynamic programming, and more.
            </p>
          </div>

          <div className="group bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-5">📈</div>

            <h3 className="text-xl font-semibold text-slate-900">
              Monitor Progress
            </h3>

            <p className="mt-3 text-slate-600 leading-relaxed">
              Understand how far you've come and identify
              areas that need more attention.
            </p>
          </div>

          <div className="group bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-5">🎯</div>

            <h3 className="text-xl font-semibold text-slate-900">
              Stay Consistent
            </h3>

            <p className="mt-3 text-slate-600 leading-relaxed">
              Build a daily coding habit and stay focused
              throughout your interview preparation journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;