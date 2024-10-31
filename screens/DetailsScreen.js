import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const DetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        {/* Main image */}
        <Image source={{ uri: item.medium_url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.location}>Field Abailable in {item.location}</Text>

          {/* Host info */}
          <View style={styles.hostContainer}>
            <View style={styles.hostInfo}>
              <Text style={styles.hostedBy}>Hosted by {item.host_name}</Text>
              <Text style={styles.hostContact}>Contact: {item.host_contact}</Text>
            <Text style={styles.hostContact}>{item.email}</Text>
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
            <Text style={styles.detailLabel}>soil type:</Text>
            <Text style={styles.detailValue}>{item.soil_type}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>sunlight exposure:</Text>
            <Text style={styles.detailValue}>{item.sunlight_exposure}</Text>
          </View>
          <View  style={[styles.detailsContainer, { marginBottom: 30 }]}>
            <Text style={styles.detailLabel}>tools included:</Text>
            <Text style={styles.detailValue}>{item.tools_included}</Text>
          </View>
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


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoContainer: {
    marginTop: 16,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#2D572C",
  },
  location: {
    fontSize: 18,
    color: "#6B8E23",
    marginVertical: 8,
  },
  address: {
    color: "#1E90FF",
    textDecorationLine: "underline",
    fontSize: 16,
    marginVertical: 8,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  hostedBy: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5320",
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    color: "#333333",
    lineHeight: 22,
  },
  detailsContainer: {
    marginVertical: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5320",
  },
  detailValue: {
    fontSize: 15,
    color: "#555555",
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D572C",
  },
  reserveButton: {
    backgroundColor: "#6B8E23",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  reserveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageButton: {
    backgroundColor: "#2D572C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  messageButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 8,
  },
});


export default DetailsScreen;