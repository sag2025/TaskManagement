import React, { useEffect, useState } from "react";
import TaskCard from "../utils/TaskCards";
import { authFetch } from "../services/authFetch";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";



function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await authFetch("http://localhost:3000/api/tasks");
      const data = await res.json();

      console.log("TASK RESPONSE:", data);

      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);

  

  const create_new_task = () => {
  navigate("/createtasks");
};




  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Loading your tasks... please wait</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: 20,height:"100vh" }}>
      <h2>Your Tasks</h2>

     {tasks.map((task) => (
  <TaskCard
    key={task.id}
    task={task}
    onDelete={(id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }}
  />
))}
      {/* CREATE BUTTON */}
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button style={{ padding: 10 }} onClick={create_new_task}>
          + Create New Task
        </button>
      </div>
    </div>
  );
}

export default Tasks;