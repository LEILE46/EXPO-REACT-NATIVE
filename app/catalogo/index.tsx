import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

// Definindo a interface de Filme
type Filme = {
  id: number;
  nome: string;
  sinopse: string;
  foto: string;
};

// Função para buscar filmes da API
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
      console.log('Filmes recebidos:', filmesData);
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
        router.push({ pathname: `/catalogo/${item.id}`, params: { filme: item } });
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
        <FlatList
          data={filmes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4C9C',  // Roxo Escuro
    padding: 16,
  },
  filmeCard: {
    backgroundColor: '#9B69B6',  // Roxo Claro (lavanda suave)
    padding: 16,
    marginBottom: 18,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#9B69B6',  // Sombra roxa suave
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  filmeCardHover: {
    transform: [{ scale: 1.05 }],
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
    borderColor: '#9B69B6',  // Bordas em roxo suave
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  filmeTitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ECEFF1',  // Texto claro, quase branco para bom contraste
    marginBottom: 8,
  },
  filmeDescricao: {
    fontSize: 14,
    color: '#BDC3C7',  // Descrição em cinza claro para não competir com o roxo
    lineHeight: 20,
  },
});

export default Catalogo;