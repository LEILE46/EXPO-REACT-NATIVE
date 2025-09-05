import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text,Image,Button} from "react-native";
import { Link } from "expo-router";

export default function Index() {
   return (
     <View style={styles.container}>
       <StatusBar style="light" />
        {/* <Image
           source={{AA=",
               uri: " " 
           style={styles.imagem}
              />

       <Link href="/calculadora" style={styles.botao}>
         <Text style={styles.textoBotao}>Ir para calculadora</Text>
      </Link> */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Bem-vindo ao Catálogo de Filmes!</Text>

        {/* Link para navegar ao catálogo */}
        <Link href="./catalogo" style={styles.botao}>
          <Text style={styles.textoBotao}>Ver Catálogo</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9B69B6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  botao: {
    backgroundColor: "#6A4C9C",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 20,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // Alterado para branco para contraste melhor
    textAlign: "center",
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 100, // Forma de círculo
    marginBottom: 20,
  },
});