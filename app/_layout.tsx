import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

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
