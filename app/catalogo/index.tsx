import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

type Filme = {
  id: number;
  nome: string;
  sinopse: string;
  foto: string;
};


export async function fetchFilmes(): Promise<Filme[]> {
  try {
    const response = await fetch('https://sujeitoprogramador.com/r-api/?api=filmes');

    if (!response.ok) {
      throw new Error('Falha ao carregar os filmes.');
    }

    const filmes = await response.json();
    console.log('Filmes carregados:', filmes);
    return filmes;
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
    Alert.alert('Erro', 'Não foi possível carregar os filmes. Tente novamente mais tarde.');
    return [];
  }
}

const Catalogo = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilmes = async () => {
      const filmesData = await fetchFilmes();
      setFilmes(filmesData);
      setLoading(false);
    };

    loadFilmes();
  }, []);

  const renderItem = ({ item }: { item: Filme }) => (
    <TouchableOpacity
      style={styles.filmeCard}
      onPress={() => {
        console.log('Navegando para detalhes do filme:', item.id);
        router.push(`/catalogo/${item.id}`); // ✅ Só o ID na rota
      }}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: item.foto }} style={styles.filmeImagem} />
        <View>
          <Text style={styles.filmeTitulo}>{item.nome}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <Text style={styles.titulo}>Bem-vindo ao Catálogo de Filmes!</Text>
          <FlatList
            data={filmes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4C9C',
    padding: 16,
  },
  filmeCard: {
    backgroundColor: '#9B69B6',
    padding: 14,
    marginBottom: 10,
    borderRadius: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filmeImagem: {
    width: 100,
    height: 150,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#9B69B6',
    resizeMode: 'cover',
  },
  filmeTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ECEFF1',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Catalogo;
