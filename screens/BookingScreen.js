// import { StyleSheet, Text, View, Button } from 'react-native';
// import React from 'react';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import { db } from '../firebase'; // Firebase setup from the same instance

// // Define the addListing function that adds all fields from the provided JSON to Firestore
// const addListing = async () => {
//   try {
//     // Full data object with all the fields provided
//     const listingData = {
//       "id": "14864910",
//       "listing_url": "https://www.airbnb.com/rooms/14864910",
//       "scrape_id": "20170507222235",
//       "last_scraped": "2017-05-08",
//       "name": "Gro\u00dfz\u00fcgiges Altbauzimmer mit asiatischem Flair",
//       "summary": "Meine Unterkunft ist in der N\u00e4he der Crellestra\u00dfe. Du wirst meine Unterkunft lieben wegen der zentralen Lage, der Umgebung und der netten Nachbarschaft. Meine Unterkunft eignet sich f\u00fcr Paare, Alleinreisende Abenteurer und Gesch\u00e4ftsreisende.",
//       "space": null,
//       "description": "Meine Unterkunft ist in der N\u00e4he der Crellestra\u00dfe. Du wirst meine Unterkunft lieben wegen der zentralen Lage, der Umgebung und der netten Nachbarschaft. Meine Unterkunft eignet sich f\u00fcr Paare, Alleinreisende Abenteurer und Gesch\u00e4ftsreisende.",
//       "experiences_offered": "none",
//       "neighborhood_overview": null,
//       "notes": null,
//       "transit": null,
//       "access": null,
//       "interaction": null,
//       "house_rules": null,
//       "thumbnail_url": "https://a0.muscache.com/im/pictures/fb97f90e-db94-45c6-84ea-79d5de47cf5e.jpg?aki_policy=small",
//       "medium_url": "https://a0.muscache.com/im/pictures/fb97f90e-db94-45c6-84ea-79d5de47cf5e.jpg?aki_policy=medium",
//       "picture_url": {
//         "thumbnail": true,
//         "filename": "fb97f90e-db94-45c6-84ea-79d5de47cf5e.jpg",
//         "format": "JPEG",
//         "width": 639,
//         "mimetype": "image/jpeg",
//         "etag": "\"fb104accca8911f1f18309fc9953d76025e154df\"",
//         "id": "ea46661984946d302fe7ae0ecb1c8d00",
//         "last_synchronized": "2019-06-01T17:01:40.673236",
//         "color_summary": [
//           "rgba(158, 148, 158, 1.00)",
//           "rgba(145, 98, 110, 1.00)",
//           "rgba(132, 49, 61, 1.00)"
//         ],
//         "height": 426
//       },
//       "xl_picture_url": "https://a0.muscache.com/im/pictures/fb97f90e-db94-45c6-84ea-79d5de47cf5e.jpg?aki_policy=x_large",
//       "host_id": "35872079",
//       "host_url": "https://www.airbnb.com/users/show/35872079",
//       "host_name": "Monica",
//       "host_since": "2015-06-15",
//       "host_location": "Berlin, Berlin, Germany",
//       "host_about": null,
//       "host_response_time": "within an hour",
//       "host_response_rate": 100,
//       "host_acceptance_rate": null,
//       "host_thumbnail_url": "https://a0.muscache.com/im/pictures/b4854fa6-e25f-40a3-9864-36764903cf39.jpg?aki_policy=profile_small",
//       "host_picture_url": "https://a0.muscache.com/im/pictures/b4854fa6-e25f-40a3-9864-36764903cf39.jpg?aki_policy=profile_x_medium",
//       "host_neighbourhood": "Sch\u00f6neberg",
//       "host_listings_count": 1,
//       "host_total_listings_count": 1,
//       "host_verifications": ["email", "phone", "reviews", "jumio"],
//       "street": "Sch\u00f6neberg, Berlin, Berlin 10827, Germany",
//       "neighbourhood": "Sch\u00f6neberg",
//       "neighbourhood_cleansed": "Sch\u00f6neberg-S\u00fcd",
//       "neighbourhood_group_cleansed": "Tempelhof - Sch\u00f6neberg",
//       "city": "Berlin",
//       "state": "Berlin",
//       "zipcode": "10827",
//       "market": "Berlin",
//       "smart_location": "Berlin, Germany",
//       "country_code": "DE",
//       "country": "Germany",
//       "latitude": "52.48895019165655",
//       "longitude": "13.362449647584155",
//       "property_type": "Condominium",
//       "room_type": "Private room",
//       "accommodates": 2,
//       "bathrooms": 1.0,
//       "bedrooms": 1,
//       "beds": 1,
//       "bed_type": "Futon",
//       "amenities": [
//         "Wireless Internet",
//         "Kitchen",
//         "Heating",
//         "Washer",
//         "Smoke detector",
//         "Essentials",
//         "Hangers",
//         "Hair dryer",
//         "Iron",
//         "Laptop friendly workspace",
//         "translation missing: en.hosting_amenity_49",
//         "translation missing: en.hosting_amenity_50"
//       ],
//       "square_feet": null,
//       "price": 50,
//       "weekly_price": null,
//       "monthly_price": null,
//       "security_deposit": null,
//       "cleaning_fee": null,
//       "guests_included": 1,
//       "extra_people": 0,
//       "minimum_nights": 1,
//       "maximum_nights": 7,
//       "calendar_updated": "2 weeks ago",
//       "has_availability": null,
//       "availability_30": 18,
//       "availability_60": 48,
//       "availability_90": 78,
//       "availability_365": 346,
//       "calendar_last_scraped": "2017-05-08",
//       "number_of_reviews": 14,
//       "first_review": "2016-09-18",
//       "last_review": "2017-04-23",
//       "review_scores_rating": 100,
//       "review_scores_accuracy": 10,
//       "review_scores_cleanliness": 10,
//       "review_scores_checkin": 10,
//       "review_scores_communication": 10,
//       "review_scores_location": 10,
//       "review_scores_value": 10,
//       "license": null,
//       "jurisdiction_names": null,
//       "cancellation_policy": "flexible",
//       "calculated_host_listings_count": 1,
//       "reviews_per_month": 1.8,
//       "geolocation": { "lon": 13.362449647584155, "lat": 52.48895019165655 },
//       "features": [
//         "Host Is Superhost",
//         "Host Has Profile Pic",
//         "Host Identity Verified",
//         "Is Location Exact"
//       ]
//     };

