import React, { useState } from "react";

export default function Team() {

  // 👉 simulate logged-in user
  const currentUser = {
    name: "Admin User",
    role: "Admin", // change to "Member" to test restriction
  };

  const [members, setMembers] = useState([
    {
      _id: "1",
      name: "Siva Balaji",
      email: "Siva@gmail.com",
      role: "Team Lead",
    },
    {
      _id: "2",
      name: "John Doe",
      email: "john@example.com",
      role: "Frontend Developer",
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Frontend Developer");

  // ➕ ADD MEMBER (ONLY ADMIN)
  const addMember = () => {
    if (currentUser.role !== "Admin") {
      alert("Only Admin can add members");
      return;
    }

    if (!name || !email) return;

    const newMember = {
      _id: Date.now().toString(),
      name,
      email,
      role,
    };

    setMembers([...members, newMember]);

    setName("");
    setEmail("");
  };

  // ❌ DELETE MEMBER (ONLY ADMIN)
  const removeMember = (id) => {
    if (currentUser.role !== "Admin") {
      alert("Only Admin can remove members");
      return;
    }

    setMembers(members.filter((m) => m._id !== id));
  };

  // 🔁 UPDATE ROLE (ADMIN ONLY)
  const updateRole = (id, newRole) => {
    if (currentUser.role !== "Admin") {
      alert("Only Admin can change roles");
      return;
    }

    const updated = members.map((m) =>
      m._id === id ? { ...m, role: newRole } : m
    );

    setMembers(updated);
  };

  const roleColors = {
    "Frontend Developer": "bg-blue-100 text-blue-700",
    "Backend Developer": "bg-green-100 text-green-700",
    "UI Designer": "bg-pink-100 text-pink-700",
    "Team Lead": "bg-purple-100 text-purple-700",
    "Task Manager": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-2">
        Team Members
      </h1>

      <p className="mb-6 text-gray-500">
        Logged in as: <b>{currentUser.role}</b>
      </p>

      {/* ADD MEMBER FORM (ADMIN ONLY) */}
      {currentUser.role === "Admin" && (
        <div className="grid md:grid-cols-4 gap-3 mb-6">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>UI Designer</option>
            <option>Team Lead</option>
            <option>Task Manager</option>
          </select>

          <button
            onClick={addMember}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Add Member
          </button>

        </div>
      )}

      {/* TEAM LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5"
          >

            <h2 className="text-xl font-bold">
              {member.name}
            </h2>

            <p className="text-gray-500">
              {member.email}
            </p>

            {/* ROLE DISPLAY / EDIT */}
            {currentUser.role === "Admin" ? (
              <select
                value={member.role}
                onChange={(e) =>
                  updateRole(member._id, e.target.value)
                }
                className="mt-2 border p-1 rounded w-full"
              >
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>UI Designer</option>
                <option>Team Lead</option>
                <option>Task Manager</option>
                <option>Technical Assistant</option>
              </select>
            ) : (
              <span
                className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                  roleColors[member.role]
                }`}
              >
                {member.role}
              </span>
            )}

            {/* DELETE BUTTON */}
            {currentUser.role === "Admin" && (
              <button
                onClick={() => removeMember(member._id)}
                className="mt-3 text-red-500 font-bold"
              >
                Remove
              </button>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}