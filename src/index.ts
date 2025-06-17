import express from "express";
import tasksRouter from './routes/tasks.routes'

const app = express();

app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("<h2>Welcome To My Task API.</h2>");
});

app.use("/tasks", tasksRouter)

// port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