//     // Add the document to the "listings" collection in Firestore using the listing id as the document id
//     await setDoc(doc(collection(db, 'listings'), listingData.id), listingData);

//     // Log success message
//     console.log("Listing added successfully!");
//   } catch (error) {
//     console.error("Error adding listing: ", error);
//   }
// };

// const BookingScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Booking Screen</Text>
      
//       {/* Button to trigger the addListing function */}
//       <Button title="Add Listing" onPress={addListing} />
//     </View>
//   );
// };

// export default BookingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ListingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    rating: '',
    price: '',
    amenities: '',
    host_name: '',
    host_contact: '',
    email: '',
    availability: '',
    category: '',
    accessibility: '',
    max_guests: '',
    min_booking_days: '',
    soil_type: '',
    water_source: '',
    sunlight_exposure: '',
    parking_availability: '',
    tools_included: '',
    medium_url: '',
  });

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleFormSubmit = async () => {
    // Basic Validation
    if (!formData.name || !formData.location || !formData.description || !formData.price) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    setLoading(true); // Start loading
    try {
      await addDoc(collection(db, 'listings'), {
        ...formData,
        rating: parseFloat(formData.rating),
        price: parseFloat(formData.price),
        max_guests: parseInt(formData.max_guests),
        min_booking_days: parseInt(formData.min_booking_days),
      });
      navigation.goBack();
    } catch (error) {
      console.log("Error adding listing:", error);
      Alert.alert("Error", "Failed to create listing. Please try again.");
    }
    setLoading(false); // End loading
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
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Rating (0-5)"
            keyboardType="numeric"
            value={formData.rating}
            onChangeText={(text) => setFormData({ ...formData, rating: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price (in EUR)"
            keyboardType="numeric"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Amenities"
            value={formData.amenities}
            onChangeText={(text) => setFormData({ ...formData, amenities: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Host Name"
            value={formData.host_name}
            onChangeText={(text) => setFormData({ ...formData, host_name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Host Contact"
            value={formData.host_contact}
            onChangeText={(text) => setFormData({ ...formData, host_contact: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Availability"
            value={formData.availability}
            onChangeText={(text) => setFormData({ ...formData, availability: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Accessibility"
            value={formData.accessibility}
            onChangeText={(text) => setFormData({ ...formData, accessibility: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Max Guests"
            keyboardType="numeric"
            value={formData.max_guests}
            onChangeText={(text) => setFormData({ ...formData, max_guests: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Min Booking Days"
            keyboardType="numeric"
            value={formData.min_booking_days}
            onChangeText={(text) => setFormData({ ...formData, min_booking_days: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Soil Type"
            value={formData.soil_type}
            onChangeText={(text) => setFormData({ ...formData, soil_type: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Water Source"
            value={formData.water_source}
            onChangeText={(text) => setFormData({ ...formData, water_source: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Sunlight Exposure"
            value={formData.sunlight_exposure}
            onChangeText={(text) => setFormData({ ...formData, sunlight_exposure: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Parking Availability"
            value={formData.parking_availability}
            onChangeText={(text) => setFormData({ ...formData, parking_availability: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Tools Included"
            value={formData.tools_included}
            onChangeText={(text) => setFormData({ ...formData, tools_included: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={formData.medium_url}
            onChangeText={(text) => setFormData({ ...formData, medium_url: text })}
          />

          <Pressable 
            onPress={handleFormSubmit} 
            style={styles.submitButton} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Listing</Text>
            )}
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
    maxWidth: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#003580',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const BookingScreen = () => {
//   return (
//     <View>
//       <Text>BookingScreen</Text>
//     </View>
//   )
// }

// export default BookingScreen

// const styles = StyleSheet.create({})


// import React, { useState } from 'react';
// import { View, Button, Image, Alert, Text } from 'react-native';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import necessary Firebase Storage methods
// import { launchImageLibrary } from 'react-native-image-picker';
// import { v4 as uuidv4 } from 'uuid';

// function FirebaseImageUpload() {
//   const [imgUri, setImgUri] = useState(null);  // For selected image URI
//   const [downloadUrl, setDownloadUrl] = useState(null); // For uploaded image URL
//   const [uploading, setUploading] = useState(false); // For showing upload progress
//   const [progress, setProgress] = useState(0); // Progress for upload

//   const handleClick = () => {
//     if (!imgUri) {
//       Alert.alert('No image selected');
//       return;
//     }

//     // Create a reference to Firebase storage with a unique filename
//     const storage = getStorage();
//     const imgRef = ref(storage, `files/${uuidv4()}`);

//     // Prepare the image as a blob
//     const uploadImage = async () => {
//       try {
//         const response = await fetch(imgUri);
//         const blob = await response.blob();

//         // Start the image upload task
//         const uploadTask = uploadBytesResumable(imgRef, blob);

//         setUploading(true); // Start upload state

//         // Track the upload progress
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             // Calculate and update progress
//             const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setProgress(progressValue);
//           },
//           (error) => {
//             Alert.alert('Upload failed', error.message);
//             setUploading(false);
//           },
//           async () => {
//             // On successful upload, get the download URL
//             const url = await getDownloadURL(uploadTask.snapshot.ref);
//             setDownloadUrl(url);
//             setUploading(false); // End upload state
//             Alert.alert('Upload successful');
//           }
//         );
//       } catch (error) {
//         Alert.alert('Upload failed', error.message);
//       }
//     };

//     uploadImage();
//   };

//   const selectImage = () => {
//     launchImageLibrary({ mediaType: 'photo' }, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else {
//         setImgUri(response.assets[0].uri); // Set the selected image URI
//       }
//     });
//   };

//   return (
//     <View style={{ padding: 20, marginTop: 20  }}>
//       <Button title="Select Image" onPress={selectImage} />

//       {imgUri && (
//         <Image
//           source={{ uri: imgUri }}
//           style={{ width: 200, height: 200, marginTop: 20 }}
//           resizeMode="contain"
//         />
//       )}

//       <Button title="Upload" onPress={handleClick} disabled={uploading} />

//       {uploading && (
//         <Text style={{ marginTop: 10 }}>Uploading... {progress.toFixed(2)}%</Text>
//       )}

//       {downloadUrl && (
//         <View style={{ marginTop: 20 }}>
//           <Text>Uploaded Image:</Text>
//           <Image
//             source={{ uri: downloadUrl }}
//             style={{ width: 200, height: 200 }}
//             resizeMode="contain"
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// export default FirebaseImageUpload;