import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const DetailsScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: item.medium_url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.location}>Private room in Berlin, Germany</Text>
          <Text style={styles.guests}>1 guest • 1 bedroom • 1 bed • 1 bathroom</Text>
          <View style={styles.reviewsContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.reviewsText}>4.8 • 71 reviews</Text>
          </View>

          <View style={styles.hostContainer}>
            <Image source={{ uri: item.host_picture_url }} style={styles.host} />
            <View style={styles.hostInfo}>
              <Text style={styles.hostedBy}>Hosted by {item.host_name}</Text>
              <Text style={styles.hostDate}>Host since {item.host_start_date}</Text>
            </View>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Space:</Text>
            <Text style={styles.detailValue}>{item.space}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Neighborhood Overview:</Text>
            <Text style={styles.detailValue}>{item.neighborhood_overview}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Amenities:</Text>
            <Text style={styles.detailValue}>{item.amenities.join(", ")}</Text>
          </View>
        </View>
      </ScrollView>

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
    padding:10,
  },
  container: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  location: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },
  guests: {
    fontSize: 14,
    color: "#777",
  },
  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  reviewsText: {
    fontSize: 14,
    color: "#777",
    marginLeft: 5,
  },
  hostContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  hostInfo: {
    flexDirection: "column",
  },
  hostedBy: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  hostDate: {
    fontSize: 14,
    color: "#777",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  detailsContainer: {
    marginVertical: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailValue: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  reserveButton: {
    backgroundColor: "#FF385C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  reserveText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});