import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
import { cores } from '../../constants/theme';
import { POSTS_INICIAIS } from '../../data/posts';
import type { Post } from '../../types';

export default function ComunidadeScreen() {
  const [posts, setPosts] = useState<Post[]>(POSTS_INICIAIS);
  const [texto, setTexto] = useState('');

  const publicar = () => {
    if (!texto.trim()) return;
    setPosts((atual) => [
      { id: `n${Date.now()}`, autor: 'Você', bairro: 'Seu bairro', texto: texto.trim(), curtidas: 0, comentarios: 0, tempo: 'agora' },
      ...atual,
    ]);
    setTexto('');
  };

  const curtir = (id: string) =>
    setPosts((atual) =>
      atual.map((p) =>
        p.id === id ? { ...p, curtido: !p.curtido, curtidas: p.curtidas + (p.curtido ? -1 : 1) } : p,
      ),
    );

  const cabecalho = (
    <Card mode="outlined" style={estilos.compor}>
      <Card.Content style={{ gap: 8 }}>
        <TextInput
          mode="outlined"
          placeholder="Compartilhe uma dica ou avise sobre um ponto"
          value={texto}
          onChangeText={setTexto}
          multiline
          style={{ backgroundColor: '#fff' }}
        />
        <Button mode="contained" onPress={publicar} disabled={!texto.trim()} style={{ alignSelf: 'flex-end' }}>
          Publicar
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        ListHeaderComponent={cabecalho}
        contentContainerStyle={estilos.lista}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Card mode="outlined" style={estilos.card}>
            <Card.Title
              title={item.autor}
              subtitle={`${item.bairro} • ${item.tempo}`}
              left={(p) => (
                <Avatar.Text {...p} label={item.autor.slice(0, 1)} style={{ backgroundColor: cores.menta }} color={cores.tinta} />
              )}
            />
            <Card.Content>
              <Text variant="bodyMedium" style={{ color: cores.tinta }}>{item.texto}</Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'flex-start' }}>
              <View style={estilos.acao}>
                <IconButton
                  icon={item.curtido ? 'heart' : 'heart-outline'}
                  iconColor={item.curtido ? cores.alerta : cores.cinza}
                  onPress={() => curtir(item.id)}
                  accessibilityLabel="Curtir"
                />
                <Text variant="labelMedium">{item.curtidas}</Text>
              </View>
              <View style={estilos.acao}>
                <IconButton icon="comment-outline" iconColor={cores.cinza} onPress={() => {}} accessibilityLabel="Comentar" />
                <Text variant="labelMedium">{item.comentarios}</Text>
              </View>
            </Card.Actions>
          </Card>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  lista: { padding: 16, gap: 12, backgroundColor: cores.papel },
  compor: { backgroundColor: '#fff', borderColor: cores.borda },
  card: { backgroundColor: '#fff', borderColor: cores.borda },
  acao: { flexDirection: 'row', alignItems: 'center' },
});
