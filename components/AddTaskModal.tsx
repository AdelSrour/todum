import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from '../types/task';

/**
 * This component allows users to add a new task.
 * It provides a form to input the task's title, description, and due date.
 * @param visible - Whether the modal is visible.
 * @param onClose - Function to close the modal.
 * @param onAdd - Function to add the new task.
 * @param initialDate - Optional initial date for the task.
 * @param styles - The styles to be applied to the component.
 * @returns {JSX.Element} - A JSX element representing the add task modal.
 */
type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
  initialDate?: Date;
  styles: any;
};

/**
 * This component allows users to add a new task.
 * It provides a form to input the task's title, description, and due date.
 * @param param0 - The properties passed to the component, including visibility, functions for interaction, and styles.
 * @returns {JSX.Element} - A JSX element representing the add task modal.
 */
export default function AddTaskModal({ visible, onClose, onAdd, initialDate, styles }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());

  useEffect(() => {
    if (visible) {
      setTitle('');
      setDescription('');
      setCurrentDate(initialDate || new Date());
    }
  }, [visible, initialDate]);

  const add = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      dueDate: currentDate
    };
    onAdd(newTask);
    onClose();
  };

  const onDateChange = (_: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) setCurrentDate(selected);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Task</Text>
          <TextInput style={styles.editInput} placeholder="Task title *" value={title} onChangeText={setTitle} autoFocus />
          <TextInput style={[styles.editInput, styles.editDescriptionInput]} placeholder="Task description (optional)" value={description} onChangeText={setDescription} multiline />
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
            <Ionicons name="calendar" size={20} color="#007bff" />
            <Text style={styles.datePickerText}>Due: {currentDate.toLocaleDateString()} at {currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
          </TouchableOpacity>
          {showDatePicker && <DateTimePicker value={currentDate} mode="datetime" display="default" onChange={onDateChange} />}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}><Text style={styles.cancelButtonText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, !title.trim() && styles.saveButtonDisabled]} onPress={add} disabled={!title.trim()}><Text style={styles.saveButtonText}>Add</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
