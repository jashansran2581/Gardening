import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
<<<<<<< Updated upstream
  View,
  TextInput,
=======
>>>>>>> Stashed changes
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const ExploreHeader = () => {
<<<<<<< Updated upstream
 
  const navigation = useNavigation(); // Initialize navigation
=======
  const navigation = useNavigation();
>>>>>>> Stashed changes

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <TouchableOpacity
<<<<<<< Updated upstream
            style={styles.filterBtn}
            onPress={() => navigation.navigate('CreateListing')} // Navigate to CreateListing
=======
            style={styles.iconBtn}
            onPress={() => navigation.navigate("ChatList")}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>

          {/* Create Listing Icon */}
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate("CreateListing")}
>>>>>>> Stashed changes
          >
            <Ionicons name="create" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
<<<<<<< Updated upstream
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: "-145%",
    marginTop: "6%"
=======
    backgroundColor: "#F0F4F8",
    paddingTop: 16,
>>>>>>> Stashed changes
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
<<<<<<< Updated upstream
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
=======
  iconBtn: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 3 },
    alignItems: "center",
    justifyContent: "center",
>>>>>>> Stashed changes
  },
});

export default ExploreHeader;