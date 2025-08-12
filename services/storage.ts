import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

// This is the key used to store tasks in AsyncStorage.
// It should be unique to avoid conflicts with other stored data.
const STORAGE_KEY = '@TodumApp:tasks';

/**
 * This function loads tasks from AsyncStorage.
 * It retrieves the stored tasks, parses them, and converts the dueDate back to a Date object.
 * @returns {Promise<Task[]>} - A promise that resolves to an array of tasks. 
 */
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
    if (!storedTasks) return [];
    return JSON.parse(storedTasks).map((task: any) => ({
      ...task,
      dueDate: new Date(task.dueDate)
    }));
  } catch (error) {
    console.error('Failed to load tasks', error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks', error);
  }
};
