import React from "react";
import TaskCard from "./TaskCard";

export default function Board({ tasks }) {
  const todo = tasks.filter((t) => t.status === "TODO");
  const progress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const done = tasks.filter((t) => t.status === "DONE");

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      
      <Column title="TODO" tasks={todo} />
      <Column title="IN PROGRESS" tasks={progress} />
      <Column title="DONE" tasks={done} />

    </div>
  );
}

function Column({ title, tasks }) {
  return (
    <div style={{ flex: 1, background: "#f4f4f4", padding: 10 }}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}