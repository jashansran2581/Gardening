import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SavedScreen = () => {
  const [savedListings, setSavedListings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Listen for real-time changes in saved listings
    const unsubscribe = onSnapshot(collection(db, 'savedListings'), (snapshot) => {
      const savedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedListings(savedData);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const unsaveListing = async (item) => {
    try {
      await deleteDoc(doc(db, 'savedListings', item.id));
    } catch (error) {
      console.error('Error unsaving listing:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Conditional Rendering: If there are no saved listings, show this message */}
      {savedListings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved listings yet</Text>
        </View>
      ) : (
        <ScrollView>
          {savedListings.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate('Details', { item })}
              style={styles.listing}
            >
              <Image source={{ uri: item.medium_url }} style={styles.image} />

              {/* Heart icon for unsaving */}
              <TouchableOpacity style={styles.heartIcon} onPress={() => unsaveListing(item)}>
                <Ionicons name="heart" size={24} color="red" />
              </TouchableOpacity>

              {/* Listing details */}
              <Text style={styles.listingName}>{item.name}</Text>
              <Text style={styles.roomType}>{item.room_type}</Text>
              <Text style={styles.price}>€ {item.price} / night</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: '12%', // Add marginTop of 4%
  },
  listing: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  listingName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  roomType: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 4,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#888',
  },
});

export default SavedScreen;
