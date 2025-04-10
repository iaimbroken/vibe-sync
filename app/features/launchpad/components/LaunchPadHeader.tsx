import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { IconButton } from '@react-native-material/core';
import type { CustomTheme } from '../../../shared/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface LaunchPadHeaderProps {
  userName: string;
}

const LaunchPadHeader: React.FC<LaunchPadHeaderProps> = ({ userName }) => {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.primary }]}
          accessibilityLabel={`${userName}'s LaunchPad`}
        >
          {userName}'s LaunchPad
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtext, { color: theme.colors.onSurfaceVariant }]}
          accessibilityLabel="Let's ship something today!"
        >
          Let's ship something today!
        </Text>
      </View>
      <IconButton
        icon={props => (
          <MaterialCommunityIcons name="tools" size={24} color={theme.colors.primary} />
        )}
        onPress={() => {}}
        accessibilityLabel="Tools"
        testID="tools-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtext: {
    opacity: 0.8,
  },
});

export default LaunchPadHeader; 