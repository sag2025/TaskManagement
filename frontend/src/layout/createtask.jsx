import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function CreateTask() {
  const navigate = useNavigate();

  const titleRef = useRef();
  const descRef = useRef();
  const dueDateRef = useRef();
  const statusRef = useRef();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: titleRef.current.value,
      description: descRef.current.value,
      due_date: dueDateRef.current.value,
      status: statusRef.current.value || "pending",
    };

    try {
      const res = await authFetch("http://localhost:3000/api/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      // ❌ BAD REQUEST (validation / token issues)
      if (res.status === 401) {
        setError(json.message || "auth problem");
        return;
      }

      // ❌ SERVER ERROR
      if (res.status === 500) {
        setError("Server error. Please try again later.");
        return;
      }

      // ❌ ANY OTHER ERROR
      if (!res.ok) {
        setError("Unknown error occurred");
        return;
      }

      // ✅ SUCCESS
      setError("");
      navigate("/tasks");

    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    }
  };

  return (
    <div style={{ padding: 20 ,display:"flex",flexDirection:"column",justifyContent:"center" ,alignItems:"center"}}>
      <h2>Create Task</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 30, width: 500 ,justifyContent:"center",height:"100%",alignItems:"center"}}
      >
        <input ref={titleRef} style={{height:50 ,width:500}} placeholder="Title" required />

        <textarea style={{height:200,width:500}}
          ref={descRef}
          placeholder="Description"
          required
        />

        <input style={{height:30,width:500}}
          type="datetime-local"
          ref={dueDateRef}
          required
        />

        <select  style={{height:30,width:500}} ref={statusRef}>
          <option value="pending"><span style={{color:"red"}}>Pending</span></option>
          <option value="completed">Completed</option>
        </select>

        <button style={{height:30,width:200}}   type="submit"><span style={{color:"red"}}>Create Task</span></button>
      </form>

      {/* ERROR DISPLAY */}
      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default CreateTask;