import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { categorias, cores } from '../constants/theme';
import type { Material } from '../types';

export function MaterialCard({ material }: { material: Material }) {
  const cat = categorias[material.categoria];

  return (
    <Card style={[estilos.card, { borderLeftColor: cat.cor }]} mode="elevated">
      <Card.Content style={{ gap: 12 }}>
        <View style={estilos.topo}>
          <Text variant="titleLarge" style={estilos.nome}>{material.nome}</Text>
          <Chip
            icon={cat.icone}
            compact
            textStyle={{ color: '#fff', fontWeight: '600' }}
            style={{ backgroundColor: cat.cor }}
            theme={{ colors: { onSurfaceVariant: '#fff' } }}
          >
            {material.categoria}
          </Chip>
        </View>

        <View style={{ gap: 8 }}>
          <Text variant="labelLarge" style={{ color: cores.tinta }}>Como descartar</Text>
          {material.instrucoes.map((passo, i) => (
            <View key={i} style={estilos.passo}>
              <MaterialCommunityIcons name="check-circle-outline" size={20} color={cores.musgo} />
              <Text variant="bodyMedium" style={estilos.textoPasso}>{passo}</Text>
            </View>
          ))}
        </View>

        {material.dica ? (
          <View style={estilos.dica}>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#8A6100" />
            <Text variant="bodySmall" style={{ flex: 1, color: '#5C4200' }}>{material.dica}</Text>
          </View>
        ) : null}
      </Card.Content>
    </Card>
  );
}

const estilos = StyleSheet.create({
  card: { backgroundColor: '#fff', borderLeftWidth: 6, marginBottom: 16 },
  topo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  nome: { flex: 1, fontWeight: '700', color: cores.tinta },
  passo: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  textoPasso: { flex: 1, color: cores.tinta },
  dica: { flexDirection: 'row', gap: 8, backgroundColor: '#FDF3D6', padding: 10, borderRadius: 10, alignItems: 'flex-start' },
});
