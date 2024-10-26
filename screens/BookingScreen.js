import * as Location from 'expo-location';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Chip } from 'react-native-paper';
import Listings from '../components/Listings';
import { db } from '../firebase';

const GOOGLE_MAPS_API_KEY = "AIzaSyCEUcVpgXO8YU-AaNPSQdIu6Y6hiPvtgpU";


const tags = ['Water Access', 'Fenced', 'Mulch', 'Road Access'];

const MapSearchScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyAddresses, setNearbyAddresses] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const fetchAddresses = async () => {
    if (!userLocation) return;

    try {
      const addressesRef = collection(db, 'addresses');
      let q = query(addressesRef);

      if (selectedTags.length > 0) {
        q = query(addressesRef, where('tags', 'array-contains-any', selectedTags));
      }

      const querySnapshot = await getDocs(q);
      const addresses = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const address = data.addresses; // Assuming 'address' field contains the full address

        // Convert address to latitude and longitude using Google Geocoding API
        const encodedAddress = encodeURIComponent(addresses);
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`
        );

        const result = await response.json();
        if (result.status === 'OK' && result.results.length > 0) {
          const location = result.results[0].geometry.location;
          addresses.push({
            id: doc.id,
            name: data.name || "Unknown Name", // Use the name field if it exists
            addresses,
            latitude: location.lat,
            longitude: location.lng,
          });
        } else {
          console.warn(`Could not convert address "${addresses}" to coordinates.`);
        }
      }

      setNearbyAddresses(addresses);
    } catch (error) {
      console.error("Error fetching and geocoding addresses: ", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userLocation, selectedTags]);

  const searchAddress = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Error", "Please enter an address to search");
      return;
    }

    try {
      const encodedAddress = encodeURIComponent(searchQuery);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const newLocation = { latitude: lat, longitude: lng };

        setUserLocation(newLocation);

        mapRef.current?.animateToRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);

        await fetchAddresses();
      } else {
        Alert.alert("Error", "Could not find the specified address");
      }
    } catch (error) {
      console.error("Error in geocoding:", error);
      Alert.alert("Error", "An error occurred while searching for the address");
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation ? {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : {
          latitude: 51.0447,
          longitude: -114.0719,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You are here"
            pinColor='blue'
          />
        )}
        {nearbyAddresses.map((address) => (
          address.latitude && address.longitude && (
            <Marker
              key={address.id}
              coordinate={{ latitude: address.latitude, longitude: address.longitude }}
              title={address.name}
              pinColor='red'
            />
          )
        ))}
      </MapView>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an address"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchAddress}
        />
      </View>
      <View style={styles.tagContainer}>
        {tags.map(tag => (
          <Chip
            key={tag}
            selected={selectedTags.includes(tag)}
            onPress={() => toggleTag(tag)}
            style={[styles.chip, selectedTags.includes(tag) && styles.selectedChip]}
            textStyle={selectedTags.includes(tag) ? styles.selectedChipText : null}
          >
            {tag}
          </Chip>
        ))}
      </View>
      <Listings />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    height: 250,
    width: '100%',
    marginBottom: 10,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  chip: {
    margin: 5,
  },
  selectedChip: {
    backgroundColor: 'green',
  },
  selectedChipText: {
    color: 'white',
  },
  list: {
    maxHeight: 200,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MapSearchScreen;
