import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileImport = () => {
  const Navigate = useNavigate();

  const [platform, setPlatform] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("http://localhost:3001/user/me", {
        credentials: "include",
      });

      if (!res.ok) {
        Navigate("/login");
        return;
      }
    }

    fetchUser();
  }, []);

  async function importProfileHandler(e) {
    e.preventDefault();

    setLoading(true);
    setProfileData(null);

    try {
      if (platform === "leetcode") {
        const res = await fetch(
          `https://leetcode-api-pied.vercel.app/user/${username}`
        );

        if (!res.ok) {
          Navigate("/user-notfound");
          return;
        }

        const data = await res.json();

        console.log(data);

        setProfileData({
          username: data.username,
          totalSolved: data.submitStats.acSubmissionNum[0].count,
          easy: data.submitStats.acSubmissionNum[1].count,
          medium: data.submitStats.acSubmissionNum[2].count,
          hard: data.submitStats.acSubmissionNum[3].count,
          pic:data.profile.userAvatar
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function databaseEnter() {
    const res = await fetch(
      "http://localhost:3001/user/import-profile",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        platform,
        ...profileData}),
      }
    );

    if (res.ok) {
      Navigate("/problems");
    }
  }

  return (

    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Import Coding Profile
          </h1>

          <p className="mt-3 text-slate-600 text-lg">
            Connect your coding profile and automatically import solved problems.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          {/* Banner */}
          <div className="bg-linear-to-r from-violet-600 to-pink-500 p-8 text-white">
            <h2 className="text-2xl font-bold">Sync Your Progress</h2>
            <p className="mt-2 text-violet-100">
              Import solved problems from coding platforms automatically.
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={importProfileHandler}>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Platform */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Platform
                  </label>

                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  >
                    <option value="">Select Platform</option>
                    <option value="leetcode">LeetCode</option>
                  </select>
                </div>

                {/* Username */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Username
                  </label>

                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter username"
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  />
                </div>

              </div>

              {/* Info */}
              <div className="mt-8 rounded-2xl bg-violet-50 border border-violet-100 p-5">
                <h3 className="font-semibold text-violet-700">
                  What gets imported?
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-600 list-disc pl-5">
                  <li>Problem counts (Easy / Medium / Hard)</li>
                  <li>Total solved problems</li>
                  <li>User details</li>
                </ul>
              </div>

              {/* Button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-xl bg-linear-to-r from-violet-600 to-pink-500 text-white font-semibold shadow-md hover:scale-[1.02] transition"
                >
                  {loading ? "Importing..." : "Import Profile"}
                </button>
              </div>

            </form>

            {/* ===================== */}
            {/* PREVIEW SECTION */}
            {/* ===================== */}

            {profileData && (
            
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Preview
                </h3>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex w-100% justify-center py-3"><img src={profileData.pic} alt="Profile picture" className="h-24 w-24 rounded-full"/></div>

                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-slate-900">
                      {profileData.username}
                    </h4>

                    <span className="text-sm px-3 py-1 rounded-full bg-violet-100 text-violet-700">
                      {platform}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

                    <div>
                      <p className="text-slate-500 text-sm">Total</p>
                      <p className="text-xl font-bold">{profileData.totalSolved}</p>
                    </div>

                    <div>
                      <p className="text-slate-500 text-sm">Easy</p>
                      <p className="text-green-400 font-bold text-xl">{profileData.easy}</p>
                    </div>

                    <div>
                      <p className="text-slate-500 text-sm">Medium</p>
                      <p className="text-yellow-400 font-bold text-xl">{profileData.medium}</p>
                    </div>

                    <div>
                      <p className="text-slate-500 text-sm">Hard</p>
                      <p className="text-red-400 font-bold text-xl">{profileData.hard}</p>
                    </div>

                  </div>

                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              {profileData && <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-linear-to-r from-violet-600 to-pink-500 text-white font-semibold shadow-md hover:scale-[1.02] transition" onClick={databaseEnter}
              >
                Save Profile
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImport;