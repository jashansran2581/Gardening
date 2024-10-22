import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        {/* Main image */}
        <Image source={{ uri: item.medium_url }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.location}>Private room in {item.location}</Text>
          <Text style={styles.guests}>
            {item.max_guests} guest{item.max_guests > 1 ? 's' : ''} • Minimum stay: {item.min_booking_days} days
          </Text>

          {/* Reviews */}
          <View style={styles.reviewsContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.reviewsText}>
              {item.rating} • {item.number_of_reviews} reviews
            </Text>
          </View>

          {/* Host info */}
          <View style={styles.hostContainer}>
            <View style={styles.hostInfo}>
              <Text style={styles.hostedBy}>Hosted by {item.host_name}</Text>
              <Text style={styles.hostContact}>Contact: {item.host_contact}</Text>
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
            <Text style={styles.detailLabel}>Accessibility:</Text>
            <Text style={styles.detailValue}>{item.accessibility}</Text>
          </View>
          
          {/* Other details can be added similarly */}
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
  guests: {
    marginTop: 8,
    color: '#666',
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  reviewsText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  hostInfo: {
    marginLeft: 16,
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
});
