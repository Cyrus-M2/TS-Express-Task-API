import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await client.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, isCompleted } = req.body;

        const task = await client.task.create({ 
            data: {
                title,
                description,
                isCompleted: isCompleted ?? false
            }
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({error:'Failed to create task'})
    }
}

export const uniqueTask = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const findSpecificTask = await client.task.findUnique({
      where: { id },
    });
    res.status(200).json(findSpecificTask);
  } catch (error) {
    res.status(500).json("failed to get this specific task");
  }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { title, description, isCompleted } = req.body;
        const updated = await client.task.update({ 
            where: { id },
            data: { title, description, isCompleted }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({error:'Failed to update task'})
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await client.task.delete({ where: { id } });
        res.json({ message:'Task deleted successfully'})
    } catch (error) {
        res.status(500).json({error:'Failed to delete task'})
    }
}
