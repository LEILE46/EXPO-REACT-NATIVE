import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

export default function Personagens() {
  const [personagens, setPersonagens] = useState([]);
  useEffect(() => {
    async function carregarPersonagens() {
      const resposta = await fetch("https://rickandmortyapi.com/api/character");
      const dados = await resposta.json();
      setPersonagens(dados.results);
    }
    carregarPersonagens();
  }, []);
  function navegartela(id){
     router.navigate({
          pathname: "/app_personagem/[id]",
          params: { id: id.toString() }, 
              })
  }
  const RenderPersonagem = ({person}) => {
    
    return (
     <Pressable onPress={() => navegartela(person.id)}
>
        <View style={styles.personagemContainer}>
          <Image
            source={{
              uri: person.image,
            }}
            style={styles.imagem}
          />
          <Text style={styles.personagem}>{person.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RICK AND MORTY</Text>

      <FlatList
        data={personagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderPersonagem person={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#eae6f8",  
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
    color: "#4b0082", 
    textAlign: "center",
  },
  list: {
    paddingBottom: 30,
  },
  personagemContainer: {
    backgroundColor: "#d8c8f5", 
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#6a0dad", 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 6,
  },
  personagem: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#3a0270", 
  },
  imagem: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#6a0dad", 
    shadowColor: "#6a0dad",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
});