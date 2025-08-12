import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from '../types/task';

/**
 * This component allows users to edit an existing task.
 * It provides a form to update the task's title, description, and due date.
 * @param visible - Whether the modal is visible.
 * @param task - The task to be edited.
 * @param onClose - Function to close the modal.
 * @param onSave - Function to save the edited task.
 * @param styles - The styles to be applied to the component.
 * @param onDateChangeExternal - Optional function to handle external date changes.
 * @returns {JSX.Element} - A JSX element representing the edit task modal.
 */
type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
  styles: any;
  onDateChangeExternal?: (d: Date) => void;
};

/**
 * This component allows users to edit an existing task.
 * It provides a form to update the task's title, description, and due date.
 * @param param0 - The properties passed to the component, including visibility, task details, and functions for interaction.
 * @returns {JSX.Element} - A JSX element representing the edit task modal.
 */
export default function EditTaskModal({ visible, task, onClose, onSave, styles, onDateChangeExternal }: Props) {
  const [editing, setEditing] = useState<Task | null>(task);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(task ? new Date(task.dueDate) : new Date());

  useEffect(() => {
    setEditing(task);
    setCurrentDate(task ? new Date(task.dueDate) : new Date());
  }, [task, visible]);

  const save = () => {
    if (!editing) return;
    onSave({ ...editing, dueDate: currentDate });
    onClose();
  };

  const onDateChange = (_: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) {
      setCurrentDate(selected);
      if (editing) setEditing({ ...editing, dueDate: selected });
      if (onDateChangeExternal) onDateChangeExternal(selected);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          <TextInput style={styles.editInput} placeholder="Task title *" value={editing?.title || ''} onChangeText={(t) => setEditing(editing ? { ...editing, title: t } : editing)} autoFocus />
          <TextInput style={[styles.editInput, styles.editDescriptionInput]} placeholder="Task description (optional)" value={editing?.description || ''} onChangeText={(t) => setEditing(editing ? { ...editing, description: t } : editing)} multiline />
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
            <Ionicons name="calendar" size={20} color="#007bff" />
            <Text style={styles.datePickerText}>Due: {currentDate.toLocaleDateString()} at {currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
          </TouchableOpacity>
          {showDatePicker && <DateTimePicker value={currentDate} mode="datetime" display="default" onChange={onDateChange} />}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}><Text style={styles.cancelButtonText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, !editing?.title.trim() && styles.saveButtonDisabled]} onPress={save} disabled={!editing?.title.trim()}><Text style={styles.saveButtonText}>Save</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
