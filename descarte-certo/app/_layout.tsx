import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { tema } from '../constants/theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={tema}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
