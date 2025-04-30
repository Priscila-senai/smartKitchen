// App.js
import 'react-native-gesture-handler'; // necessário para o React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Importe suas telas
import ReceitasScreen from './App';       // Tela de receitas (App.tsx original)
import LivroScreen    from './App_Livro';
import SerieScreen    from './App_Serie';
import MusicaScreen   from './App_Musica';

const Stack = createNativeStackNavigator();

// Tela de menu principal com botões customizados
function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MENU</Text>

      <TouchableOpacity 
        style={styles.customButton} 
        onPress={() => navigation.navigate('Receitas')}
      >
        <Text style={styles.buttonText}>Culinária</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.customButton} 
        onPress={() => navigation.navigate('Livros')}
      >
        <Text style={styles.buttonText}>Livros</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.customButton} 
        onPress={() => navigation.navigate('Séries')}
      >
        <Text style={styles.buttonText}>Séries</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.customButton} 
        onPress={() => navigation.navigate('Músicas')}
      >
        <Text style={styles.buttonText}>Músicas</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen 
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Receitas"
          component={ReceitasScreen}
          options={{ title: 'Culinária' }}
        />
        <Stack.Screen 
          name="Livros"
          component={LivroScreen}
          options={{ title: 'Livros' }}
        />
        <Stack.Screen 
          name="Séries"
          component={SerieScreen}
          options={{ title: 'Séries' }}
        />
        <Stack.Screen 
          name="Músicas"
          component={MusicaScreen}
          options={{ title: 'Músicas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#587638', // Cor de fundo do menu principal
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
  },
  customButton: {
    backgroundColor: '#fbffcd', // Cor do botão (azul)
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#192a17', // Cor do texto
    fontSize: 20,
    fontWeight: 'bold',
  },
});
