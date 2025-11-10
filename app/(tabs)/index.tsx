import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#BFA8FF', dark: '#1a103d' }}
      headerImage={
        <Image
          source={require('@/assets/images/ugm-emas.png')}
          style={styles.reactLogo}
        />
      }>

      {/* Judul Halaman */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Halooo!!!
        </ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Data Mahasiswa */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Nama</ThemedText>
        <ThemedText style={styles.textValue}>Nadine Zahida Faadhilah</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>NIM</ThemedText>
        <ThemedText style={styles.textValue}>23/517930/SV/22840</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Kelas</ThemedText>
        <ThemedText style={styles.textValue}>A</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Mata Kuliah</ThemedText>
        <ThemedText style={styles.textValue}>
          Praktikum Pemrograman Geospasial Perangkat Bergerak Lanjut
        </ThemedText>
      </ThemedView>

      {/* Informasi Platform */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Aplikasi</ThemedText>
        <ThemedText style={styles.textValue}>
          Aplikasi ini dijalankan di perangkat
          <ThemedText type="defaultSemiBold" style={styles.highlight}> {Platform.select({
            ios: 'iOS',
            android: 'Android',
            web: 'Web',
          })}</ThemedText> menggunakan Expo dan React Native.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  stepContainer: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  reactLogo: {
    height: 180,
    width: 180,
    top: 30,
    left: 20,
    position: 'absolute',
    opacity: 0.9,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#d3baff', // ungu muda lembut
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e2d8ff', // ungu pastel lembut
    marginBottom: 4,
  },
  textValue: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 20,
  },
  highlight: {
    color: '#c7a7ff',
    fontWeight: '700',
  },
});
