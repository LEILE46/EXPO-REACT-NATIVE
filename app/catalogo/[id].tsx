import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

type Filme = {
  id: number;
  nome: string;
  sinopse: string;
  foto: string;
};

const DetalhesFilme = () => {
  const { id } = useLocalSearchParams();
  const filmeId = typeof id === 'string' ? parseInt(id) : null;

  const [filme, setFilme] = useState<Filme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!filmeId) return;

    const fetchFilmes = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://sujeitoprogramador.com/r-api/?api=filmes');
        const filmesData: Filme[] = await response.json();

        const filmeEncontrado = filmesData.find((f) => f.id === filmeId);
        setFilme(filmeEncontrado || null);
      } catch (error) {
        console.error('Erro ao carregar detalhes do filme:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do filme.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilmes();
  }, [filmeId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!filme) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.erroTexto}>Filme não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: filme.foto }} style={styles.foto} resizeMode="cover" />
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
    backgroundColor: '#6A4C9C',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#6A4C9C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  erroTexto: {
    fontSize: 18,
    color: '#fff',
  },
  foto: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  sinopse: {
    fontSize: 16,
    color: '#f5f5f5',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default DetalhesFilme;
