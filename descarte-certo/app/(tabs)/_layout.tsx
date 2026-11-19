import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cores } from '../../constants/theme';

type Icone = keyof typeof MaterialCommunityIcons.glyphMap;

const aba = (titulo: string, icone: Icone, ativo: Icone) => ({
  title: titulo,
  tabBarIcon: ({ color, focused, size }: { color: string; focused: boolean; size: number }) => (
    <MaterialCommunityIcons name={focused ? ativo : icone} size={size} color={color} />
  ),
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: cores.musgo,
        tabBarInactiveTintColor: cores.cinza,
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: cores.borda },
        headerStyle: { backgroundColor: cores.papel },
        headerShadowVisible: false,
        headerTitleStyle: { color: cores.tinta, fontWeight: '700' },
      }}
    >
      <Tabs.Screen name="index" options={{ ...aba('Mapa', 'map-outline', 'map'), headerShown: false }} />
      <Tabs.Screen name="pesquisa" options={{ ...aba('Pesquisa', 'magnify', 'magnify'), headerTitle: 'Como descartar?' }} />
      <Tabs.Screen name="leis" options={{ ...aba('Leis locais', 'scale-balance', 'scale-balance'), headerTitle: 'Normas do município' }} />
      <Tabs.Screen name="comunidade" options={{ ...aba('Comunidade', 'account-group-outline', 'account-group'), headerTitle: 'Comunidade' }} />
    </Tabs>
  );
}
