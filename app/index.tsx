// NOME_DO_ARQUIVO: index.js

import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Container de todos os itens */}
      <View style={styles.itensContainer}>
        {/* CALCULADORA */}
        <Link href="/calculadora" asChild>
          <Pressable style={styles.itemContainer}>
            <Image
              source={{
                uri: "https://tse4.mm.bing.net/th/id/OIP.HZxEtj9Gb2hZKc2r6u5QLAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
              }}
              style={styles.itemImagem}
            />
            <Text style={styles.labelTexto}>Calculadora</Text>
          </Pressable>
        </Link>

        {/* CATÁLOGO DE FILMES */}
        <Link href="/catalogo" asChild>
          <Pressable style={styles.itemContainer}>
            <Image
              source={{
                uri: "https://t2.tudocdn.net/687837?w=1920",
              }}
              style={styles.itemImagem}
            />
            <Text style={styles.labelTexto}>Catálogo de Filmes</Text>
          </Pressable>
        </Link>

        {/* CALCULADORA IMC */}
        <Link href="/calculadoraimc" asChild>
          <Pressable style={styles.itemContainer}>
            <Image
              source={{
                uri: "https://tse1.mm.bing.net/th/id/OIP.8pEv1fxg6ccSqTOEWl82wQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
              }}
              style={styles.itemImagem}
            />
            <Text style={styles.labelTexto}>Calculadora IMC</Text>
          </Pressable>
        </Link>

        <Link href="/cineExploreapp" asChild>
          <Pressable style={styles.itemContainer}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/134087511/255010481-4488ec1f-7c17-4b91-8ef8-3f92557a87d0.png",
              }}
              style={styles.itemImagem}
            />
            <Text style={styles.labelTexto}>CineExplore App</Text>
          </Pressable>
        </Link>
                  <Link href="./app_personagem" asChild>
          <Pressable style={styles.itemContainer}>
            <Image
              source={{
                uri: "https://pngimg.com/uploads/rick_morty/rick_morty_PNG24.png",
              }}
              style={styles.itemImagem}
            />
            <Text style={styles.labelTexto}>Rick and Morty</Text>
          </Pressable>
        </Link>
    </View>
</View>
  
);



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9B69B6",
    paddingHorizontal: 20,
    justifyContent: "flex-start", 
    alignItems: "center",
  },
  itensContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 600,
  },
  itemContainer: {
    alignItems: "center",
    width: "48%",
    marginBottom: 20,
  },
  itemImagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  labelTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});