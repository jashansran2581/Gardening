import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Hook for navigation

const ExploreHeader = () => {
 
  const navigation = useNavigation(); // Initialize navigation

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate('CreateListing')} // Navigate to CreateListing
          >
            <Ionicons name="create" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: "-145%",
    marginTop: "6%"
  },
  container: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 10 },
    alignItems: 'flex-end',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
  },
});

export default ExploreHeader;