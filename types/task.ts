/**
 * This file defines the Task type used in the application.
 * It includes properties for task ID, title, description, completion status, and due date.
 * @typedef {Object} Task
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - Title of the task.
 * @property {string} description - Description of the task.
 * @property {boolean} completed - Indicates if the task is completed.
 * @property {Date} dueDate - The due date of the task.
 */ 
export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
};
