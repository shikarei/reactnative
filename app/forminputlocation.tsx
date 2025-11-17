import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ToastAndroid, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref } from "firebase/database";

const App = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [accuration, setAccuration] = useState('');

    // Get current location
    const getCoordinates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            showToast('Permission to access location was denied');
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        const coords = loc.coords.latitude + ',' + loc.coords.longitude;
        setLocation(coords);

        const accuracy = loc.coords.accuracy;
        setAccuration(accuracy + ' m');
    };

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyA7L4LgPXOSA14RRPizCYqDtobZWapn_HM",
        authDomain: "pgpbl-reactnative.firebaseapp.com",
        databaseURL: "https://pgpbl-reactnative-default-rtdb.firebaseio.com",
        projectId: "pgpbl-reactnative",
        storageBucket: "pgpbl-reactnative.firebasestorage.app",
        messagingSenderId: "516727037689",
        appId: "1:516727037689:web:86546c00d075d49c874c28",
        measurementId: "G-ZN4WQ8DYGN"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Toast notification
    const showToast = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100
            );
        } else {
            alert(message);
        }
    };

    // Save data
    const saveData = async () => {
        if (!name || !location || !accuration) {
            showToast("Semua field harus diisi!");
            return;
        }

        try {
            const locationsRef = ref(db, 'points/');
            await push(locationsRef, {
                name: name,
                coordinates: location,
                accuration: accuration,
            });
            showToast("Data berhasil disimpan!");
            setName('');
            setLocation('');
            setAccuration('');
        } catch (e) {
            console.error("❌ Error adding document: ", e);
            showToast("Gagal menyimpan data!");
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Stack.Screen options={{ title: 'Form Input Lokasi' }} />
                <View style={styles.formCard}>
                    <Text style={styles.header}>Form Input Lokasi</Text>

                    <Text style={styles.inputTitle}>Nama</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Isikan nama objek'
                        placeholderTextColor="#ccc"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.inputTitle}>Koordinat</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: -6.200000,106.816666"
                        placeholderTextColor="#ccc"
                        value={location}
                        onChangeText={setLocation}
                    />

                    <Text style={styles.inputTitle}>Akurasi</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: 5 meter"
                        placeholderTextColor="#ccc"
                        value={accuration}
                        onChangeText={setAccuration}
                    />

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonWrapper}>
                            <Button
                                title="Get Current Location"
                                color="#4f3ca8"
                                onPress={getCoordinates}
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button
                                title="Save"
                                color="#6d5ba9"
                                onPress={saveData}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a103d', // ungu gelap seperti mahasiswa.tsx
        padding: 16,
    },
    formCard: {
        backgroundColor: '#2a1f5c',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        marginTop: 30,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        color: '#e2d8ff',
        marginBottom: 10,
        textAlign: 'center',
    },
    inputTitle: {
        color: '#e2d8ff',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 12,
    },
    input: {
        height: 42,
        borderColor: '#6d5ba9',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 6,
        paddingHorizontal: 10,
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonWrapper: {
        marginVertical: 6,
        borderRadius: 8,
        overflow: 'hidden',
    },
});

export default App;
