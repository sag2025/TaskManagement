const express = require("express");
const pool = require("./config/postgres");// 
require("dotenv").config();
//import DB
const cors=require("cors");
const userRoutes = require("./routes/routes.user");
const taskRoutes = require("./routes/routes.tasks");


const app = express();
app.use(cors());

app.use(express.json());




// ✅ Test DB connection on startup
pool.connect()
  .then(client => {
    console.log("✅ Database connected");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err.message);
  });





// Routes
app.use("/api/users", userRoutes);

app.use("/api/tasks",taskRoutes);


app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});