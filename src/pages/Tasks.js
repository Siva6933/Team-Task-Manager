import { useEffect, useState } from "react";

import API from "../api/axios";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);

  const projectId = "6a12fef7903a0ba8bc24bc5e";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get(
        `/tasks/project/${projectId}`
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        All Tasks
      </h1>

      <div className="space-y-5">

        {tasks.map((task) => (

          <div
            key={task._id}
            className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-bold">

                {task.title}

              </h2>

              <p className="text-gray-500">

                {task.description}

              </p>

              <div className="flex gap-3 mt-3">

                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">

                  {task.status}

                </span>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">

                  {task.priority}

                </span>

              </div>

            </div>

            <button
              onClick={() =>
                deleteTask(task._id)
              }
              className="bg-red-500 text-white px-5 py-2 rounded-lg"
            >

              Delete

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}