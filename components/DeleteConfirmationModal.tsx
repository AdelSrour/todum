import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

/**
 * This component displays a confirmation modal for deleting a task.
 * It allows users to confirm or cancel the deletion of a task.
 * @param visible - Whether the modal is visible.
 * @param onCancel - Function to cancel the deletion.
 * @param onConfirm - Function to confirm the deletion.
 * @param styles - The styles to be applied to the component.
 * @returns {JSX.Element} - A JSX element representing the delete confirmation modal.
 */
type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  styles: any;
};

/**
 * This component displays a confirmation modal for deleting a task.
 * It allows users to confirm or cancel the deletion of a task.
 * @param param0 - The properties passed to the component, including visibility and functions for interaction.
 * @returns {JSX.Element} - A JSX element representing the delete confirmation modal.
 */
export default function DeleteConfirmationModal({ visible, onCancel, onConfirm, styles }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.confirmationModal}>
          <Text style={styles.confirmationTitle}>Delete Task?</Text>
          <Text style={styles.confirmationText}>Are you sure you want to delete this task?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity style={[styles.confirmationButton, styles.cancelConfirmationButton]} onPress={onCancel}>
              <Text style={styles.confirmationButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.confirmationButton, styles.deleteConfirmationButton]} onPress={onConfirm}>
              <Text style={styles.confirmationButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
