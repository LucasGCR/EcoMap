import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { cores, tiposDePonto } from '../constants/theme';
import type { TipoPonto } from '../types';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSave: (dados: { tipo: TipoPonto; titulo: string; descricao: string }) => void;
}

export function NovoPontoModal({ visible, onDismiss, onSave }: Props) {
  const [tipo, setTipo] = useState<TipoPonto>('ecoponto');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const fechar = () => {
    setTitulo('');
    setDescricao('');
    setTipo('ecoponto');
    onDismiss();
  };

  const salvar = () => {
    onSave({
      tipo,
      titulo: titulo.trim() || tiposDePonto[tipo].rotulo,
      descricao: descricao.trim(),
    });
    fechar();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={fechar} contentContainerStyle={estilos.caixa}>
        <Text variant="titleLarge" style={estilos.titulo}>Sinalizar novo ponto</Text>
        <Text variant="bodyMedium" style={estilos.apoio}>
          Local confirmado no mapa. Escolha o tipo e dê um nome ao ponto.
        </Text>

        <Text variant="labelLarge" style={estilos.rotulo}>Tipo de ponto</Text>
        <View style={estilos.chips}>
          {(Object.keys(tiposDePonto) as TipoPonto[]).map((t) => (
            <Chip
              key={t}
              selected={tipo === t}
              onPress={() => setTipo(t)}
              icon={tiposDePonto[t].icone}
              style={estilos.chip}
            >
              {tiposDePonto[t].rotulo}
            </Chip>
          ))}
        </View>

        <TextInput
          mode="outlined"
          label="Nome do local"
          placeholder="Ex.: Coletor da padaria da esquina"
          value={titulo}
          onChangeText={setTitulo}
          style={estilos.campo}
        />
        <TextInput
          mode="outlined"
          label="Observações (opcional)"
          placeholder="Horário, o que aceita, como chegar"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={3}
          style={estilos.campo}
        />

        <View style={estilos.acoes}>
          <Button onPress={fechar}>Cancelar</Button>
          <Button mode="contained" icon="map-marker-plus" onPress={salvar}>Adicionar ao mapa</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const estilos = StyleSheet.create({
  caixa: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 20 },
  titulo: { fontWeight: '700', color: cores.tinta },
  apoio: { color: cores.cinza, marginTop: 4, marginBottom: 12 },
  rotulo: { marginBottom: 8, color: cores.tinta },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { backgroundColor: cores.menta },
  campo: { marginBottom: 12, backgroundColor: '#fff' },
  acoes: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 4 },
});
