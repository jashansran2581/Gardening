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

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BookingScreen = () => {
  return (
    <View>
      <Text>BookingScreen</Text>
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({})