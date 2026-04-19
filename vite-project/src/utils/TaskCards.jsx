import React from "react";
import {useNavigate} from "react-router-dom";
import { authFetch } from "../services/authFetch";

function TaskCard({ task }) {
  const navigate=useNavigate();

  const handleDetails = () => {
    console.log("Details:", task.id);
    navigate(`/tasks/${task.id}`);

  };

  const handleUpdate = () => {
    console.log("Update:", task.id);
    navigate(`/tasks/${task.id}/edit`);


  };

const handleDelete = async () => {
  try {
    console.log("delete : ",task.id);
    const res = await authFetch(
      `http://localhost:3000/api/tasks/${task.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
       
       window.location.reload(); // refresh list
    } else {
      console.log("Delete failed");
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
      style={{
        border: "5px solid red",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        width:300,
        height:200
      }}
    >
      {/* TITLE */}
      <h1>{task.title}</h1>

      {/* STATUS */}
      <p>STATUS:<span style={{marginLeft:30,color:"red"}}>{task.status}</span></p>
      <br></br>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={handleDetails}>Details</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;