import React from 'react';
import { StyleSheet, TextInput, Text, View, ImageBackground, Button, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { getDatabase, ref, set } from 'firebase/database';

const TextInputExample = () => {
    const [nama, setNama] = React.useState('');
    const [nim, setNim] = React.useState('');
    const [kelas, setKelas] = React.useState('');
    const router = useRouter();

    const handleSave = () => {
        if (nama && nim && kelas) {
            const db = getDatabase();
            const studentRef = ref(db, 'students/' + nim);
            set(studentRef, {
                nama: nama,
                nim: nim,
                kelas: kelas,
            }).then(() => {
                Alert.alert('Success', 'Data berhasil disimpan');
                setNama('');
                setNim('');
                setKelas('');
                router.back();
            }).catch((error) => {
                Alert.alert('Error', 'Gagal menyimpan data: ' + error.message);
            });
        } else {
            Alert.alert('Error', 'Semua field harus diisi');
        }
    };

    return (
        <SafeAreaProvider>
            <ImageBackground
                source={require('../assets/images/ungu.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.container}>
                    <Stack.Screen
                        options={{
                            title: 'Form Input',
                            headerStyle: { backgroundColor: '#220d61ff' },
                            headerTintColor: '#FFFFFF',
                            headerTitleStyle: { fontWeight: '700' },
                        }}
                    />

                    <Text style={styles.header}>Form Mahasiswa</Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputTitle}>Nama</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Isikan Nama"
                            placeholderTextColor="#B3B3B3"
                            value={nama}
                            onChangeText={setNama}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputTitle}>NIM</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Isikan NIM"
                            placeholderTextColor="#B3B3B3"
                            keyboardType="numeric"
                            value={nim}
                            onChangeText={setNim}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputTitle}>Kelas</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Isikan Kelas"
                            placeholderTextColor="#B3B3B3"
                            value={kelas}
                            onChangeText={setKelas}
                        />
                    </View>

                    <View style={styles.button}>
                        <Button title="SAVE" color="#4F46E5" onPress={handleSave} />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(109, 91, 169, 0.6)',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    formGroup: {
        marginBottom: 22,
    },
    inputTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: 'white',
        fontSize: 15,
    },
    button: {
        marginTop: 10,
        borderRadius: 10,
    },
});

export default TextInputExample;
