import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Tema customizado - Azul Forte e Vibrante
const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0D47A1',
    primaryContainer: '#90CAF9',
    secondary: '#1565C0',
    secondaryContainer: '#BBDEFB',
    tertiary: '#01579B',
    surface: '#FFFFFF',
    surfaceVariant: '#E3F2FD',
    background: '#F5F9FF',
    error: '#D32F2F',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#0D47A1',
    onBackground: '#0D47A1',
  },
};

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#64B5F6',
    primaryContainer: '#1565C0',
    secondary: '#90CAF9',
    secondaryContainer: '#0D47A1',
    tertiary: '#BBDEFB',
    surface: '#1E2732',
    surfaceVariant: '#2C3E50',
    background: '#121212',
    error: '#EF5350',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onSurface: '#E3F2FD',
    onBackground: '#E3F2FD',
  },
};

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Dashboard' }} />
        <Stack.Screen name="contas" options={{ title: 'Contas' }} />
        <Stack.Screen name="renda" options={{ title: 'Renda Mensal' }} />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Adicionar/Editar Conta' 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
