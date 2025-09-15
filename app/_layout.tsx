import { useTheme, ThemeProvider } from '@/contexts/temas';
import { Stack } from 'expo-router';
import { TouchableOpacity, Text, StatusBar } from 'react-native';

// Componente para o botão de tema
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Text style={{ fontSize: 24 }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
}

function RootLayoutContent() {
  const { theme } = useTheme();

  const headerStyle = {
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#8a2be2',
  };
  const headerTintColor = '#fff';

  return (
    <>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#1a1a1a' : '#8a2be2'}
      />
      <Stack
        screenOptions={{
          headerStyle: headerStyle,
          headerTintColor: headerTintColor,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >


        {/* Demais telas com tema aplicado */}
        <Stack.Screen
          name="index"
          options={{ title: "Bem-Vindo aos APPs🙋‍♀️" }}
        />
        <Stack.Screen
          name="calculadora/index"
          options={{ title: "Calculadora 🧮" }}
        />
        <Stack.Screen
          name="calculadoraimc/index"
          options={{ title: "Calculadora IMC" }}
        />
        <Stack.Screen
          name="catalogo/index"
          options={{ title: "Catalogo Filme📽️" }}
        />
        <Stack.Screen
          name="catalogo/[id]"
          options={{ title: "Detalhes do Filme📽️" }}
        />
        <Stack.Screen
          name="cineExploreapp/index"
          options={{
            title: "CineExplore App",
            headerRight: () => <ThemeToggleButton />,
          }}
        />
        <Stack.Screen
          name="cineExploreapp/Detalhesfilme/[id]"
          options={{
            title: "CineExplore App",
            headerRight: () => <ThemeToggleButton />,
          }}
        />
        {/* Tela de abas (tabs) sem header */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
