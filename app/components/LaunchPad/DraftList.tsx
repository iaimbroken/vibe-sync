import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Button, Text, useTheme } from 'react-native-paper';
import { Draft } from '../../screens/LaunchPadScreen';

interface DraftListProps {
    drafts: Draft[];
    onPostNow: (draft: Draft) => void;
    onEdit: (draft: Draft) => void;
    onDelete: (draft: Draft) => void;
}

export const DraftList = ({ drafts, onPostNow, onEdit, onDelete }: DraftListProps) => {
    const theme = useTheme();

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'instagram':
                return 'instagram';
            case 'facebook':
                return 'facebook';
            case 'twitter':
                return 'twitter';
            case 'linkedin':
                return 'linkedin';
            default:
                return 'web';
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="titleMedium" style={styles.title}>
                Saved Drafts
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {drafts.map((draft) => (
                    <Card
                        key={draft.id}
                        style={[styles.card, { backgroundColor: theme.colors.surface }]}
                        testID={`draft-card-${draft.id}`}
                    >
                        <Card.Content style={styles.cardContent}>
                            <View style={styles.header}>
                                <Text variant="titleSmall">{draft.title}</Text>
                                <Button
                                    icon={getPlatformIcon(draft.platform)}
                                    mode="text"
                                    style={styles.iconButton}
                                    testID={`platform-icon-${draft.id}`}
                                />
                            </View>
                            <Text
                                variant="bodySmall"
                                numberOfLines={2}
                                style={styles.preview}
                                testID={`preview-text-${draft.id}`}
                            >
                                {draft.preview}
                            </Text>
                            <View style={styles.actions}>
                                <Button
                                    icon="pencil"
                                    mode="text"
                                    style={styles.iconButton}
                                    onPress={() => onEdit(draft)}
                                    testID={`edit-button-${draft.id}`}
                                    accessibilityLabel={`Edit ${draft.title}`}
                                />
                                <Button
                                    icon="delete"
                                    mode="text"
                                    style={styles.iconButton}
                                    onPress={() => onDelete(draft)}
                                    testID={`delete-button-${draft.id}`}
                                    accessibilityLabel={`Delete ${draft.title}`}
                                />
                                <Button
                                    icon="send"
                                    mode="text"
                                    style={styles.iconButton}
                                    onPress={() => onPostNow(draft)}
                                    testID={`post-button-${draft.id}`}
                                    accessibilityLabel={`Post ${draft.title} now`}
                                />
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    title: {
        marginBottom: 8,
    },
    scrollContent: {
        gap: 12,
        paddingRight: 16,
    },
    card: {
        width: 280,
    },
    cardContent: {
        gap: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    preview: {
        opacity: 0.7,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 4,
    },
    iconButton: {
        margin: 0,
        padding: 0,
    },
}); 