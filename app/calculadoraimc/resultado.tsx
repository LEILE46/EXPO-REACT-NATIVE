import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ResultScreen = () => {
  const { imc } = useLocalSearchParams();  // Obtemos o IMC da navegação
  const router = useRouter();

  const imcNumber = parseFloat(imc as string); // Converte para número
  let classificacao = '';
  let cor = '';

  if (imcNumber < 18.5) {
    classificacao = 'Abaixo do peso';
    cor = '#3498db'; 
  } else if (imcNumber >= 18.5 && imcNumber <= 24.9) {
    classificacao = 'Peso Normal';
    cor = '#2ecc71'; // Verde
  } else if (imcNumber >= 25.0 && imcNumber <= 29.9) {
    classificacao = 'Sobrepeso';
    cor = '#f1c40f'; 
  } else if (imcNumber >= 30.0) {
    classificacao = 'Obesidade';
    cor = '#e74c3c'; 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultTitle}>Resultado do IMC</Text>
      <Text style={[styles.resultValue, { color: cor }]}>
        {imcNumber.toFixed(2)} {/* Exibindo IMC com 2 casas decimais */}
      </Text>
      <Text style={[styles.classificacao, { color: cor }]}>{classificacao}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Calcular Novamente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  classificacao: {
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ResultScreen;