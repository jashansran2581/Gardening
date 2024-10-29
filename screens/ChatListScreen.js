import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const ChatListScreen = ({ navigation }) => {
  const [chatList, setChatList] = useState([]);
  const currentUserEmail = auth.currentUser?.email;

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUserEmail)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Extract unique participants for chat list
      const uniqueChats = Array.from(
        new Map(chats.map((chat) => [chat.participants.join(','), chat]))
      ).map(([, chat]) => chat);
      setChatList(uniqueChats);
    });

    return unsubscribe;
  }, []);

  const openChat = (chat) => {
    navigation.navigate('Messages', {
      ownerEmail: chat.participants.find((email) => email !== currentUserEmail),
      listingName: chat.listingName,
    });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => openChat(item)}>
      <Text style={styles.chatName}>
        {item.participants.find((email) => email !== currentUserEmail)}
      </Text>
      <Text style={styles.chatPreview}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  list: { paddingBottom: 80 },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatName: { fontSize: 18, fontWeight: 'bold' },
  chatPreview: { color: '#666' },
});
