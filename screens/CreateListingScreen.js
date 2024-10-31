import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, SafeAreaView, Alert, ActivityIndicator, Image } from 'react-native';
import { db, storage, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Crypto from 'expo-crypto';
import { useNavigation } from '@react-navigation/native';

const ListingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    description: '',
    price: '',
    amenities: [],  // amenities as an array
    host_name: '',
    host_email: '',
    availability: '',
    soil_type: '',
    sunlight_exposure: '',
    tools_included: '',
    medium_url: '',
  });
  const [newAmenity, setNewAmenity] = useState('');
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Get the current user's email and set it as host_email
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setFormData((prev) => ({ ...prev, host_email: user.email }));
    }
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No image selected');
      return null;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const uniqueId = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, new Date().toString());
      const imgRef = ref(storage, `GardenImages/${uniqueId}`);
      const uploadTask = uploadBytesResumable(imgRef, blob);

      setUploading(true);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            Alert.alert('Upload failed', error.message);
            setUploading(false);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      Alert.alert('Upload failed', error.message);
      return null;
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity(''); // Clear the input
    }
  };

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.location || !formData.address || !formData.description || !formData.price) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const listingData = {
        ...formData,
        price: parseFloat(formData.price),
        medium_url: imageUrl || formData.medium_url,
      };

      await addDoc(collection(db, 'listings'), listingData);
      navigation.goBack();
    } catch (error) {
      console.log('Error adding listing:', error);
      Alert.alert('Error', 'Failed to create listing. Please try again.');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create a Listing</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price: "
            keyboardType="numeric"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
          />

          {/* Amenities Section */}
          <View style={styles.amenitiesContainer}>
            <Text style={styles.inputLabel}>Amenities</Text>
            <View style={styles.amenityInputContainer}>
              <TextInput
                style={styles.amenityInput}
                placeholder="Enter an amenity"
                value={newAmenity}
                onChangeText={setNewAmenity}
              />
              <Pressable onPress={addAmenity} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>

            <View style={styles.amenitiesList}>
              {formData.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityChip}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                  <Pressable onPress={() => removeAmenity(index)} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>x</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Host Name"
            value={formData.host_name}
            onChangeText={(text) => setFormData({ ...formData, host_name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Host Email"
            value={formData.host_email}
            editable={false} // Make this field read-only
          />
          <TextInput
            style={styles.input}
            placeholder="Availability"
            value={formData.availability}
            onChangeText={(text) => setFormData({ ...formData, availability: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Soil Type"
            value={formData.soil_type}
            onChangeText={(text) => setFormData({ ...formData, soil_type: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Sunlight Exposure"
            value={formData.sunlight_exposure}
            onChangeText={(text) => setFormData({ ...formData, sunlight_exposure: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Tools Included"
            value={formData.tools_included}
            onChangeText={(text) => setFormData({ ...formData, tools_included: text })}
          />

          <Pressable onPress={pickImage} style={styles.uploadButton}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </Pressable>
          {image && <Image source={{ uri: image }} style={styles.previewImage} />}
          {uploading && <Text>Uploading... {Math.round(uploadProgress)}%</Text>}

          <Pressable onPress={handleFormSubmit} style={styles.submitButton} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Listing</Text>}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  amenitiesContainer: {
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  amenityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
  },
  removeButton: {
    marginLeft: 5,
  },
  removeButtonText: {
    fontSize: 14,
    color: '#FF0000',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
