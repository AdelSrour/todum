import { Task } from '../types/task';
import { formatDate, isSameDay } from './date';

/**
 * This function checks if a task is overdue by comparing the current time with the task's due date.
 * It allows a 5-minute grace period after the due date.
 * @param task - The task to check for overdue status.
 * @returns {boolean} - Returns true if the task is overdue, false otherwise.
 */
export const isOverdue = (task: Task) => {
  if (task.completed) return false;
  const now = new Date();
  const dueDate = new Date(task.dueDate);
  return now > new Date(dueDate.getTime() + 300000);
};

/**
 * This function groups tasks by their due date, categorizing them into overdue, today, tomorrow, future dates, and completed tasks.
 * It returns an object where keys are date labels and values are arrays of tasks.
 * @param tasks - An array of tasks to be grouped.
 * @returns {Object} - An object with grouped tasks.
 */
export const groupTasksByDate = (tasks: Task[]) => {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const groups: { [key: string]: Task[] } = {};

  const completedTasks = tasks.filter(task => task.completed);
  const overdueTasks = tasks.filter(task => isOverdue(task));
  const todaysTasks = tasks.filter(task => !task.completed && !isOverdue(task) && isSameDay(new Date(task.dueDate), today));
  const tomorrowsTasks = tasks.filter(task => !task.completed && !isOverdue(task) && isSameDay(new Date(task.dueDate), tomorrow));
  const futureTasks = tasks.filter(task => {
    if (task.completed || isOverdue(task)) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate >= new Date(tomorrow.getTime() + 86400000);
  });

  if (overdueTasks.length > 0) groups['Overdue'] = sortByDate(overdueTasks);
  if (todaysTasks.length > 0) groups['Today'] = sortByDate(todaysTasks);
  if (tomorrowsTasks.length > 0) groups['Tomorrow'] = sortByDate(tomorrowsTasks);

  futureTasks.forEach(task => {
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    const dateKey = formatDate(taskDate);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(task);
  });

  if (completedTasks.length > 0) {
    groups['Completed'] = completedTasks.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  }

  return groups;
};

/** * This function sorts an array of tasks by their due date in ascending order.
 * @param arr - An array of tasks to be sorted.
 * @returns {Task[]} - The sorted array of tasks.
 */
const sortByDate = (arr: Task[]) => arr.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
