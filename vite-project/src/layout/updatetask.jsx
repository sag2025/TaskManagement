import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await authFetch(
          `http://localhost:3000/api/tasks/${id}`
        );
        const data = await res.json();

        if (res.ok) {
          setForm({
            title: data.title,
            description: data.description,
            due_date: data.due_date?.slice(0, 16),
            status: data.status,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await authFetch(
      `http://localhost:3000/api/tasks/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      navigate("/tasks");
    }
  };

  if (loading) return <h3>Loading task...</h3>;

  return (
    <div style={{ padding: 20 ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <h2>Update Task</h2>

      <form onSubmit={handleUpdate}
      style={{ padding: 20 ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:20,border:"10px solid red"}}>


        <div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}} >

          <label>TITLE</label>
          <input style={{height:50,width:500}}
          name="title"
          value={form.title}
          onChange={handleChange}
        /></div>
        
        <div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>

         <label>DESCRIPTION</label>
        <textarea style={{height:100,width:500}}
          name="description"
          value={form.description}
          onChange={handleChange}
        />
         </div>


         <div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>
          <label>CHOOSE DUE DATE</label>
        <input style={{width:500,height:50}}
          type="datetime-local"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />
        </div>


<div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>
          <label>CHOOSE DUE DATE</label>
        <select style={{width:500,height:50}}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        </div>


<div style={{ padding: 20 ,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:50}}>
        <button style={{width:200,height:50}} type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTask;