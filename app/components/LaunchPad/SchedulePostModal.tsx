import React, { useState } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { Text, Button, TextInput, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../shared/types';

interface SchedulePostModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSchedule: (content: any, platforms: string[], scheduledTime: Date) => void;
  initialContent?: any;
}

export const SchedulePostModal: React.FC<SchedulePostModalProps> = ({
  visible,
  onDismiss,
  onSchedule,
  initialContent,
}) => {
  const theme = useTheme() as CustomTheme;
  const [scheduledTime, setScheduledTime] = useState(new Date());
  const [platforms, setPlatforms] = useState<string[]>(['instagram']);

  const handleSchedule = () => {
    onSchedule(initialContent || {}, platforms, scheduledTime);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onDismiss}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text variant="titleLarge" style={styles.title}>
            Schedule Post
          </Text>
          <View style={styles.content}>
            <TextInput
              label="Scheduled Time"
              value={scheduledTime.toLocaleString()}
              mode="outlined"
              style={styles.input}
            />
            <View style={styles.actions}>
              <Button mode="outlined" onPress={onDismiss} style={styles.button}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSchedule}
                style={styles.button}
              >
                Schedule
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
  },
  content: {
    gap: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
  },
}); 