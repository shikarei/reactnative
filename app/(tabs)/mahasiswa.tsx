import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
    {
        title: 'Kelas A',
        data: ['Kazuha', 'Heizou', 'Scara'],
    },
    {
        title: 'Kelas B',
        data: ['Seno', 'Seth', 'Layla'],
    },
];

const App = () => (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>
                            <FontAwesome5 name="user-graduate" size={22} color="#fff" />
                            {'  '}
                            {item}
                        </Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    </SafeAreaProvider>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a103d', // ungu gelap
        paddingTop: StatusBar.currentHeight || 16,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        color: '#e2d8ff', // ungu muda lembut
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 6,
        textShadowColor: 'rgba(0,0,0,0.25)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    item: {
        backgroundColor: '#6d5ba9', // ungu sedang
        padding: 10,
        marginVertical: 4,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.2,
    },
});

export default App;
