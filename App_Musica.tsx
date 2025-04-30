// Importação dos componentes e bibliotecas necessárias
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Ajuste para altura da StatusBar
const alturaStatusBar = StatusBar.currentHeight;

// Chave da API do Google Gemini
const KEY_GEMINI = 'AIzaSyBbOAPaDDtrYUXVFpfSARXHJEyujjyQeVk'; // Substitua pela sua chave de API

// Instância do Gemini AI
const genAI = new GoogleGenerativeAI(KEY_GEMINI);

// Configuração do modelo a ser usado
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Configurações da geração de resposta
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

export default function App() {

  // Definição dos estados
  const [load, setLoad] = useState(false); // Estado de carregamento
  const [musica, setMusica] = useState(""); // Resultado da musica gerada

  // Estados dos ingredientes e ocasião
  const [ingr1, setIngr1] = useState("");
  const [ingr2, setIngr2] = useState("");
  const [ingr3, setIngr3] = useState("");
  const [ingr4, setIngr4] = useState("");
  const [ocasiao, setOcasiao] = useState("");

  // Função para gerar a musica
  async function gerarMusica() {
    if (ingr1 === "" || ingr2 === "" || ingr3 === "" || ingr4 === "" || ocasiao === "") {
      // Alerta caso algum ingrediente ou ocasião esteja vazio
      Alert.alert("Atenção", "Preencha tudo!", [{ text: "Beleza!" }]);
      return;
    }
    setMusica("");
    setLoad(true);
    Keyboard.dismiss(); // Fecha o teclado

    // Prompt que será enviado para o Gemini
    const prompt = `Sugira uma música para ${ocasiao} usando as seguintes ecolhas: ${ingr1}, ${ingr2}, ${ingr3} e ${ingr4} e pesquise uma música no youtube. Caso encontre, informe o link.`;

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      setMusica(result.response.text()); // Atualiza o estado com a resposta
    } catch (error) {
      console.error(error); // Em caso de erro, exibe no console
    } finally {
      setLoad(false); // Finaliza o carregamento
    }
  }

  return (
    <View style={ESTILOS.container}>
      {/* StatusBar */}
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />

      {/* Título do app */}
      <Text style={ESTILOS.header}>A MELHOR MÚSICA</Text>

      {/* Formulário de ingredientes */}
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Insira uma resposta abaixo:</Text>
        <TextInput
          placeholder="Qual estilo você quer ouvir?"
          style={ESTILOS.input}
          value={ingr1}
          onChangeText={(texto) => setIngr1(texto)}
        />
        <TextInput
          placeholder="Música animada ou mais tranquila?"
          style={ESTILOS.input}
          value={ingr2}
          onChangeText={(texto) => setIngr2(texto)}
        />
        <TextInput
          placeholder="Preferência por lançamento ou clássico?"
          style={ESTILOS.input}
          value={ingr3}
          onChangeText={(texto) => setIngr3(texto)}
        />
        <TextInput
          placeholder="Que sentimento você quer sentir?"
          style={ESTILOS.input}
          value={ingr4}
          onChangeText={(texto) => setIngr4(texto)}
        />
        <TextInput
          placeholder="Descobrir ou Relembrar"
          style={ESTILOS.input}
          value={ocasiao}
          onChangeText={(texto) => setOcasiao(texto)}
        />
      </View>

      {/* Botão para gerar música */}
      <TouchableOpacity style={ESTILOS.button} onPress={gerarMusica}>
        <Text style={ESTILOS.buttonText}>Gerar música</Text>
        <MaterialCommunityIcons name="headset" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Área de exibição da resposta ou do loading */}
      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false}>
        
        {/* Se estiver carregando, mostra indicador */}
        {load && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Produzindo uma recomendação...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {/* Se tiver musica, mostra o conteúdo */}
        {musica && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Sua música👇</Text>
            <Text style={{ lineHeight: 24 }}>{musica}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Estilos da aplicação
const ESTILOS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbffcd',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#587638',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  }
});
