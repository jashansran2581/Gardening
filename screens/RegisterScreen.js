import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Details",
        "Please enter all the credentials",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      const user = userCredentials.user.email;
      const uid = userCredentials.user.uid;

      setDoc(doc(db, "users", `${uid}`), {
        email: user,
        phone: phone
      });

      // Optionally navigate to login or main screen after successful registration
      navigation.navigate('Main'); // Change as needed
    }).catch(error => {
      Alert.alert("Registration Error", error.message);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Create an Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Enter your Phone No"
            placeholderTextColor={"gray"}
            style={styles.input}
          />
        </View>

        <Pressable onPress={register} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={styles.signInTextContainer}>
          <Text style={styles.signInText}>Already have an account? <Text style={styles.signInLink}>Sign In</Text></Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginTop: 100,
  },
  title: {
    color: "#003580",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "500",
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
  registerButton: {
    width: 200,
    backgroundColor: "#003580", // Button color
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    alignItems: "center",
  },
  registerButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  signInTextContainer: {
    marginTop: 20,
  },
  signInText: {
    textAlign: "center",
    color: "gray",
    fontSize: 17,
  },
  signInLink: {
    color: "#003580",
    fontWeight: "600",
  },
});