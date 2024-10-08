import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";  // Import from React Navigation

const Listings = ({ listings: items, refresh, category }) => {
  const listRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();  // Initialize navigation

  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { item })} style={styles.listing}>
      <Image
        source={{ uri: item.medium_url }}
        style={styles.image}
      />
      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart-outline" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.listingDetails}>
        <Text style={styles.listingName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>
            {item.review_scores_rating / 20}
          </Text>
        </View>
      </View>
      <Text style={styles.roomType}>{item.room_type}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>€ {item.price}</Text>
        <Text style={styles.pricePerNight}>/ night</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  listing: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 50,
    padding: 8,
  },
  listingDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  listingName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#333",
  },
  roomType: {
    fontSize: 14,
    color: "#777",
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  pricePerNight: {
    fontSize: 14,
    color: "#777",
    marginLeft: 4,
  },
});

export default Listings;
