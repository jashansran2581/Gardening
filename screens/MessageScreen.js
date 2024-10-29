import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

const MessagesScreen = ({ route }) => {
  const { ownerEmail, listingName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const currentUserEmail = auth.currentUser?.email;

  const messagesRef = collection(db, 'messages');

  // Fetch messages in real-time
  useEffect(() => {
    const sortedParticipants = [currentUserEmail, ownerEmail].sort();
    const q = query(
      messagesRef,
      where('participants', '==', sortedParticipants.join(':')),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const messageData = {
      participants: [currentUserEmail, ownerEmail].sort().join(':'),
      listingName,
      sender: currentUserEmail,
      message: message || 'No message provided',  // Handle empty input
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      await addDoc(messagesRef, messageData);
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.sender === currentUserEmail ? styles.userMessage : styles.ownerMessage}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  messagesList: { paddingBottom: 80 },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#003580',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  ownerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageText: { color: 'white' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  sendButton: { marginLeft: 8 },
  sendButtonText: { color: '#003580', fontWeight: 'bold' },
});
