import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Chip, FAB, IconButton, Snackbar, Text } from 'react-native-paper';
import { NovoPontoModal } from '../../components/NovoPontoModal';
import { cores, tiposDePonto } from '../../constants/theme';
import { PONTOS_INICIAIS, REGIAO_PADRAO } from '../../data/pontos';
import type { PontoColeta, TipoPonto } from '../../types';

export default function MapaScreen() {
  const mapRef = useRef<MapView>(null);
  const centroRef = useRef<Region>(REGIAO_PADRAO);
  // Guarda a coordenada confirmada pelo usuário (onde o pino estava).
  const localConfirmadoRef = useRef({ latitude: REGIAO_PADRAO.latitude, longitude: REGIAO_PADRAO.longitude });

  const [pontos, setPontos] = useState<PontoColeta[]>(PONTOS_INICIAIS);
  const [filtro, setFiltro] = useState<TipoPonto | null>(null);
  const [posicionando, setPosicionando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Tenta usar o GPS; se não houver permissão, continua em São Paulo.
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setMensagem('GPS desativado. Mostrando São Paulo como exemplo.');
          return;
        }
        const pos = await Location.getCurrentPositionAsync({});
        mapRef.current?.animateToRegion(
          { latitude: pos.coords.latitude, longitude: pos.coords.longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 },
          600,
        );
      } catch {
        setMensagem('Não foi possível obter sua posição. Mostrando São Paulo.');
      }
    })();
  }, []);

  const iniciarPosicionamento = () => {
    setPosicionando(true);
    setMensagem('Mova o mapa até o local e toque em Confirmar local.');
  };

  const confirmarLocal = () => {
    localConfirmadoRef.current = {
      latitude: centroRef.current.latitude,
      longitude: centroRef.current.longitude,
    };
    setPosicionando(false);
    setModalAberto(true);
  };

  const adicionarPonto = ({ tipo, titulo, descricao }: { tipo: TipoPonto; titulo: string; descricao: string }) => {
    const novo: PontoColeta = {
      id: `u${Date.now()}`,
      tipo,
      titulo,
      descricao: descricao || 'Sinalizado pela comunidade',
      latitude: localConfirmadoRef.current.latitude,
      longitude: localConfirmadoRef.current.longitude,
      enviadoPorUsuario: true,
    };
    setPontos((atual) => [...atual, novo]);
    setMensagem('Ponto adicionado ao mapa. Obrigado por colaborar!');
  };

  const visiveis = filtro ? pontos.filter((p) => p.tipo === filtro) : pontos;

  return (
    <View style={estilos.tela}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={REGIAO_PADRAO}
        showsUserLocation
        showsMyLocationButton={false}
        onRegionChangeComplete={(r) => (centroRef.current = r)}
      >
        {visiveis.map((p) => {
          const info = tiposDePonto[p.tipo];
          return (
            <Marker
              key={p.id}
              coordinate={{ latitude: p.latitude, longitude: p.longitude }}
              title={p.titulo}
              description={p.descricao}
            >
              <View style={[estilos.pino, { backgroundColor: info.cor }, p.enviadoPorUsuario && estilos.pinoUsuario]}>
                <MaterialCommunityIcons name={info.icone as any} size={18} color="#fff" />
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View style={estilos.topo} pointerEvents="box-none">
        <View style={estilos.cabecalho}>
          <Text variant="titleMedium" style={estilos.titulo}>
            {posicionando ? 'Escolha o local do ponto' : 'Pontos de descarte'}
          </Text>
          <IconButton
            icon="city-variant-outline"
            size={20}
            onPress={() => mapRef.current?.animateToRegion(REGIAO_PADRAO, 600)}
            accessibilityLabel="Ver pontos de exemplo em São Paulo"
          />
        </View>
        {!posicionando && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.filtros}>
            {(Object.keys(tiposDePonto) as TipoPonto[]).map((t) => (
              <Chip
                key={t}
                icon={tiposDePonto[t].icone}
                selected={filtro === t}
                onPress={() => setFiltro(filtro === t ? null : t)}
                style={estilos.chip}
              >
                {tiposDePonto[t].rotulo}
              </Chip>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Pino fixo no centro: o ponto será salvo exatamente aqui */}
      {posicionando && (
        <View pointerEvents="none" style={estilos.miraCentro}>
          <MaterialCommunityIcons name="map-marker" size={44} color={cores.alerta} />
        </View>
      )}

      {posicionando ? (
        <View style={estilos.barraPosicao}>
          <Button mode="outlined" style={{ backgroundColor: '#fff' }} onPress={() => setPosicionando(false)}>
            Cancelar
          </Button>
          <Button mode="contained" icon="check" onPress={confirmarLocal}>
            Confirmar local
          </Button>
        </View>
      ) : (
        <FAB
          icon="map-marker-plus"
          label="Sinalizar novo ponto"
          style={estilos.fab}
          color="#fff"
          onPress={iniciarPosicionamento}
        />
      )}

      <NovoPontoModal visible={modalAberto} onDismiss={() => setModalAberto(false)} onSave={adicionarPonto} />

      <Snackbar visible={!!mensagem} onDismiss={() => setMensagem(null)} duration={3500}>
        {mensagem}
      </Snackbar>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  topo: { position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 52 },
  cabecalho: {
    marginHorizontal: 16, paddingLeft: 16, paddingRight: 4,
    backgroundColor: '#fff', borderRadius: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between', elevation: 3,
  },
  titulo: { fontWeight: '700', color: cores.tinta },
  filtros: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  chip: { backgroundColor: '#fff' },
  pino: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  pinoUsuario: { borderColor: cores.sol, borderWidth: 3 },
  fab: { position: 'absolute', right: 16, bottom: 24, backgroundColor: cores.musgo },
  miraCentro: { position: 'absolute', top: '50%', left: '50%', marginLeft: -22, marginTop: -44 },
  barraPosicao: {
    position: 'absolute', left: 16, right: 16, bottom: 24,
    flexDirection: 'row', justifyContent: 'space-between', gap: 12,
  },
});
