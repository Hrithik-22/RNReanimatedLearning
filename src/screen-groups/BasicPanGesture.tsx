import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;
const BasicPanGesture = () => {
  const startX = useSharedValue(0);
  const translateX = useSharedValue(0);
  const startY = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gesture.Pan() → describes WHAT kind of gesture to detect
  const panGesture = Gesture.Pan()
    .onStart(() => {
      //remember the box place
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      // addition of two for smooth animation
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    })
    .onEnd((e) => {
      //   c = √(a² + b²)
      //   distance = √(translateX² + translateY²)
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  /*GestureDetector 
  → the WRAPPER that actually listens for touches
  wrap it around the view you want to be draggable/tappable
  takes one prop: gesture={yourGesture}
  */

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.circle}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.square, animatedStyle]} />
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default BasicPanGesture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256,0.5)",
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "rgba(0,0,256,0.5)",
    borderRadius: 999,
  },
});
