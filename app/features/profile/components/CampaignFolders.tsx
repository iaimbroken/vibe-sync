import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, IconButton, List, TextInput, useTheme } from 'react-native-paper';

interface Folder {
  id: string;
  name: string;
}

interface CampaignFoldersProps {
  folders: Folder[];
  onAddFolder: (name: string) => Promise<void>;
  onDeleteFolder: (id: string) => Promise<void>;
}

export const CampaignFolders: React.FC<CampaignFoldersProps> = ({
  folders,
  onAddFolder,
  onDeleteFolder,
}) => {
  const theme = useTheme();
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [loadingFolderId, setLoadingFolderId] = useState<string | null>(null);

  const handleAddFolder = async () => {
    if (!newFolderName.trim()) return;
    
    try {
      await onAddFolder(newFolderName.trim());
      setNewFolderName('');
      setIsAddingFolder(false);
    } catch (error) {
      // Error handling would be done by the parent component
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    setLoadingFolderId(folderId);
    try {
      await onDeleteFolder(folderId);
    } catch (error) {
      // Error handling would be done by the parent component
    } finally {
      setLoadingFolderId(null);
    }
  };

  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Card.Title
        title="Campaign Folders"
        right={(props) => (
          <IconButton
            {...props}
            icon="plus"
            onPress={() => setIsAddingFolder(true)}
            disabled={isAddingFolder}
          />
        )}
      />
      <Card.Content>
        {isAddingFolder && (
          <View style={styles.addFolderContainer}>
            <TextInput
              label="Folder Name"
              value={newFolderName}
              onChangeText={setNewFolderName}
              style={styles.input}
              autoFocus
            />
            <View style={styles.buttonContainer}>
              <IconButton
                icon="check"
                onPress={handleAddFolder}
                disabled={!newFolderName.trim()}
              />
              <IconButton
                icon="close"
                onPress={() => {
                  setIsAddingFolder(false);
                  setNewFolderName('');
                }}
              />
            </View>
          </View>
        )}
        {folders.map((folder) => (
          <List.Item
            key={folder.id}
            title={folder.name}
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                onPress={() => handleDeleteFolder(folder.id)}
                disabled={loadingFolderId === folder.id}
              />
            )}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  addFolderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
}); 