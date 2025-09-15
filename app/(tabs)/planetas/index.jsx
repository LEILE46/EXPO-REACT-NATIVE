import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function Planetas() {
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPlanetas() {
      const resposta = await fetch('https://rickandmortyapi.com/api/location');
      const dados = await resposta.json();
      setPlanetas(dados.results);
      setLoading(false);
    }
    carregarPlanetas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a5acd" />
        <Text style={styles.loadingText}>Carregando planetas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌌 Lista de Planetas</Text>
      <FlatList
        data={planetas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.planetaContainer}>
            <Text style={styles.planetaName}>{item.name}</Text>
            <Text style={styles.planetaType}>Tipo: {item.type || 'Desconhecido'}</Text>
            <Text style={styles.planetaStatus}>Dimensão: {item.dimension || 'Desconhecida'}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#efe6ff', // Roxo bem claro
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4b0082', // Roxo forte
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efe6ff',
  },
  loadingText: {
    fontSize: 18,
    color: '#6a5acd',
    marginTop: 10,
  },
  planetaContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  planetaName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4b0082',
    marginBottom: 6,
  },
  planetaType: {
    fontSize: 16,
    color: '#6a5acd',
    marginBottom: 4,
  },
  planetaStatus: {
    fontSize: 15,
    color: '#555',
  },
});
