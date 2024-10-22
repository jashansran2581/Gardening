import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [savedListingsIds, setSavedListingsIds] = useState([]); // to store the IDs of saved listings
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch listings once
    const fetchListings = async () => {
      const unsubscribe = onSnapshot(collection(db, 'listings'), (querySnapshot) => {
        const listingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(listingsData);
      });

      return () => unsubscribe(); // Clean up the listener on unmount
    };

    fetchListings();

    // Listen for changes to saved listings
    const unsubscribeSaved = onSnapshot(collection(db, 'savedListings'), (snapshot) => {
      const savedIds = snapshot.docs.map((doc) => doc.id);
      setSavedListingsIds(savedIds); // Update the saved listing IDs
    });

    return () => unsubscribeSaved(); // Clean up the listener on unmount
  }, []);

  const toggleSaveListing = async (item) => {
    const isSaved = savedListingsIds.includes(item.id);
    try {
      if (isSaved) {
        await deleteDoc(doc(db, 'savedListings', item.id));
      } else {
        await setDoc(doc(db, 'savedListings', item.id), item);
      }
    } catch (error) {
      console.error('Error saving/unsaving listing:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {listings.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate('Details', { item })}
          style={styles.listing}
        >
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          
          {/* Heart icon */}
          <TouchableOpacity style={styles.heartIcon} onPress={() => toggleSaveListing(item)}>
            <Ionicons
              name={savedListingsIds.includes(item.id) ? "heart" : "heart-outline"}
              size={24}
              color={savedListingsIds.includes(item.id) ? "red" : "#000"}
            />
          </TouchableOpacity>
          
          {/* Listing details */}
          <View style={styles.listingDetails}>
            <Text style={styles.listingName}>{item.name}</Text>
            <Text style={styles.roomType}>{item.location}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>€{item.price}</Text>
            <Text style={styles.pricePerNight}>/ night</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  listing: {
    marginBottom: 24,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 4,
  },
  listingDetails: {
    marginTop: 8,
  },
  listingName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomType: {
    marginTop: 4,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pricePerNight: {
    fontSize: 14,
    color: "#666",
  },
});

export default Listings;
