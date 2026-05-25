import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Analytics from "../components/Analytics";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
const socket = io("http://localhost:5000");

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const overdueTasks = tasks.filter(
        (task) => {

            return (
                task.status !== "DONE" &&

                new Date(task.dueDate) <
                    new Date()
            );
        }
    );

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
  });

  // Replace these IDs
  const projectId = "6a12fef7903a0ba8bc24bc5e";
  const userId = "6a12fef7903a0ba8bc24bc5f";

  useEffect(() => {
    fetchTasks();

    socket.on("taskCreated", () => {
        fetchTasks();
    });

    socket.on("taskUpdated", () => {
        fetchTasks();
    });

    socket.on("taskDeleted", () => {
        fetchTasks();
    });
  
    if (darkMode) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
  
  }, [darkMode]);

  // Fetch Tasks
  const toggleDarkMode = () => {

    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
        "theme",
        newTheme ? "dark" : "light"
    );
};
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/project/${projectId}`);
      setTasks(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };
  const editTask = async (task) => {
    const newTitle = prompt(
        "Edit Task Title",
        task.title
    );
    if (!newTitle) return;
    try {
        await API.put(
            `/tasks/${task._id}`,
            {
                title: newTitle,
            }
        );
        fetchTasks();
      } catch (err) {
        console.log(
            err.response?.data
        );
      }
    };

  // Create Task
  const createTask = async () => {
    try {
      await API.post("/tasks", {
        ...newTask,
        projectId,
        assignedTo: userId,
      });

      fetchTasks();

      setShowForm(false);

      setNewTask({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
      });
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, {
        status,
      });

      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // Drag & Drop Logic
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      await API.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      const updatedTasks = tasks.map((task) =>
        task._id === taskId
          ? { ...task, status: newStatus }
          : task
      );

      setTasks(updatedTasks);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const todo = tasks.filter(
    (task) => task.status === "TODO"
  );

  const progress = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const done = tasks.filter(
    (task) => task.status === "DONE"
  );

  return (
    <div className={`flex h-screen transition-all duration-300 ${
        darkMode
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-black"
    }`}>

      {/* Sidebar */}
      <div className={`w-64 p-5 transition-all duration-300 ${
        darkMode
            ? "bg-gray-800 text-white"
            : "bg-indigo-700 text-white"
      }`}>
        <h1 className="text-3xl font-bold mb-10">
          Team Manager
        </h1>

        <ul className="space-y-4">

            <li
                onClick={() => navigate("/dashboard")}
                className="bg-indigo-500 p-3 rounded-lg cursor-pointer"
            >
                Dashboard
            </li>

            <li
                onClick={() => navigate("/tasks")}
                className="hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
            >
                Tasks
            </li>

            <li
                onClick={() => navigate("/team")}
                className="hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
            >
                Team
            </li>

            <li
                onClick={() => navigate("/settings")}
                className="hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
            >
                Settings
            </li>

            <li
                onClick={() =>navigate("/projects")}
                className="hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
            >
                Projects
            </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">

        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Project Dashboard
          </h2>

          <div className="flex gap-4">

            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
            >
              + Add Task
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>

            <button
                onClick={toggleDarkMode}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
            >
                {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

          </div>
        </div>

        {/* Task Popup */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

            <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">

              <h2 className="text-2xl font-bold mb-4">
                Create Task
              </h2>

              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                className="w-full border p-2 rounded mb-3"
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Description"
                value={newTask.description}
                className="w-full border p-2 rounded mb-3"
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    description: e.target.value,
                  })
                }
              />

              <select
                className="w-full border p-2 rounded mb-3"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value,
                  })
                }
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={createTask}
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                  Create
                </button>

              </div>
            </div>
          </div>
        )}
        
        {/* Drag & Drop Board */}
        <Analytics
            tasks={tasks}
            darkMode={darkMode}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">

            <div className="bg-red-500 text-white p-5 rounded-2xl shadow">

                <h3 className="text-lg font-bold">
                   OVERDUE TASKS
                </h3>

                <p className="text-4xl font-bold mt-3">

                   {overdueTasks.length}

                </p>

            </div>

        </div>

        <DragDropContext onDragEnd={onDragEnd}>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TaskColumn
              title="TODO"
              tasks={todo}
              deleteTask={deleteTask}
              editTask={editTask}
              darkMode={darkMode}
            />

            <TaskColumn
              title="IN_PROGRESS"
              tasks={progress}
              deleteTask={deleteTask}
              editTask={editTask}
              darkMode={darkMode}
            />

            <TaskColumn
              title="DONE"
              tasks={done}
              deleteTask={deleteTask}
              editTask={editTask}
              darkMode={darkMode}
            />

          </div>

        </DragDropContext>

      </div>
    </div>
  );
}

// Task Column
function TaskColumn({
  title,
  tasks,
  deleteTask,
  editTask,
  darkMode,
}) {
  return (
    <Droppable droppableId={title}>
      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-2xl p-4 min-h-[500px] shadow transition-all duration-300 ${
            darkMode
                ? "bg-gray-800"
                : "bg-gray-200"
          }`}
        >

          <h3 className="text-xl font-bold mb-4">
            {title.replace("_", " ")}
          </h3>

          <div className="space-y-4">

            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                editTask={editTask}
                darkMode={darkMode}
              />
            ))}

            {provided.placeholder}

          </div>
        </div>
      )}
    </Droppable>
  );
}

// Task Card
function TaskCard({
  task,
  index,
  deleteTask,
  editTask,
  darkMode,
}) {
  return (
    <Draggable
      draggableId={task._id}
      index={index}
    >
      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-xl p-4 shadow-md transition-all duration-300 ${
            darkMode
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
          }`}
        >

          <h4 className="font-bold text-lg mb-2">
            {task.title}
          </h4>

          <p className="text-gray-600 text-sm mb-3">
            {task.description}
          </p>

          <div className="flex justify-between items-center mb-4">

            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              {task.priority}
            </span>

            <span className="text-xs text-gray-500">
              {task.status}
            </span>

          </div>

          <button
            onClick={() => editTask(task)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >

            Edit

          </button>

          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>

        </div>
      )}
    </Draggable>
  );
}
