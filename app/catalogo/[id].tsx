import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet, Alert, Image, ScrollView } from 'react-native';

// Tipo para o filme
type Filme = {
  id: number;
  nome: string;
  sinopse: string;
  foto: string;
};

const DetalhesFilme = () => {
  const { id } = useLocalSearchParams(); // Usando o hook para acessar os parâmetros da URL

  const [filmes, setFilmes] = useState<Filme[]>([]); // Todos os filmes
  const [filme, setFilme] = useState<Filme | null>(null); // Filme específico
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se o id foi passado
    if (!id) return;

    const fetchFilmes = async () => {
      try {
        setLoading(true); // Ativa o carregamento
        const response = await fetch(`https://sujeitoprogramador.com/r-api/?api=filmes`);
        const filmesData = await response.json();
        setFilmes(filmesData);

        const filmeEncontrado = filmesData.find((f: Filme) => f.id === parseInt(id as string));
        setFilme(filmeEncontrado || null);
      } catch (error) {
        console.error('Erro ao carregar detalhes do filme:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do filme.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilmes();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!filme) {
    return <Text>Filme não encontrado.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: filme.foto }} style={styles.foto} />
      <View style={styles.detailsContainer}>
        <Text style={styles.titulo}>{filme.nome}</Text>
        <Text style={styles.sinopse}>{filme.sinopse}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  foto: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    objectFit: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  sinopse: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default DetalhesFilme;