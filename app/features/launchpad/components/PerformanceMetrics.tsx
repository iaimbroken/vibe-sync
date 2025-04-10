import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

interface Metric {
  value: number;
  change: number;
}

interface PerformanceMetricsProps {
  reach: Metric;
  engagement: Metric;
  conversion: Metric;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  reach,
  engagement,
  conversion,
}) => {
  const theme = useTheme();

  const metrics = [
    {
      id: 'reach',
      title: 'Reach',
      icon: 'bullhorn',
      value: reach.value,
      change: reach.change,
    },
    {
      id: 'engagement',
      title: 'Engagement',
      icon: 'chart-line',
      value: engagement.value,
      change: engagement.change,
    },
    {
      id: 'conversion',
      title: 'Conversion',
      icon: 'cash',
      value: conversion.value,
      change: conversion.change,
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return theme.colors.primary;
    if (change < 0) return theme.colors.error;
    return theme.colors.onSurfaceVariant;
  };

  return (
    <View style={styles.container} testID="performance-metrics">
      {metrics.map((metric) => (
        <Card key={metric.id} style={styles.metricCard} testID={`metric-card-${metric.id}`}>
          <Card.Content>
            <View style={styles.metricHeader}>
              <Text variant="titleMedium" style={styles.metricTitle}>
                {metric.title}
              </Text>
              <Text
                variant="bodyMedium"
                style={[
                  styles.changeText,
                  { color: getChangeColor(metric.change) },
                ]}
                testID={`metric-change-${metric.id}`}
              >
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </Text>
            </View>

            <Text variant="headlineMedium" style={styles.metricValue}>
              {formatNumber(metric.value)}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    marginHorizontal: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    opacity: 0.7,
  },
  changeText: {
    fontWeight: 'bold',
  },
  metricValue: {
    fontWeight: 'bold',
  },
}); 