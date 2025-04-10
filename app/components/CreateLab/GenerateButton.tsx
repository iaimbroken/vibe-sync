import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Button, ActivityIndicator, useTheme, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface GenerateButtonProps {
    onPress: () => void;
    loading: boolean;
    disabled?: boolean;
    label?: string;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
    onPress,
    loading,
    disabled = false,
    label = 'Generate Magic',
}) => {
    const theme = useTheme();

    return (
        <Button
            mode="contained"
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                {
                    backgroundColor: disabled ? theme.colors.surfaceDisabled : theme.colors.primary,
                },
            ]}
            contentStyle={styles.content}
            labelStyle={[
                styles.label,
                { color: theme.colors.onPrimary }
            ]}
        >
            {loading ? (
                <ActivityIndicator 
                    size={24} 
                    color={theme.colors.onPrimary}
                    style={styles.loader} 
                />
            ) : (
                <>
                    <MaterialCommunityIcons
                        name="lightning-bolt"
                        size={24}
                        color={theme.colors.onPrimary}
                        style={styles.icon}
                    />
                    <Text
                        variant="titleMedium"
                        style={[
                            styles.text,
                            { color: theme.colors.onPrimary }
                        ]}
                    >
                        {label}
                    </Text>
                </>
            )}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
        includeFontPadding: false,
    },
    loader: {
        margin: 4,
    },
}); 