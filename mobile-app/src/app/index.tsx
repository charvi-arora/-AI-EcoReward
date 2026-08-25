import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const floatAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: -8,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnimation, pulseAnimation]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Decorative floating elements */}
        <Animated.Text
          style={[
            styles.floatingLeaf,
            { transform: [{ translateY: floatAnimation }] },
          ]}
        >
          🌿
        </Animated.Text>

        <Animated.Text
          style={[
            styles.floatingFlower,
            {
              transform: [
                {
                  translateY: floatAnimation.interpolate({
                    inputRange: [-8, 0],
                    outputRange: [5, 0],
                  }),
                },
              ],
            },
          ]}
        >
          🌼
        </Animated.Text>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.smallGreeting}>
              Hello, Eco Hero! 👋
            </ThemedText>

            <ThemedText type="title" style={styles.title}>
              AI EcoReward
            </ThemedText>
          </View>

          <View style={styles.profileBubble}>
            <ThemedText style={styles.profileEmoji}>🌎</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.subtitle}>
          Make a difference, one piece of waste at a time.
        </ThemedText>

        {/* Points card */}
        <Animated.View
          style={[
            styles.pointsCard,
            { transform: [{ scale: pulseAnimation }] },
          ]}
        >
          <View>
            <ThemedText style={styles.pointsLabel}>
              YOUR ECO POINTS
            </ThemedText>

            <ThemedText style={styles.pointsNumber}>0</ThemedText>

            <ThemedText style={styles.levelText}>
              🌱 Eco Beginner
            </ThemedText>
          </View>

          <View style={styles.pointsEmojiCircle}>
            <ThemedText style={styles.pointsEmoji}>⭐</ThemedText>
          </View>
        </Animated.View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.greenCard]}>
            <ThemedText style={styles.statEmoji}>🔥</ThemedText>
            <ThemedText style={styles.statNumber}>0</ThemedText>
            <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
          </View>

          <View style={[styles.statCard, styles.pinkCard]}>
            <ThemedText style={styles.statEmoji}>🏆</ThemedText>
            <ThemedText style={styles.statNumber}>0</ThemedText>
            <ThemedText style={styles.statLabel}>Badges</ThemedText>
          </View>
        </View>

        {/* Main scan button */}
        <Pressable
          onPress={() => router.push('/scan')}
          style={({ pressed }) => [
            styles.scanButton,
            pressed && styles.scanButtonPressed,
          ]}
        >
          <View style={styles.cameraCircle}>
            <ThemedText style={styles.cameraEmoji}>📷</ThemedText>
          </View>

          <View>
            <ThemedText style={styles.scanTitle}>
              Scan Waste
            </ThemedText>

            <ThemedText style={styles.scanSubtitle}>
              Let AI identify it ✨
            </ThemedText>
          </View>

          <ThemedText style={styles.arrow}>→</ThemedText>
        </Pressable>

        {/* Quick actions */}
        <ThemedText style={styles.sectionTitle}>
          Your Eco Journey
        </ThemedText>

        <View style={styles.actionsRow}>
          <Pressable style={[styles.actionCard, styles.yellowCard]}>
            <ThemedText style={styles.actionEmoji}>🏅</ThemedText>
            <ThemedText style={styles.actionText}>Badges</ThemedText>
          </Pressable>

          <Pressable style={[styles.actionCard, styles.greenCard]}>
            <ThemedText style={styles.actionEmoji}>📚</ThemedText>
            <ThemedText style={styles.actionText}>Learn</ThemedText>
          </Pressable>

          <Pressable style={[styles.actionCard, styles.pinkCard]}>
            <ThemedText style={styles.actionEmoji}>👑</ThemedText>
            <ThemedText style={styles.actionText}>Rankings</ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF8',
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    position: 'relative',
  },

  floatingLeaf: {
    position: 'absolute',
    top: 65,
    right: 25,
    fontSize: 30,
  },

  floatingFlower: {
    position: 'absolute',
    top: 210,
    left: 12,
    fontSize: 25,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7568',
    marginBottom: 3,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#236B3A',
  },

  subtitle: {
    fontSize: 14,
    color: '#69736B',
    lineHeight: 20,
    marginTop: 4,
    marginBottom: 18,
    maxWidth: '85%',
  },

  profileBubble: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFE36E',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '5deg' }],
  },

  profileEmoji: {
    fontSize: 26,
  },

  pointsCard: {
    backgroundColor: '#78C879',
    borderRadius: 28,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#4A9A50',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  pointsLabel: {
    color: '#EFFFF0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },

  pointsNumber: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    marginTop: 2,
  },

  levelText: {
    color: '#F4FFF1',
    fontSize: 13,
    fontWeight: '700',
  },

  pointsEmojiCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFE36E',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-8deg' }],
  },

  pointsEmoji: {
    fontSize: 34,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },

  statCard: {
    flex: 1,
    minHeight: 105,
    borderRadius: 22,
    padding: 16,
    justifyContent: 'center',
  },

  greenCard: {
    backgroundColor: '#DDF4D8',
  },

  pinkCard: {
    backgroundColor: '#FFD9E8',
  },

  yellowCard: {
    backgroundColor: '#FFF0A6',
  },

  statEmoji: {
    fontSize: 25,
    marginBottom: 4,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#26352A',
  },

  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B655D',
  },

  scanButton: {
    marginTop: 16,
    backgroundColor: '#FF8DB6',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#E96F9B',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  scanButtonPressed: {
    transform: [{ scale: 0.97 }],
  },

  cameraCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  cameraEmoji: {
    fontSize: 25,
  },

  scanTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  scanSubtitle: {
    color: '#FFF4F8',
    fontSize: 12,
    marginTop: 2,
  },

  arrow: {
    marginLeft: 'auto',
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },

  sectionTitle: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '800',
    color: '#26352A',
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  actionCard: {
    flex: 1,
    minHeight: 100,
    borderRadius: 21,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionEmoji: {
    fontSize: 28,
    marginBottom: 7,
  },

  actionText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334037',
  },
});