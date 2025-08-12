import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Task } from '../types/task';
import { groupTasksByDate } from '../utils/taskGrouping';
import TaskItem from './TaskItem';


/**
 * This component renders a list of tasks grouped by their due date.
 * @param tasks - An array of tasks to be displayed.
 * @param styles - The styles to be applied to the component.
 * @param onToggle - Function to toggle the completion status of a task.
 * @param onEdit - Function to edit a task.
 * @param onDelete - Function to delete a task.
 * @param onPress - Function to handle task press events.
 * @returns {JSX.Element} - A JSX element that displays the grouped tasks.
 */
type Props = {
  tasks: Task[];
  styles: any;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onPress: (task: Task) => void;
};

/**
 * This component renders a list of tasks grouped by their due date.
 * @param param0 - The component that renders a list of tasks grouped by their due date.
 * @returns  {JSX.Element} - A JSX element that displays the grouped tasks.
 * It uses the `groupTasksByDate` utility to organize tasks into categories such as overdue, today, tomorrow, and future dates.
 * Each task is displayed using the `TaskItem` component, which handles the display and interaction for individual tasks.
 * If there are no tasks, it shows an empty state message.
 */
export default function TaskList({ tasks, styles, onToggle, onEdit, onDelete, onPress }: Props) {
  const taskGroups = groupTasksByDate(tasks);
  return (
    <>
      {Object.entries(taskGroups).map(([date, tasksInGroup]) => (
        <View key={date}>
    

          <View style={[styles.sectionHeaderContainer, 
                      date === 'Overdue' && styles.overdueHeaderContainer,
                      date === 'Completed' && styles.completedHeaderContainer]}>
            {date === 'Overdue' && (
              <MaterialIcons 
                name="warning" 
                size={20} 
                color="#ff3b30" 
                style={styles.sectionHeaderIcon} 
              />
            )}
            {date === 'Completed' && (
              <MaterialIcons 
                name="check-circle" 
                size={20} 
                color="#34c759" 
                style={styles.sectionHeaderIcon} 
              />
            )}
            <Text style={[
              styles.sectionHeader,
              date === 'Overdue' && styles.overdueHeader,
              date === 'Completed' && styles.completedHeader
            ]}>
              {date}
            </Text>
          </View>
          {tasksInGroup.map(task => (
            <TaskItem 
              key={task.id} 
              task={task}
              styles={styles}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onPress={onPress}
            />
          ))}
        </View>
      ))}
      {Object.keys(taskGroups).length === 0 && (
        <Text style={styles.emptyState}>No tasks yet. Add a new task!</Text>
      )}
    </>
  );
}
