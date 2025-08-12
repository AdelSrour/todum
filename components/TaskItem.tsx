import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Task } from '../types/task';
import { isOverdue } from '../utils/taskGrouping';

/**
 * This component renders a single task item with its details and actions.
 * It displays the task title, description, due date, and provides options to toggle completion, edit, delete, or view details.
 * @param task - The task object containing details to be displayed.
 * @param styles - The styles to be applied to the component.
 * @param onToggle - Function to toggle the completion status of the task.
 * @param onEdit - Function to edit the task.
 * @param onDelete - Function to delete the task.
 * @param onPress - Function to handle task press events.
 * @returns {JSX.Element} - A JSX element representing the task item.
 */
type Props = {
  task: Task;
  styles: any;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onPress: (task: Task) => void;
};

/**
 * This component renders a single task item with its details and actions.
 * @param param0 - The properties passed to the component, including the task details and functions for interaction.
 * @returns {JSX.Element} - A JSX element representing the task item.
 */
export default function TaskItem({ task, styles, onToggle, onEdit, onDelete, onPress }: Props) {
  return (
    <TouchableOpacity 
      style={[
        styles.taskItem,
        task.completed && styles.completedTask,
        isOverdue(task) && styles.overdueTask
      ]}
      onPress={() => onPress(task)}
    >
      <CheckBox
        checked={task.completed}
        onPress={() => onToggle(task.id)}
        containerStyle={styles.checkbox}
      />
      <View style={styles.taskContent}>
        <Text style={[
          styles.taskTitle,
          task.completed && styles.completedTaskText,
          isOverdue(task) && styles.overdueText
        ]}>
          {task.title}
        </Text>
        <View style={styles.taskMeta}>
          <Text style={[
            styles.taskDate,
            task.completed && styles.completedTaskText,
            isOverdue(task) && styles.overdueText
          ]}>
            {task.dueDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </Text>
          {task.description ? (
            <Text style={[
              styles.taskDescriptionPreview,
              task.completed && styles.completedTaskText,
              isOverdue(task) && styles.overdueText
            ]} numberOfLines={1}>
              {task.description}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={(e) => { e.stopPropagation(); onEdit(task); }}>
          <Ionicons name="pencil" size={20} color={isOverdue(task) ? "#ff4444" : "#888"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => { e.stopPropagation(); onDelete(task.id); }}>
          <Ionicons name="trash" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
