import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useWebSocket } from './useWebSocket';

const host = Platform.select({android: '10.0.2.2', default: 'localhost'});
const url = `ws://${host}:3000`;

export default function App() {
  const send = useWebSocket({url, onMessageReceived});
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessageText, setNewMessageText] = useState('');

  function onMessageReceived(newMessage: string) {
    setMessages([...messages, newMessage]);
  }

  function handleSend() {
    send(newMessageText);
    setNewMessageText('')
  }

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TextInput
            value={newMessageText}
            onChangeText={setNewMessageText}
            onSubmitEditing={handleSend}
            placeholder="Enter message and press return"
            style={styles.textInput}
          />
          {messages.map((message, index) => (
            <Text key={index}>{message}</Text>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: Platform.select({android: 50, default: 10}),
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
});
