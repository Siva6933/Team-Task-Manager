import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

export default function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects =
    async () => {

      try {

        const res =
          await API.get(
            "/projects"
          );

        setProjects(res.data);

      } catch (err) {

        console.log(err);
      }
    };

  const createProject =
    async () => {

      try {

        await API.post(
          "/projects",
          {
            name,
            description,
          }
        );

        fetchProjects();

        setName("");

        setDescription("");

      } catch (err) {

        console.log(err);
      }
    };

  const deleteProject =
    async (id) => {

      try {

        await API.delete(
          `/projects/${id}`
        );

        fetchProjects();

      } catch (err) {

        console.log(err);
      }
    };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={createProject}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>

      </div>

      <div className="grid gap-4">

        {projects.map((project) => (

          <div
            key={project._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between"
          >

            <div>

              <h2 className="text-xl font-bold">
                {project.name}
              </h2>

              <p>
                {project.description}
              </p>

            </div>

            <button
              onClick={() =>
                deleteProject(
                  project._id
                )
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}