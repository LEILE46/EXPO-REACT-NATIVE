import React from "react";
import { Pressable, Text, StyleSheet, GestureResponderEvent } from "react-native";

type BotaoProps = {
  conteudo: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function Botao({ onPress, conteudo }: BotaoProps) {
  return (
    <Pressable style={estilos.botao} onPress={onPress}>
      <Text style={estilos.texto}>{conteudo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: "#4682B4",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal:8,
  },
  texto: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
