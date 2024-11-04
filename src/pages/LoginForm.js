import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Pour stocker le token

const LoginForm = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: "nykantorandri@gmail.com",
        password: "123",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/rest/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            // Stocker le token
            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("email", response.data.email);

            if (response.data.role === "USER_ACHETEUR") {
                navigation.navigate("Payment");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("Une erreur est survenue lors de la connexion.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                    <Text>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
                </TouchableOpacity>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button title="SE CONNECTER" onPress={handleSubmit} />

            <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.signupLink}>
                {/* <Text style={styles.signupText}>Pas encore de compte ? S'inscrire</Text> */}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    passwordContainer: {
        position: "relative",
        marginBottom: 15,
    },
    eyeIcon: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    error: {
        color: "red",
        marginBottom: 15,
        textAlign: "center",
    },
    signupLink: {
        marginTop: 20,
        alignItems: "center",
    },
    signupText: {
        color: "#0000FF",
    },
});

export default LoginForm;
