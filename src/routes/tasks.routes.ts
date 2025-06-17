import { Router } from "express";
import { createTask, deleteTask, getAllTasks, uniqueTask, updateTask } from "../controllers/tasks";

const router = Router()

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", uniqueTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)


export default router;