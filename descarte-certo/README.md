# Descarte Certo (protótipo)

App Expo + Expo Router + TypeScript + React Native Paper, com dados de exemplo.
Este zip contém só o código do app (5 pastas). O projeto base é criado pelo Expo.

## Passo a passo

1. Instale: Node.js LTS (nodejs.org), VS Code e o app Expo Go no celular. Reinicie o computador.
2. Crie uma pasta vazia (ex.: `prototipo`) e abra no VS Code (File > Open Folder).
3. No terminal do VS Code (`Ctrl+'`):

```
npx create-expo-app@latest .
npm run reset-project
```

4. Descompacte este zip e copie as pastas `app`, `components`, `constants`, `data` e `types` para a raiz do projeto, substituindo o que existir.
5. Confira a estrutura:
   - Se existir uma pasta `src` na raiz, apague-a (ela tem as telas de exemplo e faz o app ignorar a sua `app`).
   - Dentro de `app/` só podem existir `_layout.tsx` e a pasta `(tabs)`. Apague `app/index.tsx` ou qualquer outro arquivo solto.
   - `NovoPontoModal.tsx` e `MaterialCard.tsx` ficam em `components/`, nunca dentro de `app/`.
6. Instale as bibliotecas (atenção aos hífens):

```
npx expo install react-native-maps expo-location expo-document-picker
npx expo install react-native-paper react-native-safe-area-context @expo/vector-icons expo-status-bar
```

7. No `app.json`, dentro de `"plugins"`, acrescente (sem apagar os outros itens):

```json
["expo-location", { "locationWhenInUsePermission": "Usamos sua localização para mostrar pontos de descarte próximos." }]
```

8. Rode e escaneie o QR code com o Expo Go (celular na mesma rede Wi-Fi):

```
npx expo start -c
```

Se o celular não conectar: `npx expo start --tunnel`.

## Estrutura esperada

```
app/
  _layout.tsx
  (tabs)/_layout.tsx, index.tsx, pesquisa.tsx, leis.tsx, comunidade.tsx
components/   MaterialCard.tsx, NovoPontoModal.tsx
constants/    theme.ts
data/         leis.ts, materiais.ts, pontos.ts, posts.ts
types/        index.ts
```

## Como usar o mapa

Toque em "Sinalizar novo ponto", arraste o mapa até o pino vermelho ficar no local certo, toque em "Confirmar local" e preencha o formulário.

## Observações

- Sem GPS, o mapa abre em São Paulo. O ícone de cidade no topo volta para os pontos de exemplo.
- As leis e instruções de descarte são ilustrativas. Pontos e posts novos somem ao fechar o app.
