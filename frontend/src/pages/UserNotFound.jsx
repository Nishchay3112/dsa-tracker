import React from "react";
import { useNavigate } from "react-router-dom";
import { LuUserRoundSearch } from "react-icons/lu";

const UserNotFound = () => {
  const Navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-xl w-full">

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          {/* Top Banner */}
          <div className="bg-gradient-to-r from-violet-600 to-pink-500 p-8 text-center">
            <div className="text-7xl mb-2 text-white"><LuUserRoundSearch /></div>

            <h1 className="text-4xl font-bold text-white">
              User Not Found
            </h1>

            <p className="mt-2 text-violet-100">
              We couldn't find the profile you're looking for.
            </p>
          </div>

          {/* Content */}
          <div className="p-8 text-center">

            <div className="text-8xl font-extrabold text-red-500">
              404
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Profile Doesn't Exist
            </h2>

            <p className="mt-3 text-slate-600 leading-relaxed">
              The username may be incorrect, the profile may be private,
              or the platform API couldn't find any matching user.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

              <button
                onClick={() => Navigate("/profileImport")}
                className="
                  px-6
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-pink-500
                  text-white
                  font-semibold
                  shadow-md
                  hover:shadow-lg
                  hover:scale-[1.02]
                  transition
                "
              >
                Try Another Username
              </button>

              <button
                onClick={() => Navigate("/dashboard")}
                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  text-slate-700
                  font-semibold
                  hover:bg-slate-100
                  transition
                "
              >
                Back to Dashboard
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotFound;
