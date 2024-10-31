import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Chip } from 'react-native-paper';
import Listings from '../components/Listings';
import { db } from '../firebase';

const GOOGLE_MAPS_API_KEY = "AIzaSyCEUcVpgXO8YU-AaNPSQdIu6Y6hiPvtgpU";
 
const tags = ['Water Access', 'Fences', 'Mulch', 'Road Access'];
 
const MapSearchScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyAddresses, setNearbyAddresses] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
 
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
 
  const fetchAddresses = async () => {
    if (!userLocation) return;
  
    try {
      const addressesRef = collection(db, 'listings');
      let q = query(addressesRef);

      // Apply multi-tag filtering with 'array-contains-any' only if tags are selected
      if (selectedTags.length > 0) {
        q = query(
          addressesRef,
          where('amenities', 'array-contains-any', selectedTags)
        );
      }

      const querySnapshot = await getDocs(q);
      const addresses = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();

        // Ensure each address includes all selected amenities
        const hasAllSelectedTags = selectedTags.every(tag =>
          data.amenities.includes(tag)
        );
        if (!hasAllSelectedTags) continue;

        const address = data.address;

        if (address) {
          const encodedAddress = encodeURIComponent(address);
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`
          );

          const result = await response.json();
          if (result.status === 'OK' && result.results.length > 0) {
            const location = result.results[0].geometry.location;
            addresses.push({
              id: doc.id,
              name: data.name || "Unknown Name",
              address,
              latitude: parseFloat(location.lat),
              longitude: parseFloat(location.lng),
              medium_url: data.medium_url || "",
              location: data.location || "",
              host_name: data.host_name || "",
              host_email: data.host_email || "",
              description: data.description || "",
              amenities: data.amenities || "",
              availability: data.availability || "",
              soil_type: data.soil_type || "",
              sunlight_exposure: data.sunlight_exposure || "",
              tools_included: data.tools_included || "",
              price: data.price || 0,
            });
          } else {
            console.warn(`Could not convert address "${address}" to coordinates.`);
          }
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
              pinColor='green'
              onPress={() => navigation.navigate('Details', { item: address })}
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
    backgroundColor: '#f2f5f0',
  },
  map: {
    height: 300,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    height: 45,
    borderColor: '#b0c4b1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 15,
    marginHorizontal: 10,
  },
  chip: {
    margin: 5,
    backgroundColor: '#e1f0e5',
    borderColor: '#7cb78c',
    borderWidth: 1,
  },
  selectedChip: {
    backgroundColor: '#7cb78c',
  },
  selectedChipText: {
    color: 'white',
  },
  list: {
    maxHeight: 220,
    marginHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 10,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  }
});

 
export default MapSearchScreen;
