import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import type { RootStackScreenProps } from '@/types/navigation';
import type { CustomTheme } from '@/types/theme';
import { db } from '@/config/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { LoadingIndicator } from '@/components/common/LoadingIndicator';

type Props = RootStackScreenProps<'AIHistory'>;

interface AIHistoryItem {
  id: string;
  prompt: string;
  response: string;
  createdAt: string;
}

export const AIHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme<CustomTheme>();
  const { user } = useAuth();
  const [history, setHistory] = useState<AIHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const historyRef = collection(db, 'ai_history');
      const q = query(historyRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedHistory = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AIHistoryItem[];
      
      setHistory(fetchedHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  if (loading) {
    return <LoadingIndicator message="Loading AI history..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchHistory} />;
  }

  const renderItem = ({ item }: { item: AIHistoryItem }) => (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text style={[styles.prompt, { color: theme.colors.onSurface }]}>
          {item.prompt}
        </Text>
        <Text style={[styles.response, { color: theme.colors.onSurfaceVariant }]}>
          {item.response}
        </Text>
        <Text style={[styles.date, { color: theme.colors.onSurfaceVariant }]}>
          {format(new Date(item.createdAt), 'MMM d, yyyy')}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        AI History
      </Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  prompt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  response: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
}); 