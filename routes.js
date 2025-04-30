// routes.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

// Importa as suas 4 telas — nenhuma delas deve ter código de navegação!
import ReceitasScreen from './App';          // seu App.tsx original (tela de “culinária”)
import LivroScreen   from './App_Livro';     // App_Livro.tsx
import SerieScreen   from './App_Serie';     // App_Serie.tsx
import MusicaScreen  from './App_Musica';    // App_Musica.tsx

const Stack = createNativeStackNavigator();

// Tela de Menu inicial, com botões para todas as outras telas
function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
      <Button title="Receitas"    onPress={() => navigation.navigate('Receitas')} />
      <Button title="Livros"      onPress={() => navigation.navigate('Livros')} />
      <Button title="Séries"      onPress={() => navigation.navigate('Séries')} />
      <Button title="Músicas"     onPress={() => navigation.navigate('Músicas')} />
    </View>
  );
}

export default function RotaInterna() {
  return (
    <Stack.Navigator
      initialRouteName="Menu"    // garante que o Menu seja a primeira tela
      screenOptions={{
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen name="Menu"      component={Menu}          options={{ headerShown: false }} />
      <Stack.Screen name="Receitas" component={ReceitasScreen} options={{ title: 'Culinária' }} />
      <Stack.Screen name="Livros"    component={LivroScreen}    options={{ title: 'Livros' }} />
      <Stack.Screen name="Séries"    component={SerieScreen}    options={{ title: 'Séries' }} />
      <Stack.Screen name="Músicas"   component={MusicaScreen}   options={{ title: 'Músicas' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f1f1f1',
    gap: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
