import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { buscarDetalhes } from '@/api/tmdb';
import { useTheme } from '@/contexts/temas';


export default function DetalhesFilme() {
  const { id } = useLocalSearchParams();
  const [filme, setFilme] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Define as cores com base no tema para uma melhor leitura
  const colors = {
    background: theme === 'dark' ? '#1c1c1c' : '#f0f0f5',
    text: theme === 'dark' ? '#f0f0f0' : '#333333',
    subText: theme === 'dark' ? '#aaaaaa' : '#666666',
    accent: theme === 'dark' ? '#4a90e2' : '#3498db',
    error: 'red',
  };

  useEffect(() => {
    async function carregar() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await buscarDetalhes(id as string);
        setFilme(data);
      } catch (error) {
        console.error('Erro ao carregar detalhes do filme:', error);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    errorText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 18,
      color: colors.error,
    },
    poster: {
      width: '100%',
      height: 400,
      marginBottom: 20,
      resizeMode: 'contain',
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      color: colors.text,
    },
    subTitulo: {
      fontSize: 18,
      color: colors.subText,
      marginBottom: 8,
    },
    classificacao: {
      fontSize: 18,
      marginBottom: 12,
      color: colors.accent,
      fontWeight: 'bold',
    },
    sinopse: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!filme) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Filme não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {filme.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${filme.poster_path}` }}
          style={styles.poster}
        />
      )}
      <Text style={styles.titulo}>{filme.title}</Text>
      <Text style={styles.subTitulo}>{filme.release_date?.substring(0, 4) || 'Ano não disponível'}</Text>
      <Text style={styles.classificacao}>Classificação: {filme.vote_average?.toFixed(1) || 'N/A'}</Text>
      <Text style={styles.sinopse}>{filme.overview || 'Sinopse não disponível.'}</Text>
    </ScrollView>
  );
}