import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';


export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4c2a85', dark: '#1a103d' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#bfaaff"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            color: '#e2d8ff',
            textShadowColor: 'rgba(0,0,0,0.4)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
          }}>
          Explore
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.bodyText}>
        This app includes example code to help you get started.
      </ThemedText>

      <Collapsible title="File-based routing" style={styles.section}>
        <ThemedText style={styles.text}>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold" style={styles.highlight}>
            app/(tabs)/index.tsx
          </ThemedText>{' '}
          and{' '}
          <ThemedText type="defaultSemiBold" style={styles.highlight}>
            app/(tabs)/explore.tsx
          </ThemedText>
        </ThemedText>
        <ThemedText style={styles.text}>
          The layout file in{' '}
          <ThemedText type="defaultSemiBold" style={styles.highlight}>
            app/(tabs)/_layout.tsx
          </ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link" style={styles.link}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Android, iOS, and web support" style={styles.section}>
        <ThemedText style={styles.text}>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold" style={styles.highlight}>w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Images" style={styles.section}>
        <ThemedText style={styles.text}>
          For static images, you can use the <ThemedText type="defaultSemiBold" style={styles.highlight}>@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold" style={styles.highlight}>@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 8 }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link" style={styles.link}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Light and dark mode components" style={styles.section}>
        <ThemedText style={styles.text}>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold" style={styles.highlight}>useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link" style={styles.link}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Animations" style={styles.section}>
        <ThemedText style={styles.text}>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold" style={styles.highlight}>components/HelloWave.tsx</ThemedText> component uses
          the powerful{' '}
          <ThemedText type="defaultSemiBold" style={[styles.highlight, { fontFamily: Fonts.mono }]}>
            react-native-reanimated
          </ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText style={styles.text}>
              The <ThemedText type="defaultSemiBold" style={styles.highlight}>components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>

      <TouchableOpacity style={styles.fab}>
        <IconSymbol
          size={32}
          color="#ffffff"
          name="add.circle.fill"
        />
      </TouchableOpacity>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#9e7bff',
    bottom: -90,
    left: -35,
    position: 'absolute',
    opacity: 0.5,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#1a103d',
  },
  bodyText: {
    color: '#e0d4ff',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  text: {
    color: '#e6e0ff',
    fontSize: 14.5,
    lineHeight: 22,
  },
  highlight: {
    color: '#c6b2ff',
    fontWeight: '600',
  },
  link: {
    color: '#d8c6ff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  section: {
    backgroundColor: 'rgba(109, 91, 169, 0.25)', // warna ungu lembut transparan
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  fab: {
    position: 'absolute',
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#7b50ff',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
});

