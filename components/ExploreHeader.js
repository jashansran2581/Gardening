import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExploreHeader = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Navigation Buttons Row */}
        <View style={styles.navigationRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home-outline" size={24} color="#003580" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Saved')}>
            <Ionicons name="heart-outline" size={24} color="#003580" />
            <Text style={styles.navText}>Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Map/Search')}>
            <Ionicons name="map-outline" size={24} color="#003580" />
            <Text style={styles.navText}>Map</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={24} color="#003580" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  container: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E2E2E2',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ExploreHeader;
