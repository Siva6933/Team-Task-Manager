import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Analytics({
  tasks,
  darkMode,
}) {

  const todo = tasks.filter(
    (t) => t.status === "TODO"
  ).length;

  const progress = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;

  const done = tasks.filter(
    (t) => t.status === "DONE"
  ).length;

  const pieData = {
    labels: [
      "TODO",
      "IN PROGRESS",
      "DONE",
    ],

    datasets: [
      {
        label: "Tasks",

        data: [
          todo,
          progress,
          done,
        ],

        backgroundColor: [
          "#facc15",
          "#3b82f6",
          "#22c55e",
        ],
      },
    ],
  };

  const barData = {
    labels: [
      "TODO",
      "IN PROGRESS",
      "DONE",
    ],

    datasets: [
      {
        label: "Tasks",

        data: [
          todo,
          progress,
          done,
        ],

        backgroundColor: [
          "#facc15",
          "#3b82f6",
          "#22c55e",
        ],
      },
    ],
  };

  return (
    <div className="mb-10">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div
            className={`p-5 rounded-2xl shadow ${
                darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
        }`}
        >
          <h3 className="text-gray-500">
            Total Tasks
          </h3>

          <p className="text-3xl font-bold">
            {tasks.length}
          </p>
        </div>

        <div className="bg-yellow-400 text-white p-5 rounded-2xl shadow">
          <h3>
            TODO
          </h3>

          <p className="text-3xl font-bold">
            {todo}
          </p>
        </div>

        <div className="bg-blue-500 text-white p-5 rounded-2xl shadow">
          <h3>
            IN PROGRESS
          </h3>

          <p className="text-3xl font-bold">
            {progress}
          </p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-2xl shadow">
          <h3>
            DONE
          </h3>

          <p className="text-3xl font-bold">
            {done}
          </p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div
            className={`p-5 rounded-2xl shadow ${
                darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
            }`}
        >

          <h2 className="text-xl font-bold mb-5">
            Task Distribution
          </h2>

          <Pie data={pieData} />

        </div>

        <div
            className={`p-5 rounded-2xl shadow ${
                darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
            }`}
        >

          <h2 className="text-xl font-bold mb-5">
            Task Progress
          </h2>

          <Bar data={barData} />

        </div>

      </div>
    </div>
  );
}