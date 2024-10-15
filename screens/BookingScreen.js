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
    city: '',
    country: '',
    accommodates: '',
    bedrooms: '',
    beds: '',
    bathrooms: '',
    price: '',
    medium_url: '',
    host_name: '',
    host_picture_url: '',
    host_since: '',
    description: '',
    space: '',
    neighborhood_overview: '',
    amenities: [],
    review_scores_rating: '',
    number_of_reviews: '',
    room_type: '',
  });

  const [amenity, setAmenity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleAddAmenity = () => {
    if (amenity.trim()) {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
      setAmenity('');
    }
  };

  const handleFormSubmit = async () => {
    // Basic Validation
    if (!formData.name || !formData.city || !formData.country || !formData.price || !formData.description) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    setLoading(true); // Start loading
    try {
      await addDoc(collection(db, 'listings'), {
        ...formData,
        accommodates: parseInt(formData.accommodates),
        bedrooms: parseInt(formData.bedrooms),
        beds: parseInt(formData.beds),
        bathrooms: parseInt(formData.bathrooms),
        price: parseFloat(formData.price),
        review_scores_rating: parseFloat(formData.review_scores_rating),
        number_of_reviews: parseInt(formData.number_of_reviews),
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
            placeholder="City"
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={formData.country}
            onChangeText={(text) => setFormData({ ...formData, country: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Accommodates"
            keyboardType="numeric"
            value={formData.accommodates}
            onChangeText={(text) => setFormData({ ...formData, accommodates: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Bedrooms"
            keyboardType="numeric"
            value={formData.bedrooms}
            onChangeText={(text) => setFormData({ ...formData, bedrooms: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Beds"
            keyboardType="numeric"
            value={formData.beds}
            onChangeText={(text) => setFormData({ ...formData, beds: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Bathrooms"
            keyboardType="numeric"
            value={formData.bathrooms}
            onChangeText={(text) => setFormData({ ...formData, bathrooms: text })}
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
            placeholder="Image URL"
            value={formData.medium_url}
            onChangeText={(text) => setFormData({ ...formData, medium_url: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Host Name"
            value={formData.host_name}
            onChangeText={(text) => setFormData({ ...formData, host_name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Host Picture URL"
            value={formData.host_picture_url}
            onChangeText={(text) => setFormData({ ...formData, host_picture_url: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Host Since (YYYY-MM-DD)"
            value={formData.host_since}
            onChangeText={(text) => setFormData({ ...formData, host_since: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Space"
            value={formData.space}
            onChangeText={(text) => setFormData({ ...formData, space: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Neighborhood Overview"
            value={formData.neighborhood_overview}
            onChangeText={(text) => setFormData({ ...formData, neighborhood_overview: text })}
          />
          
          <View style={styles.amenitiesContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add Amenity"
              value={amenity}
              onChangeText={setAmenity}
            />
            <Pressable onPress={handleAddAmenity} style={styles.addButton}>
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>
          </View>
          
          <Text style={styles.amenitiesText}>Amenities: {formData.amenities.join(', ')}</Text>

          <TextInput
            style={styles.input}
            placeholder="Review Score (0-100)"
            keyboardType="numeric"
            value={formData.review_scores_rating}
            onChangeText={(text) => setFormData({ ...formData, review_scores_rating: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Reviews"
            keyboardType="numeric"
            value={formData.number_of_reviews}
            onChangeText={(text) => setFormData({ ...formData, number_of_reviews: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Room Type"
            value={formData.room_type}
            onChangeText={(text) => setFormData({ ...formData, room_type: text })}
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
  addButton: {
    backgroundColor: '#003580',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenitiesText: {
    fontSize: 14,
    marginVertical: 10,
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
