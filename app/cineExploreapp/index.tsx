import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';

import { buscarFilmes } from '@/api/tmdb';
import { useTheme } from '@/contexts/temas';

// Componente FilmeItem
const FilmeItem = ({ title, year, posterPath, onPress }: any) => {
  const { theme } = useTheme();
  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/w200/${posterPath}` : null;

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 12,
      backgroundColor: theme === 'dark' ? '#2e2e2e' : '#ffffff',
      marginVertical: 8,
      marginHorizontal: 15,
      shadowColor: theme === 'dark' ? '#000' : '#d1d1d1',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 6,
    },
    poster: {
      width: 60,
      height: 90,
      borderRadius: 8,
      marginRight: 15,
      backgroundColor: theme === 'dark' ? '#555' : '#eee',
    },
    infoContainer: {
      flex: 1,
    },
    titulo: {
      fontSize: 18,
      fontWeight: '600',
      color: theme === 'dark' ? '#fff' : '#333',
    },
    ano: {
      fontSize: 14,
      color: theme === 'dark' ? '#bbb' : '#666',
      marginTop: 4,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.poster} />
      ) : (
        <View style={styles.poster} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{title}</Text>
        <Text style={styles.ano}>{year}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function BuscaFilme() {
  const [titulo, setTitulo] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (!titulo) {
      setFilmes([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await buscarFilmes(titulo);
        setFilmes(data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [titulo]);

  const handleItemPress = (id: string) => {
    router.push(`/cineExploreapp/Detalhesfilme/${id}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#f0f0f5',
    },
    input: {
      height: 50,
      borderColor: theme === 'dark' ? '#444' : '#d1d1d6',
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 20,
      marginBottom: 20,
      marginTop: 15,
      fontSize: 16,
      color: theme === 'dark' ? '#fff' : '#333',
      backgroundColor: theme === 'dark' ? '#222' : '#fff',
      shadowColor: theme === 'dark' ? '#000' : '#d1d1d1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginHorizontal: 15,
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 18,
      fontWeight: '500',
      color: theme === 'dark' ? '#8e8e93' : '#666',
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#999'}
        value={titulo}
        onChangeText={setTitulo}
      />
      {loading ? (
        <ActivityIndicator size="large" color={theme === 'dark' ? '#fff' : '#0000ff'} />
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: { item: any }) => (
            <FilmeItem
              title={item.title}
              year={item.release_date?.substring(0, 4) || 'N/A'}
              posterPath={item.poster_path}
              onPress={() => handleItemPress(item.id.toString())}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum filme encontrado.</Text>}
        />
      )}
    </View>
  );
}