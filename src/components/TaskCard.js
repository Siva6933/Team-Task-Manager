import React from "react";

export default function TaskCard({ task }) {
  return (
    <div
      style={{
        background: "white",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>Status: {task.status}</small>
    </div>
  );
}