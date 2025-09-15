import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState, useLayoutEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View, ScrollView } from "react-native";

export default function Detalhes() {
  const { id } = useLocalSearchParams();
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function buscarPersonagem() {
      try {
        const resposta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const dados = await resposta.json();
        setPersonagem(dados);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) buscarPersonagem();
  }, [id]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Detalhes",
    });
  }, [navigation]);
  if (loading || !personagem) {
    return (
      <View style={styles.containerperso}>
        <ActivityIndicator size="large" color="#0d8d3c" />
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: personagem.image }} style={styles.image} />
      <Text style={styles.name}>{personagem.name}</Text>
      <View style={styles.conteinerinfor}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{personagem.status}</Text>
      </View>
      <View style={styles.conteinerinfor}>
        <Text style={styles.label}>Espécie:</Text>
        <Text style={styles.value}>{personagem.species}</Text>
      </View>
      <View style={styles.conteinerinfor}>
        <Text style={styles.label}>Gênero:</Text>
        <Text style={styles.value}>{personagem.gender}</Text>
      </View>
      <View style={styles.conteinerinfor}>
        <Text style={styles.label}>Origem:</Text>
        <Text style={styles.value}>{personagem.origin.name}</Text>
      </View>
      <View style={styles.conteinerinfor}>
        <Text style={styles.label}>Localização:</Text>
        <Text style={styles.value}>{personagem.location.name}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerperso: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6a5acd", 
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#d8bffd", 
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: "#7b4ecb",
    shadowColor: "#b494e0", 
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5a3b9e", 
    marginBottom: 20,
  },
  conteinerinfor: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#bba3e0", 
  },
  label: {
    fontWeight: "600",
    fontSize: 18,
    color: "#3b2a5a",
    width: 120,
  },
  value: {
    fontSize: 18,
    color: "#2e2b30ff", 
    flexShrink: 1,
  },
});
