import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Card, Chip, Text, useTheme } from 'react-native-paper';

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'draft' | 'completed';
}

interface CampaignListProps {
  campaigns: Campaign[];
  onDeleteCampaign: (id: string) => void;
  onCreateCampaign: () => void;
}

export const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  onDeleteCampaign,
  onCreateCampaign,
}) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return theme.colors.primary;
      case 'draft':
        return theme.colors.secondary;
      case 'completed':
        return theme.colors.tertiary;
      default:
        return theme.colors.error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text 
          variant="titleMedium" 
          style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
        >
          Campaigns
        </Text>
        <Button
          mode="contained"
          onPress={onCreateCampaign}
          icon="plus"
          style={styles.createButton}
          testID="create-campaign-button"
        >
          Create Campaign
        </Button>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {campaigns.map((campaign) => (
          <Card key={campaign.id} style={styles.card} testID={`campaign-card-${campaign.id}`}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text variant="titleMedium" style={styles.campaignName}>
                  {campaign.name}
                </Text>
                <Button
                  icon="delete"
                  mode="text"
                  style={styles.iconButton}
                  onPress={() => onDeleteCampaign(campaign.id)}
                  testID={`delete-campaign-${campaign.id}`}
                />
              </View>

              <Text variant="bodyMedium" style={styles.dateRange}>
                {campaign.startDate} - {campaign.endDate}
              </Text>

              <Chip
                mode="outlined"
                style={[styles.statusChip, { borderColor: getStatusColor(campaign.status) }]}
                textStyle={{ color: getStatusColor(campaign.status) }}
                testID={`campaign-status-${campaign.id}`}
              >
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Chip>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    flex: 1,
  },
  createButton: {
    marginLeft: 16,
  },
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    width: 280,
    marginRight: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  campaignName: {
    flex: 1,
    marginRight: 8,
  },
  dateRange: {
    marginBottom: 8,
    opacity: 0.7,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
}); 