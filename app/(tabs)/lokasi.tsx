import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Linking, RefreshControl, SectionList, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function LokasiScreen() {
    const [sections, setSections] = useState<{ title: string; data: any[]; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    // Your web app's Firebase configuration
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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);


    const handlePress = (coordinates: string) => {
        const [latitude, longitude] = coordinates.split(',').map(coord => coord.trim());
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Hapus Lokasi",
            "Apakah Anda yakin ingin menghapus lokasi ini?",
            [
                {
                    text: "Batal",
                    style: "cancel"
                },
                {
                    text: "Hapus",
                    onPress: () => {
                        const pointRef = ref(db, 'points/' + id);
                        remove(pointRef)
                            .then(() => {
                                Alert.alert("Sukses", "Lokasi berhasil dihapus.");
                            })
                            .catch((error) => {
                                Alert.alert("Error", "Gagal menghapus lokasi: " + error.message);
                            });
                    },
                    style: "destructive"
                }
            ]
        );
    };


    useEffect(() => {
        const pointsRef = ref(db, 'points/');
        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pointsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));

                const formattedData = [{
                    title: 'Lokasi Tersimpan',
                    data: pointsArray
                }];
                setSections(formattedData);
            } else {
                setSections([]);
            }
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    if (loading) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#c8b6ff" />
            </ThemedView>
        );
    }

    return (
        <View style={styles.container}>
            {sections.length > 0 ? (
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                            <ThemedText style={styles.itemCoords}>{item.coordinates}</ThemedText>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => handlePress(item.coordinates)} style={styles.button}>
                                    <ThemedText style={styles.buttonText}>Lihat Rute</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.deleteButton]}>
                                    <Ionicons name="trash-bin" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.headerContainer}>
                            <ThemedText style={styles.header}>{title}</ThemedText>
                            <TouchableOpacity onPress={() => router.push('/forminputlocation')} style={styles.addButton}>
                                <Ionicons name="add" size={24} color="#e2d8ff" />
                            </TouchableOpacity>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#c8b6ff"
                        />
                    }
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <ThemedView style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyText}>Tidak ada data lokasi tersimpan.</ThemedText>
                </ThemedView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a103d', // ungu gelap seperti di mahasiswa.tsx
        paddingTop: 22,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#1a103d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 6,
        borderRadius: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        color: '#e2d8ff', // ungu muda
        textShadowColor: 'rgba(0,0,0,0.25)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    addButton: {
        padding: 5,
    },
    item: {
        backgroundColor: '#6d5ba9', // ungu sedang
        padding: 14,
        marginVertical: 6,
        marginHorizontal: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },
    itemName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
    },
    itemCoords: {
        fontSize: 14,
        color: '#e9e2ff',
        marginTop: 4,
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: '#1a103d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#d2c5ff',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#7b50ff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#ff3b30',
        flex: 0.3,
        marginLeft: 5,
        marginRight: 0,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
    },
});
