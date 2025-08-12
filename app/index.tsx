import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AddTaskModal from '../components/AddTaskModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EditTaskModal from '../components/EditTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import TaskList from '../components/TaskList';
import { loadTasks, saveTasks } from '../services/storage';
import styles from '../styles';
import { Task } from '../types/task';
import { isOverdue } from '../utils/taskGrouping';

/**
 * This component serves as the main entry point for the task management application.
 * It manages the state of tasks, handles adding, editing, deleting, and displaying tasks.
 * @returns {JSX.Element} - A JSX element representing the main application interface.
 */
export default function Index() {
  // State to manage tasks, modals, and loading state
  const [tasks, setTasks] = useState<Task[]>([]);
  // State for managing modals and task interactions
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // State for managing task deletion confirmation
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  // State for managing selected task details
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // State for managing the visibility of the add task modal
  const [showAddModal, setShowAddModal] = useState(false);
  // State for managing loading state while tasks are being fetched
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from storage when the component mounts
  useEffect(() => {
    const fetch = async () => {
      const loaded = await loadTasks();
      setTasks(loaded);
      setIsLoading(false);
    };
    fetch();
  }, []);

  // Save tasks to storage whenever the tasks state changes
  useEffect(() => {
    if (!isLoading) saveTasks(tasks);
  }, [tasks, isLoading]);

  // Check for overdue tasks and alert the user
  useEffect(() => {
    const overdueTasks = tasks.filter(task => isOverdue(task));
    if (overdueTasks.length > 0) {
      Alert.alert('Overdue Tasks', `You have ${overdueTasks.length} task(s) that are overdue!`, [{ text: 'OK' }]);
    }
  }, [tasks]);

  // Function to add a new task
  const onAdd = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  // Function to toggle the completion status of a task
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Function to edit an existing task
  const onEdit = (updated: Task) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  // Function to delete a task
  const onDelete = (id: string) => {
    setTaskToDelete(id);
  };

  // Confirm deletion of a task
  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(prev => prev.filter(t => t.id !== taskToDelete));
      if (selectedTask?.id === taskToDelete) setSelectedTask(null);
      setTaskToDelete(null);
    }
  };

  // Cancel deletion of a task
  const cancelDelete = () => setTaskToDelete(null);

  // Render the the loading state if tasks are being loaded
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}><Text>Loading tasks...</Text></View>
    );
  }

  // Main application interface with task list and modals
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Tasks</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.tasksContainer}>
        <TaskList tasks={tasks} styles={styles} onToggle={toggleTask} onEdit={(t) => setEditingTask(t)} onDelete={onDelete} onPress={(t) => setSelectedTask(t)} />
      </ScrollView>

      <AddTaskModal visible={showAddModal} onClose={() => setShowAddModal(false)} onAdd={onAdd} styles={styles} />
      <EditTaskModal visible={!!editingTask} task={editingTask} onClose={() => setEditingTask(null)} onSave={(t) => { onEdit(t); setEditingTask(null); }} styles={styles} />
      <TaskDetailsModal visible={!!selectedTask} task={selectedTask} onClose={() => setSelectedTask(null)} onEdit={(t) => setEditingTask(t)} onDelete={(id) => onDelete(id)} styles={styles} />
      <DeleteConfirmationModal visible={!!taskToDelete} onCancel={cancelDelete} onConfirm={confirmDelete} styles={styles} />
    </View>
  );
}
