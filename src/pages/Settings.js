import { useEffect, useState } from "react";

export default function Settings() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Load saved data
  useEffect(() => {

    const savedName =
      localStorage.getItem("name");

    const savedEmail =
      localStorage.getItem("email");

    if (savedName) setName(savedName);

    if (savedEmail) setEmail(savedEmail);

  }, []);

  // Save settings
  const saveSettings = () => {

    localStorage.setItem("name", name);

    localStorage.setItem("email", email);

    alert("Settings Saved Successfully ✅");
  };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Settings
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-6 max-w-xl">

        <div>

          <h2 className="text-xl font-bold mb-2">
            Profile Name
          </h2>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Your Name"
            className="border p-3 rounded w-full"
          />

        </div>

        <div>

          <h2 className="text-xl font-bold mb-2">
            Email
          </h2>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Your Email"
            className="border p-3 rounded w-full"
          />

        </div>

        <button
          onClick={saveSettings}
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
        >

          Save Settings

        </button>

      </div>

    </div>
  );
}