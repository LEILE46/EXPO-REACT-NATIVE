import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "#fff",  // cor da fonte do cabeçalho
        headerShown: true, // cabeçalho visível
        headerTitleStyle: { fontWeight: "bold" },
      }}
    
      >
      <Stack.Screen name="index"options={{ title: "Bem-Vindo 🙋‍♀️" }} /> 
      {/* Descomente se quiser usar a calculadora com título personalizado */}
    
      {/* <Stack.Screen
        name="calculadora/index"
        options={{ title: "Calculadora 🧮" }}
      />  */}
        
      {/* <Stack.Screen name="teste" /> */}
      {/* <Stack.Screen name="Calculadora IMC" /> */}
      <Stack.Screen name="catalogo/index" options={{ title: "Catalogo Filme📽️" }}/>
      <Stack.Screen name="catalogo/[id]" options={{ title: "Detalhes do Filme📽️" }} />
    </Stack>
  );
}