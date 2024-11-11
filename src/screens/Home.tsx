import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export const Home: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  return (
    <View style={style.container}>
      <Text style={style.title}>Bem-vindo ao App!</Text>
      <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Contacts")}>
        <Text style={style.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4fcff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
  },
  button: {
    backgroundColor: '#2d74da',
    paddingVertical: 10,
    borderRadius: 35,
    alignItems: 'center',
    width: '40%',
  },
  });