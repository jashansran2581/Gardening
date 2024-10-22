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
import { auth, db, storage } from "../firebase"; // Import storage from firebase
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import Firebase storage functions
import { launchImageLibrary } from "react-native-image-picker"; // Image Picker
import { v4 as uuidv4 } from "uuid"; // UUID for unique file names
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    dob: "",
    email: "",
    phone: "",
    profileImage: "", // To store the profile image URL
  });
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [image, setImage] = useState(null); // State for image selection
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [uploading, setUploading] = useState(false); // State for showing upload progress
  const [downloadUrl, setDownloadUrl] = useState(null); // URL of the uploaded image
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
            setUserData(userDoc.data()); // Set user data including profile image URL
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

  // Image picker function
  const pickImage = async () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        setImage(response.assets[0].uri); // Set the selected image URI
      }
    });
  };

  // Upload image to Firebase Storage with progress tracking
  const uploadImage = async () => {
    if (!image) {
      Alert.alert("No image selected");
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      // Create a reference to Firebase storage with a unique filename
      const imgRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${uuidv4()}`);


      const uploadTask = uploadBytesResumable(imgRef, blob);

      setUploading(true); // Start upload state

      // Track the upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progressValue);
        },
        (error) => {
          Alert.alert("Upload failed", error.message);
          setUploading(false);
        },
        async () => {
          // On successful upload, get the download URL
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadUrl(url);
          setUploading(false); // End upload state
          Alert.alert("Upload successful");
          setUserData({ ...userData, profileImage: url }); // Update user data with new image URL
          setUploadProgress(0); // Reset progress after upload is complete
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

        let profileImageURL = userData.profileImage; // Default to current image
        if (image) {
          await uploadImage(); // Wait for the upload to complete
          profileImageURL = await getDownloadURL(ref(storage, imgRef)); // Get the new image URL
        }

        // Update Firestore with new data
        await updateDoc(userDocRef, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          bio: userData.bio,
          dob: userData.dob,
          phone: userData.phone,
          profileImage: profileImageURL, // Save the new image URL
        });

        setUserData({ ...userData, profileImage: profileImageURL }); // Update local state
        setIsEditable(false); // End edit mode
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

              {/* Profile Image */}
              {userData.profileImage ? (
                <Image
                  source={{ uri: userData.profileImage }} // Display updated profile image
                  style={styles.profileImage}
                />
              ) : (
                image && (
                  <Image
                    source={{ uri: image }} // Display selected image before upload
                    style={styles.profileImage}
                  />
                )
              )}

              {/* Upload Image Button */}
              <Pressable onPress={pickImage} style={styles.uploadButton}>
                <Text style={styles.buttonText}>Upload Profile Picture</Text>
              </Pressable>

              {/* Display Upload Progress */}
              {uploading && (
                <Text>Uploading... {Math.round(uploadProgress)}%</Text>
              )}

              {/* First Name Label and Input */}
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={userData.firstName}
                onChangeText={(text) =>
                  setUserData({ ...userData, firstName: text })
                }
                placeholder="First Name"
                editable={isEditable}
              />

              {/* Last Name Label and Input */}
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={userData.lastName}
                onChangeText={(text) =>
                  setUserData({ ...userData, lastName: text })
                }
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
                onChangeText={(text) =>
                  setUserData({ ...userData, phone: text })
                }
                placeholder="Phone Number"
                editable={isEditable}
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
              <Pressable
                onPress={() =>
                  isEditable ? handleEditSave() : setIsEditable(true)
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {isEditable ? "Save Changes" : "Edit Profile"}
                </Text>
              </Pressable>

              {/* Sign Out Button */}
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
    color: "#FFF",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
  },
  signOutButton: {
    backgroundColor: "#DC3545",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
});

export default ProfileScreen;



// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Pressable,
//   TextInput,
//   ScrollView,
//   Image,
//   Alert,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { auth, db, storage } from "../firebase";
// import { signOut } from "firebase/auth";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { launchImageLibrary } from "react-native-image-picker";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigation } from "@react-navigation/native";

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     bio: "",
//     dob: "",
//     email: "",
//     phone: "",
//     profileImage: "",
//   });
//   const [isEditable, setIsEditable] = useState(false);
//   const [image, setImage] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const uid = user.uid;
//           const userDocRef = doc(db, "users", uid);
//           const userDoc = await getDoc(userDocRef);
//           if (userDoc.exists()) {
//             const data = userDoc.data();
            
//             // Fetch image URL from Firebase Storage if profileImage exists
//             if (data.profileImage) {
//               const imageUrl = await getDownloadURL(ref(storage, data.profileImage));
//               data.profileImage = imageUrl;
//             }
            
//             setUserData(data); // Set user data including profile image URL
//           } else {
//             console.log("No such document!");
//           }
//         }
//       } catch (error) {
//         console.log("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         setUserData(null);
//         navigation.replace("Login");
//       })
//       .catch((error) => console.log("Error signing out: ", error));
//   };

//   const pickImage = async () => {
//     launchImageLibrary({ mediaType: "photo" }, (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.errorCode) {
//         console.log("ImagePicker Error: ", response.errorMessage);
//       } else {
//         setImage(response.assets[0].uri);
//       }
//     });
//   };

//   const uploadImage = async () => {
//     if (!image) {
//       Alert.alert("No image selected");
//       return;
//     }

//     try {
//       const response = await fetch(image);
//       const blob = await response.blob();

//       const imgRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${uuidv4()}`);
//       const uploadTask = uploadBytesResumable(imgRef, blob);

//       setUploading(true);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setUploadProgress(progressValue);
//         },
//         (error) => {
//           Alert.alert("Upload failed", error.message);
//           setUploading(false);
//         },
//         async () => {
//           const url = await getDownloadURL(uploadTask.snapshot.ref);
//           setUserData({ ...userData, profileImage: url });
//           setUploading(false);
//           Alert.alert("Upload successful");

//           // Update Firestore with the new image path
//           const uid = auth.currentUser.uid;
//           const userDocRef = doc(db, "users", uid);
//           await updateDoc(userDocRef, { profileImage: imgRef.fullPath });
//         }
//       );
//     } catch (error) {
//       Alert.alert("Upload failed", error.message);
//     }
//   };

//   const handleEditSave = async () => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         const uid = user.uid;
//         const userDocRef = doc(db, "users", uid);

//         // Upload the new image if a new one was selected
//         if (image) {
//           await uploadImage();
//         }

//         await updateDoc(userDocRef, {
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           bio: userData.bio,
//           dob: userData.dob,
//           phone: userData.phone,
//         });

//         setIsEditable(false);
//       } catch (error) {
//         console.error("Error updating user data:", error);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.profileContainer}>
//           {userData ? (
//             <>
//               <Text style={styles.title}>Profile</Text>
//               {userData.profileImage ? (
//                 <Image
//                   source={{ uri: userData.profileImage }}
//                   style={styles.profileImage}
//                 />
//               ) : (
//                 image && (
//                   <Image
//                     source={{ uri: image }}
//                     style={styles.profileImage}
//                   />
//                 )
//               )}

//               <Pressable onPress={pickImage} style={styles.uploadButton}>
//                 <Text style={styles.buttonText}>Upload Profile Picture</Text>
//               </Pressable>

//               {uploading && <Text>Uploading... {Math.round(uploadProgress)}%</Text>}

//               <Text style={styles.label}>First Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={userData.firstName}
//                 onChangeText={(text) => setUserData({ ...userData, firstName: text })}
//                 placeholder="First Name"
//                 editable={isEditable}
//               />

//               {/* Other input fields here */}

//               <Pressable
//                 onPress={() => (isEditable ? handleEditSave() : setIsEditable(true))}
//                 style={styles.button}
//               >
//                 <Text style={styles.buttonText}>
//                   {isEditable ? "Save Changes" : "Edit Profile"}
//                 </Text>
//               </Pressable>

//               <Pressable onPress={handleSignOut} style={styles.signOutButton}>
//                 <Text style={styles.buttonText}>Sign Out</Text>
//               </Pressable>
//             </>
//           ) : (
//             <Text>Loading...</Text>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     padding: 20,
//   },
//   profileContainer: {
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
//   uploadButton: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "#FFF",
//     textAlign: "center",
//   },
//   label: {
//     fontSize: 16,
//     marginVertical: 5,
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 16,
//     marginVertical: 5,
//   },
//   button: {
//     backgroundColor: "#28A745",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//     width: "100%",
//   },
//   signOutButton: {
//     backgroundColor: "#DC3545",
//     padding: 10,
//     borderRadius: 5,
//     width: "100%",
//   },
// });

// export default ProfileScreen;
