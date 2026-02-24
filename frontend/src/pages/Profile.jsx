import { useState } from "react";
import { Shield, CreditCard, Trash2 } from "lucide-react";

import { useContext } from "react";
import { UserContext } from "../components/userContext";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const {user} = useContext(UserContext)

  return (
    <div className="space-y-12">

      {/* ================= PROFILE HEADER ================= */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-2xl font-semibold">
            {user?.name
                ?.split(" ")
                .map(word => word[0])
                .join("")
                .toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {user?.name}
            </h2>
            <p className="text-gray-400 text-sm">
              {user?.email}
            </p>

            <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
              Pro Plan
            </span>
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition cursor-pointer"
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>

      </div>

      {/* ================= ACCOUNT DETAILS ================= */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <h3 className="text-lg font-semibold mb-6">
          Account Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <InputField
            label="Full Name"
            value={user?.name}
            disabled={!editing}
          />

          <InputField
            label="Email Address"
            value={user?.email}
            disabled={!editing}
          />

          <InputField
            label="Company"
            value="Ocula"
            disabled
          />

          <InputField
            label="Role"
            value="User"
            disabled
          />

        </div>

        {editing && (
          <button className="mt-8 px-8 py-3 cursor-pointer bg-linear-to-r from-purple-600 to-cyan-500 rounded-xl font-medium hover:scale-105 transition">
            Save Changes
          </button>
        )}
      </div>

      {/* ================= SECURITY ================= */}
      {/* <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
          <Shield size={18} />
          Security
        </h3>

        <div className="space-y-4">

          <button className="w-full text-left px-6 py-4 bg-white/10 rounded-xl hover:bg-white/20 transition">
            Change Password
          </button>

          <button className="w-full text-left px-6 py-4 bg-white/10 rounded-xl hover:bg-white/20 transition">
            Enable Two-Factor Authentication
          </button>

        </div>
      </div> */}


      {/* ================= DANGER ZONE ================= */}
      {/* <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
        <h3 className="text-lg font-semibold mb-4 text-red-400 flex items-center gap-3">
          <Trash2 size={18} />
          Danger Zone
        </h3>

        <p className="text-sm text-gray-400 mb-6">
          Deleting your account will permanently remove all generated blueprints,
          usage history and billing data.
        </p>

        <button className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition">
          Delete Account
        </button>
      </div> */}

    </div>
  );
};

export default Profile;


/* ================= INPUT FIELD ================= */

const InputField = ({ label, value, disabled }) => {
  return (
    <div>
      <label className="text-sm text-gray-400 block mb-2">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        disabled={disabled}
        className="w-full bg-[#0E1424] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-purple-500 transition disabled:opacity-60"
      />
    </div>
  );
};