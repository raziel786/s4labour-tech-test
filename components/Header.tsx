import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

type CurvedHeaderProps = {
  title?: string;
  showBackButton?: boolean;
};

export default function CurvedHeader({
  title = 'Title',
  showBackButton = true,
}: CurvedHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${width} 150`}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#4facfe" />
              <Stop offset="1" stopColor="#8e44ad" />
            </LinearGradient>
          </Defs>
          <Path
            d={`
              M0,0
              H${width}
              V110
              Q${width / 2},150 0,110
              Z
            `}
            fill="url(#grad)"
          />
        </Svg>
      </View>

      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="caret-back-circle-sharp" size={32} color="white" />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { paddingLeft: showBackButton ? 36 : 0 }]}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 60,
    zIndex: 2,
  },
  backText: {
    fontSize: 24,
    color: 'white',
  },
  title: {
    padding: 16,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
});
