// app/styles/theme.ts
import { MD3DarkTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 16, // Use rounded corners throughout for a modern look
  colors: {
    ...DefaultTheme.colors,
    primary: '#A55CFF',       // Vibrant neon purple for buttons and active elements
    accent: '#D36BFF',        // A complementary accent color
    background: '#1A1B2A',     // Deep, dark background that makes neon pop
    surface: '#232438',        // A dark surface color for cards and panels
    text: '#FFFFFF',           // White text for excellent readability
    onSurface: '#C4C4C4',      // Muted text for secondary content
    placeholder: '#C4C4C4',
  },
};
