import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, List, IconButton, TextInput, useTheme } from 'react-native-paper';

interface Folder {
  id: string;
  name: string;
}

interface CampaignFoldersProps {
  folders: Folder[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
}

export const CampaignFolders: React.FC<CampaignFoldersProps> = ({
  folders,
  onAdd,
  onDelete,
}) => {
  const theme = useTheme();
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      onAdd(newFolderName.trim());
      setNewFolderName('');
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
            onPress={handleAddFolder}
            testID="add-folder-button"
            accessibilityLabel="Add new folder"
          />
        )}
      />
      <Card.Content>
        <TextInput
          label="New Folder Name"
          value={newFolderName}
          onChangeText={setNewFolderName}
          onSubmitEditing={handleAddFolder}
          right={
            <TextInput.Icon
              icon="plus"
              onPress={handleAddFolder}
              testID="add-folder-icon"
            />
          }
          testID="new-folder-input"
        />
        
        <List.Section>
          {folders.map((folder) => (
            <List.Item
              key={folder.id}
              title={folder.name}
              left={props => <List.Icon {...props} icon="folder" />}
              right={props => (
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={() => onDelete(folder.id)}
                  testID={`delete-folder-${folder.id}`}
                  accessibilityLabel={`Delete folder ${folder.name}`}
                />
              )}
              testID={`folder-${folder.id}`}
            />
          ))}
        </List.Section>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
}); 