import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
    const navigation = useNavigation();
    const [personne, setPersonne] = useState({
        id: '',
        nom: '',
        prenom: '',
        contact: '',
        localisation: '',
        codePostal: '',
        role: { id: '', nom: '' },
        utilisateur: { id: '', email: '', password: '', isAdmin: '', pseudo: '' },
        typeProduction: ''
    });

    useEffect(() => {
        const checkTokenAndFetchData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) {
                    navigation.navigate("Login");
                    return;
                }

                const response = await axios.get("http://localhost:8080/panier/count", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    setPersonne(response.data.data[1]);
                }
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };

        checkTokenAndFetchData();
    }, []);


    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8080/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 200) {
                AsyncStorage.clear();
                navigation.navigate("Login");
            } else {
                console.error("Logout failed.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/logo.jpeg')} style={styles.logo} />
                <Text style={styles.appName}>Kolekta</Text>
            </View>

            <TouchableOpacity style={styles.profile}>
                <Text style={styles.profileText}>{personne.prenom} {personne.nom}</Text>
                <Text style={styles.roleText}>{personne.role.nom}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    appName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    commande: {
        flex: 1,
        alignItems: 'center',
    },
    commandeText: {
        color: '#fff',
        fontSize: 16,
    },
    profile: {
        alignItems: 'flex-end',
    },
    profileText: {
        color: '#fff',
        fontSize: 16,
    },
    roleText: {
        color: '#ddd',
        fontSize: 12,
    },
    logout: {
        paddingHorizontal: 10,
    },
    logoutText: {
        color: '#ff4444',
        fontSize: 14,
    },
});

export default Header;
