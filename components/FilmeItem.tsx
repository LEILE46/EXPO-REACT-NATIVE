import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/temas'; 

interface Props {
  title: string;
  year: string;
  onPress: () => void;
}

export default function FilmeItem({ title, year, onPress }: Props) {
  // CORREÇÃO: Use o hook do tema global
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const styles = StyleSheet.create({
    item: {
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: isDark ? '#2c2c2e' : '#fff',
      shadowColor: isDark ? '#000' : '#d1d1d1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    titulo: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#fff' : '#333',
    },
    ano: {
      fontSize: 14,
      fontWeight: '400',
      color: isDark ? '#bbb' : '#666',
      marginTop: 4,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.titulo}>{title}</Text>
      <Text style={styles.ano}>{year}</Text>
    </TouchableOpacity>
  );
}