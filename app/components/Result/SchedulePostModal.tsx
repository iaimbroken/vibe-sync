import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface Platform {
  id: string;
  name: string;
  icon: string;
}

export interface SchedulePostModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSchedule: (date: Date, platforms: string[]) => void;
  content: string | string[];
  availablePlatforms: Platform[];
}

export const SchedulePostModal: React.FC<SchedulePostModalProps> = ({
  visible,
  onDismiss,
  onSchedule,
  content,
  availablePlatforms,
}) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleSchedule = () => {
    onSchedule(selectedDate, selectedPlatforms);
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
          <Text variant="headlineSmall" style={styles.title}>Schedule Post</Text>
          <View style={styles.content}>
            <View style={styles.datePickerContainer}>
              <Text>Select Date and Time</Text>
              <DateTimePicker
                value={selectedDate}
                mode="datetime"
                onChange={(event: DateTimePickerEvent, date?: Date) => date && setSelectedDate(date)}
                minimumDate={new Date()}
                testID="date-time-picker"
              />
            </View>

            <View style={styles.platformsContainer}>
              <Text>Select Platforms</Text>
              {availablePlatforms.map((platform) => (
                <Button
                  key={platform.id}
                  mode={selectedPlatforms.includes(platform.id) ? "contained" : "outlined"}
                  onPress={() => {
                    setSelectedPlatforms(prev =>
                      prev.includes(platform.id)
                        ? prev.filter(id => id !== platform.id)
                        : [...prev, platform.id]
                    );
                  }}
                  style={styles.platformButton}
                  icon={platform.icon}
                  testID={`platform-${platform.id}`}
                >
                  {platform.name}
                </Button>
              ))}
            </View>

            <View style={styles.actions}>
              <Button
                mode="outlined"
                onPress={onDismiss}
                style={styles.button}
                testID="cancel-button"
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSchedule}
                style={styles.button}
                disabled={selectedPlatforms.length === 0}
                testID="schedule-button"
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
    margin: 20,
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  title: {
    marginBottom: 16,
  },
  content: {
    gap: 20,
  },
  datePickerContainer: {
    gap: 8,
  },
  platformsContainer: {
    gap: 8,
  },
  platformButton: {
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    minWidth: 100,
  },
}); 