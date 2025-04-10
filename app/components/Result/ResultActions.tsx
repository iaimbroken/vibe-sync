import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export interface ResultActionsProps {
  onSave?: () => void;
  onShare?: () => void;
  onSchedule?: () => void;
  onPostNow?: () => void;
  disabled?: boolean;
}

export const ResultActions: React.FC<ResultActionsProps> = ({
  onSave,
  onShare,
  onSchedule,
  onPostNow,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={onSave}
        disabled={disabled}
        icon="content-save"
        style={styles.button}
        testID="save-button"
        accessibilityLabel="Save to Vault"
      >
        Save to Vault
      </Button>

      <Button
        mode="outlined"
        onPress={onShare}
        disabled={disabled}
        icon="share"
        style={styles.button}
        testID="share-button"
        accessibilityLabel="Share result"
      >
        Share
      </Button>

      <Button
        mode="outlined"
        onPress={onSchedule}
        disabled={disabled}
        icon="calendar"
        style={styles.button}
        testID="schedule-button"
        accessibilityLabel="Schedule post"
      >
        Schedule
      </Button>

      <Button
        mode="contained"
        onPress={onPostNow}
        disabled={disabled}
        icon="rocket-launch"
        style={styles.button}
        testID="post-now-button"
        accessibilityLabel="Post now"
      >
        Post Now
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
    gap: 8,
  },
  button: {
    minWidth: '45%',
    marginVertical: 4,
  },
}); 