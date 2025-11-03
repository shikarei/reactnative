import { Image } from 'expo-image';
import { Platform, StyleSheet, Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#20005cff' }}
      headerImage={
        <Image
          source={require('@/assets/images/ugm-emas.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Halooo!!!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Nama</ThemedText>
        <ThemedText>
          Nadine Zahida Faadhilah
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>NIM</ThemedText>
        <ThemedText>
          23/517930/SV/22840
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Kelas</ThemedText>
        <ThemedText>
          A
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Mata Kuliah</ThemedText>
        <ThemedText>
          Praktikum Pemrograman Geospasial Perangkat Bergerak Lanjut
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Aplikasi</ThemedText>
        <ThemedText>
          Aplikasi ini dijalankan di perangkat
          <ThemedText type="defaultSemiBold"> {Platform.select({
            ios: 'iOS',
            android: 'Android',
            web: 'Web',
          })} </ThemedText> menggunakan Expo dan React Native.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 210,
    width: 200,
    top: 20,
    bottom: 0,
    left: 10,
    position: 'absolute',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#e0bcffff',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#e0bcffff',
  },
});
