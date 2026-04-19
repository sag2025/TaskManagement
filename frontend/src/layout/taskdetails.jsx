import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function TaskDetails() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await authFetch(`http://localhost:3000/api/tasks/${id}`);
        const data = await res.json();

        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <h3>Loading task...</h3>;

  if (!task) return <h3>Task not found</h3>;

  return (
    <div style={{ padding: 20  ,margin:10,height:"100vh"}}>
      <div style={{border:"10px solid red",padding:10}}>
      <h1>{task.title}</h1>
    
      <h2>{task.description}</h2>
    
      <p>STATUS: <span style={{margin:50,color:"red"}}>{task.status}</span></p>
      <p>DUE:<span style={{margin:50,color:"red"}}>{task.due_date}</span> </p>
    </div>
    </div>
  );
}

export default TaskDetails;