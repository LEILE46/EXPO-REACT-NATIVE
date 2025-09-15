import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const router = useRouter();

  const handleCalcular = () => {
    // Validação de entrada
    const pesoNum = Number(peso);
    let alturaNum = Number(altura);

    console.log('Peso:', peso);
    console.log('Altura:', altura);
    console.log('Peso como número:', pesoNum);
    console.log('Altura como número:', alturaNum);

    if (!peso || !altura || isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert('Erro', 'Por favor, insira valores válidos para peso e altura.');
      return;
    }

    // Se altura for dada em centímetros, converte para metros
    if (alturaNum > 10) { // Mais de 10 indica que provavelmente está em centímetros
      alturaNum = alturaNum / 100; // Convertendo de cm para metros
    }

    // Verificação após conversão
    console.log('Altura em metros:', alturaNum);

    // Cálculo do IMC
    const imc = pesoNum / (alturaNum * alturaNum);

    console.log('IMC calculado:', imc);

    // Navega para a tela de resultado passando o IMC com "params"
    router.push({
      pathname: './resultado',
      params: { imc }, // Passa o IMC como parâmetro diretamente
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC - Aproveite+</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Altura (m ou cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleCalcular}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;