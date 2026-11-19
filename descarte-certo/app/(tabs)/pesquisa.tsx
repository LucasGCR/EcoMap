import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Searchbar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialCard } from '../../components/MaterialCard';
import { categorias, cores } from '../../constants/theme';
import { MATERIAIS } from '../../data/materiais';
import type { Material } from '../../types';

const normalizar = (t: string) =>
  t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

export default function PesquisaScreen() {
  const [busca, setBusca] = useState('');
  const [selecionado, setSelecionado] = useState<Material | null>(null);

  const resultados = useMemo(() => {
    const q = normalizar(busca);
    if (!q) return MATERIAIS;
    return MATERIAIS.filter(
      (m) => normalizar(m.nome).includes(q) || m.palavrasChave.some((k) => normalizar(k).includes(q)),
    );
  }, [busca]);

  // Clique tem prioridade; senão, mostra o melhor resultado da busca.
  const exibido = selecionado ?? (busca.trim() ? resultados[0] ?? null : null);

  const cabecalho = (
    <View>
      <Searchbar
        placeholder="Ex.: lâmpada, isopor, óleo"
        value={busca}
        onChangeText={(t) => {
          setBusca(t);
          setSelecionado(null);
        }}
        style={estilos.busca}
        inputStyle={{ color: cores.tinta }}
      />

      <Card mode="outlined" style={estilos.placeholder}>
        <Card.Content style={estilos.placeholderConteudo}>
          <MaterialCommunityIcons name="camera-outline" size={28} color={cores.cinza} />
          <View style={{ flex: 1 }}>
            <Text variant="titleSmall" style={{ color: cores.tinta }}>
              Futura funcionalidade: Escaneamento por Câmera IA
            </Text>
            <Text variant="bodySmall" style={{ color: cores.cinza }}>
              Aponte para o objeto e descubra onde descartar.
            </Text>
          </View>
          <Button mode="outlined" disabled compact>Em breve</Button>
        </Card.Content>
      </Card>

      {exibido ? <MaterialCard material={exibido} /> : null}

      {busca.trim() && resultados.length === 0 ? (
        <View style={estilos.vazio}>
          <MaterialCommunityIcons name="help-circle-outline" size={32} color={cores.cinza} />
          <Text variant="bodyMedium" style={{ color: cores.cinza, textAlign: 'center' }}>
            Não encontramos “{busca}”. Tente outro nome ou veja a lista abaixo.
          </Text>
        </View>
      ) : null}

      <Text variant="titleSmall" style={estilos.secao}>
        {busca.trim() ? `${resultados.length} resultado(s)` : 'Dúvidas mais comuns'}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={resultados}
      keyExtractor={(m) => m.id}
      ListHeaderComponent={cabecalho}
      contentContainerStyle={estilos.lista}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => {
        const cat = categorias[item.categoria];
        const ativo = exibido?.id === item.id;
        return (
          <Card
            mode="outlined"
            onPress={() => setSelecionado(item)}
            style={[estilos.item, ativo && { borderColor: cores.musgo, borderWidth: 2 }]}
          >
            <Card.Content style={estilos.itemConteudo}>
              <Text variant="bodyLarge" style={{ flex: 1, color: cores.tinta }}>{item.nome}</Text>
              <Chip compact icon={cat.icone} style={{ backgroundColor: cores.menta }}>
                {item.categoria}
              </Chip>
            </Card.Content>
          </Card>
        );
      }}
    />
  );
}

const estilos = StyleSheet.create({
  lista: { padding: 16, paddingBottom: 32, backgroundColor: cores.papel },
  busca: { backgroundColor: '#fff', marginBottom: 12 },
  placeholder: { borderStyle: 'dashed', borderColor: cores.cinza, backgroundColor: 'transparent', marginBottom: 16 },
  placeholderConteudo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  secao: { color: cores.cinza, marginBottom: 8, marginTop: 4 },
  item: { marginBottom: 8, backgroundColor: '#fff', borderColor: cores.borda },
  itemConteudo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  vazio: { alignItems: 'center', gap: 8, paddingVertical: 24 },
});
