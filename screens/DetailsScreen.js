import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { collection, addDoc, query, where, getDocs, Timestamp, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const DetailsScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const currentUserEmail = auth.currentUser?.email;

  // Helper function to generate unique chat ID based on participants
  const generateChatId = (email1, email2) => [email1, email2].sort().join(':');

  // Function to check if a chat already exists
  const checkExistingChat = async (chatId) => {
    const chatQuery = query(
      collection(db, 'messages'),
      where('__name__', '==', chatId)
    );
    const chatSnapshot = await getDocs(chatQuery);
    return !chatSnapshot.empty;
  };

  const handleMessageOwner = async () => {
    const chatId = generateChatId(currentUserEmail, item.host_email);
    const initialMessage = {
      participants: [currentUserEmail, item.host_email],
      listingName: item.name,
      message: 'Hello! I’m interested in your listing.',
      sender: currentUserEmail,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      const chatExists = await checkExistingChat(chatId);

      if (!chatExists) {
        // Create a new chat document with a unique ID
        await setDoc(doc(db, 'messages', chatId), initialMessage);
      }

      // Navigate to the Messages screen
      navigation.navigate('Messages', {
        ownerEmail: item.host_email,
        listingName: item.name,
      });
    } catch (error) {
      console.error('Error sending message: ', error);
      Alert.alert('Error', 'Unable to send message. Please try again later.');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        {/* Main image */}
        <Image source={{ uri: item.medium_url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.location}>Field Available in {item.location}</Text>

          {/* Host info */}
          <View style={styles.hostContainer}>
            <View style={styles.hostInfo}>
              <Text style={styles.hostedBy}>Hosted by {item.host_name}</Text>
              <Text style={styles.hostContact}>
                Contact: {item.host_email}
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{item.description}</Text>

          {/* Additional details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Amenities:</Text>
            <Text style={styles.detailValue}>{item.amenities}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Availability:</Text>
            <Text style={styles.detailValue}>{item.availability}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Soil Type:</Text>
            <Text style={styles.detailValue}>{item.soil_type}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Sunlight Exposure:</Text>
            <Text style={styles.detailValue}>{item.sunlight_exposure}</Text>
          </View>

          <View style={[styles.detailsContainer, { marginBottom: 30 }]}>
            <Text style={styles.detailLabel}>Tools Included:</Text>
            <Text style={styles.detailValue}>{item.tools_included}</Text>
          </View>

          <TouchableOpacity style={styles.messageButton} onPress={handleMessageOwner}>
            <Ionicons name="chatbubble-outline" size={20} color="white" />
            <Text style={styles.messageButtonText}>Message Owner</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer with price and Reserve button */}
      <View style={styles.footer}>
        <Text style={styles.price}>€{item.price} / night</Text>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    marginTop: 8,
    color: '#666',
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  hostedBy: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hostContact: {
    color: '#666',
  },
  description: {
    marginTop: 16,
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reserveButton: {
    backgroundColor: '#ff5a5f',
    borderRadius: 8,
    padding: 12,
  },
  reserveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageButton: {
    backgroundColor: '#003580',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
  },
  messageButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});