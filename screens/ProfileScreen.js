import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    dob: '',
    email: '',
    phone: '',
  });
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const userDocRef = doc(db, "users", uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        navigation.replace("Login");
      })
      .catch(error => console.log("Error signing out: ", error));
  };

  const handleEditSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);

        // Update the user's profile data in Firestore
        await updateDoc(userDocRef, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          bio: userData.bio,
          dob: userData.dob,
          phone: userData.phone, // Include phone in the update
        });

        setIsEditable(false); // Disable editing mode after saving
      } catch (error) {
        console.log("Error updating user data:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {userData ? (
            <>
              <Text style={styles.title}>Profile</Text>

              {/* First Name Label and Input */}
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={userData.firstName}
                onChangeText={(text) => setUserData({ ...userData, firstName: text })}
                placeholder="First Name"
                editable={isEditable}
              />

              {/* Last Name Label and Input */}
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={userData.lastName}
                onChangeText={(text) => setUserData({ ...userData, lastName: text })}
                placeholder="Last Name"
                editable={isEditable}
              />


              {/* Date of Birth Label and Input */}
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                value={userData.dob}
                onChangeText={(text) => setUserData({ ...userData, dob: text })}
                placeholder="Date of Birth (YYYY-MM-DD)"
                editable={isEditable}
              />

              {/* Phone Label and Input */}
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={userData.phone}
                onChangeText={(text) => setUserData({ ...userData, phone: text })}
                placeholder="Phone Number"
                editable={isEditable} // Make phone editable
              />
              {/* Bio Label and Input */}
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={styles.input}
                value={userData.bio}
                onChangeText={(text) => setUserData({ ...userData, bio: text })}
                placeholder="Bio"
                editable={isEditable}
              />

              {/* Email (non-editable) */}
              <Text style={styles.text}>Email: {userData.email}</Text>

              {/* Toggle Edit/Save Button */}
              <Pressable onPress={() => (isEditable ? handleEditSave() : setIsEditable(true))} style={styles.button}>
                <Text style={styles.buttonText}>{isEditable ? "Save" : "Edit Profile"}</Text>
              </Pressable>

              {/* Sign Out Button */}
              <Pressable onPress={handleSignOut} style={[styles.button, { backgroundColor: '#ff6b6b' }]}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.title}>You are logged out</Text>

              <Pressable onPress={() => navigation.replace("Login")} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#003580',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#003580',
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    color: '#444',
    marginVertical: 5,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#003580',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#ff6b6b',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});