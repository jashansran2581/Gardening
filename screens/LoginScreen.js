import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db, signInWithGooglePopup } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons"; // For Google Icon

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User details", user);
      })
      .catch((error) => {
        console.log("Error logging in", error);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGooglePopup();
      const user = result.user;

      // Add user details to Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
        uid: user.uid,
      });

      console.log("User logged in via Google: ", user);
      navigation.replace("Main"); // Redirect after successful login
    } catch (error) {
      console.log("Error with Google Sign-in: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Main");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Sign-in</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter Email"
            placeholderTextColor={"gray"}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor={"gray"}
            style={styles.input}
          />
        </View>

        <Pressable onPress={login} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Continue</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={styles.signupTextContainer}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </Pressable>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>

        {/* Google Login */}
        <Pressable onPress={handleGoogleSignIn} style={styles.googleButton}>
          <Ionicons name="logo-google" size={24} color="black" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    color: "#003580",
    fontSize: 28,
    fontWeight: "700",
  },
  inputContainer: {
    marginTop: 20,
    width: 300,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  input: {
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: "100%",
  },
  loginButton: {
    width: 200,
    backgroundColor: "#003580",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  signupTextContainer: {
    marginTop: 20,
  },
  signupText: {
    color: "gray",
    fontSize: 17,
  },
  signupLink: {
    color: "#003580",
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    marginHorizontal: 10,
    color: "gray",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 280,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
