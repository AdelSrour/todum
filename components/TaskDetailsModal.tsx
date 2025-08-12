import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../types/task';
import { isOverdue } from '../utils/taskGrouping';

/**
 * This component displays the details of a task in a modal.
 * It allows users to view task details, edit, or delete the task.
 * @param visible - Whether the modal is visible.
 * @param task - The task to display.
 * @param onClose - Function to close the modal.
 * @param onEdit - Function to edit the task.
 * @param onDelete - Function to delete the task.
 * @param styles - The styles to be applied to the component.
 * @returns {JSX.Element} - A JSX element representing the task details modal.
 */
type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  styles: any;
};

/**
 * This component displays the details of a task in a modal.
 * It allows users to view task details, edit, or delete the task.
 * @param param0 - The properties passed to the component, including visibility, task details, and functions for interaction.
 * @returns {JSX.Element} - A JSX element representing the task details modal.
 */
export default function TaskDetailsModal({ visible, task, onClose, onEdit, onDelete, styles }: Props) {
  if (!task) return null;
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.detailsModal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}><Ionicons name="close" size={24} color="#333" /></TouchableOpacity>
          <Text style={styles.detailsTitle}>{task.title}</Text>
          <Text style={[styles.detailsDate, isOverdue(task) && styles.overdueText]}>
            Due: {task.dueDate.toLocaleDateString()} at {task.dueDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}{isOverdue(task) ? ' (Overdue!)' : ''}
          </Text>
          {task.description ? <Text style={styles.detailsDescription}>{task.description}</Text> : <Text style={styles.noDescription}>No description</Text>}
          <View style={styles.detailsActions}>
            <TouchableOpacity style={styles.detailsActionButton} onPress={() => { onEdit(task); onClose(); }}>
              <Ionicons name="pencil" size={20} color="#007bff" />
              <Text style={styles.detailsActionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.detailsActionButton, styles.deleteActionButton]} onPress={() => { onDelete(task.id); onClose(); }}>
              <Ionicons name="trash" size={20} color="#ff4444" />
              <Text style={[styles.detailsActionText, styles.deleteActionText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
