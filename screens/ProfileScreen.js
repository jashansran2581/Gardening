import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';  
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import * as Crypto from 'expo-crypto';  // <-- Import expo-crypto for generating unique IDs

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    dob: "",
    email: "",
    phone: "",
    profileImage: "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
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
            const data = userDoc.data();
            if (data.profileImage) {
              const imageUrl = await getDownloadURL(ref(storage, data.profileImage));
              data.profileImage = imageUrl;
            }
            setUserData(data);
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
      .catch((error) => console.log("Error signing out: ", error));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("No image selected");
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      // Generate a unique ID for the image using expo-crypto
      const uniqueId = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        new Date().toString()
      );

      const imgRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${uniqueId}`);
      const uploadTask = uploadBytesResumable(imgRef, blob);

      setUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progressValue);
        },
        (error) => {
          Alert.alert("Upload failed", error.message);
          setUploading(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setUserData({ ...userData, profileImage: url });
          setUploading(false);
          Alert.alert("Upload successful");

          const uid = auth.currentUser.uid;
          const userDocRef = doc(db, "users", uid);
          await updateDoc(userDocRef, { profileImage: imgRef.fullPath });
        }
      );
    } catch (error) {
      Alert.alert("Upload failed", error.message);
    }
  };

  const handleEditSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);

        if (image) {
          await uploadImage();
        }

        await updateDoc(userDocRef, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          bio: userData.bio,
          dob: userData.dob,
          phone: userData.phone,
        });

        setIsEditable(false);
        Alert.alert("Profile Updated", "Your profile information has been successfully updated.");
      } catch (error) {
        console.error("Error updating user data:", error);
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
              {userData.profileImage ? (
                <Image
                  source={{ uri: userData.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                image && (
                  <Image
                    source={{ uri: image }}
                    style={styles.profileImage}
                  />
                )
              )}

              <Pressable onPress={pickImage} style={styles.uploadButton}>
                <Text style={styles.buttonText}>Upload Profile Picture</Text>
              </Pressable>

              {uploading && <Text>Uploading... {Math.round(uploadProgress)}%</Text>}

              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={userData.firstName}
                onChangeText={(text) => setUserData({ ...userData, firstName: text })}
                placeholder="First Name"
                editable={isEditable}
              />

              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={userData.lastName}
                onChangeText={(text) => setUserData({ ...userData, lastName: text })}
                placeholder="Last Name"
                editable={isEditable}
              />

              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                value={userData.dob}
                onChangeText={(text) => setUserData({ ...userData, dob: text })}
                placeholder="Date of Birth (YYYY-MM-DD)"
                editable={isEditable}
              />

              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={userData.phone}
                onChangeText={(text) => setUserData({ ...userData, phone: text })}
                placeholder="Phone Number"
                editable={isEditable}
              />

              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={styles.input}
                value={userData.bio}
                onChangeText={(text) => setUserData({ ...userData, bio: text })}
                placeholder="Bio"
                editable={isEditable}
              />

              <Text style={styles.text}>Email: {userData.email}</Text>

              <Pressable
                onPress={() => (isEditable ? handleEditSave() : setIsEditable(true))}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {isEditable ? "Save Changes" : "Edit Profile"}
                </Text>
              </Pressable>

              <Pressable onPress={handleSignOut} style={styles.signOutButton}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </Pressable>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
});

export default ProfileScreen;
