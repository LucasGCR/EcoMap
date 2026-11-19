import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button, Card, Chip, List, Snackbar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cores } from '../../constants/theme';
import { LEIS_EXEMPLO } from '../../data/leis';

interface Anexo {
  nome: string;
  tamanho?: number;
  previa?: string;
}

export default function LeisScreen() {
  const [anexo, setAnexo] = useState<Anexo | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const anexar = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'text/plain'],
        copyToCacheDirectory: true,
      });
      if (res.canceled) return;

      const arq = res.assets[0];
      let previa: string | undefined;
      if (arq.mimeType === 'text/plain') {
        const texto = await (await fetch(arq.uri)).text();
        previa = texto.slice(0, 500);
      }
      setAnexo({ nome: arq.name, tamanho: arq.size, previa });
    } catch {
      setErro('Não foi possível abrir o arquivo. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <Card mode="outlined" style={estilos.card}>
        <Card.Content style={{ gap: 12 }}>
          <View style={estilos.linha}>
            <MaterialCommunityIcons name="file-document-outline" size={24} color={cores.musgo} />
            <Text variant="titleMedium" style={estilos.titulo}>Normas da sua cidade</Text>
          </View>
          <Text variant="bodyMedium" style={{ color: cores.cinza }}>
            A prefeitura ou você pode enviar o texto das leis locais. Neste protótipo o arquivo é apenas lido no aparelho.
          </Text>
          <Button mode="contained" icon="paperclip" onPress={anexar}>
            Anexar documento de normas locais (.pdf / .txt)
          </Button>

          {anexo ? (
            <View style={estilos.anexo}>
              <View style={estilos.linha}>
                <MaterialCommunityIcons name="check-circle" size={20} color={cores.musgo} />
                <View style={{ flex: 1 }}>
                  <Text variant="labelLarge" numberOfLines={1} style={{ color: cores.tinta }}>{anexo.nome}</Text>
                  {anexo.tamanho ? (
                    <Text variant="bodySmall" style={{ color: cores.cinza }}>
                      {(anexo.tamanho / 1024).toFixed(1)} KB
                    </Text>
                  ) : null}
                </View>
                <Button compact onPress={() => setAnexo(null)}>Remover</Button>
              </View>
              {anexo.previa ? (
                <Text variant="bodySmall" style={estilos.previa}>{anexo.previa}…</Text>
              ) : (
                <Text variant="bodySmall" style={{ color: cores.cinza }}>
                  A leitura de PDF entra na próxima etapa.
                </Text>
              )}
            </View>
          ) : null}
        </Card.Content>
      </Card>

      <View style={estilos.linha}>
        <Text variant="titleSmall" style={{ color: cores.cinza }}>Leis em vigor</Text>
        <Chip compact>Dados de exemplo</Chip>
      </View>

      {LEIS_EXEMPLO.map((lei) => (
        <Card key={lei.id} mode="outlined" style={estilos.card}>
          <List.Accordion
            title={lei.titulo}
            description={lei.tema}
            titleStyle={{ color: cores.tinta, fontWeight: '600' }}
            left={(p) => <List.Icon {...p} icon="gavel" />}
          >
            <View style={estilos.corpoLei}>
              <Text variant="bodyMedium" style={{ color: cores.tinta }}>{lei.resumo}</Text>
              {lei.pontos.map((ponto, i) => (
                <View key={i} style={estilos.linha}>
                  <MaterialCommunityIcons name="circle-small" size={20} color={cores.musgo} />
                  <Text variant="bodySmall" style={{ flex: 1, color: cores.tinta }}>{ponto}</Text>
                </View>
              ))}
            </View>
          </List.Accordion>
        </Card>
      ))}

      <Snackbar visible={!!erro} onDismiss={() => setErro(null)}>{erro}</Snackbar>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: { padding: 16, gap: 12, backgroundColor: cores.papel },
  card: { backgroundColor: '#fff', borderColor: cores.borda },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titulo: { fontWeight: '700', color: cores.tinta },
  anexo: { backgroundColor: cores.menta, borderRadius: 12, padding: 12, gap: 8 },
  previa: { color: cores.tinta, fontStyle: 'italic' },
  corpoLei: { paddingHorizontal: 16, paddingBottom: 16, gap: 4 },
});
