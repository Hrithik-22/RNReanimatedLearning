import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type CardProps = {
  index: number;
  progress: SharedValue<number>;
};

const Card: React.FC<CardProps> = ({ index, progress }) => {
  const rAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [0, progress.value * index * 25],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [0, -progress.value * index * 5],
      Extrapolation.CLAMP,
    );
    const rotate = interpolate(
      progress.value,
      [0, 1],
      [-index * 10, index * 10],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        {
          translateX,
        },
        { translateY },
        { rotate: `${rotate}deg` },
      ],
    };
  });
  return (
    <Animated.View
      key={index}
      style={[styles.card, { zIndex: 4 - index }, rAnimatedStyle]}
    />
  );
};

const StackedCards = () => {
  const progress = useSharedValue(0);
  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        console.log("TOUCHED");
        progress.value = withSpring(1, { mass: 2 });
      }}
      onTouchEnd={() => {
        console.log("ENDED");
        progress.value = withSpring(0);
      }}
    >
      {new Array(4).fill(null).map((_, index) => {
        return <Card key={index} progress={progress} index={index} />;
      })}
    </View>
  );
};

export default StackedCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    boxShadow: "0px 0px 10px #cccccc",
    borderCurve: "continuous",
    height: 180,
    width: 135,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#b9b9b9",
    position: "absolute",
  },
});

// initial state
// {
//   transform: [{ rotate: `${-index * 10}deg` }],
// },

// final state
// {
//   transform: [
//     {
//       translateX: index * 25,
//     },
//     { rotate: `${index * 10}deg` },
//     { translateY: -index * 5 },
//   ],
// },

// {
//                 transform: [
//                   {
//                     translateX: 0, // index * 25
//                   },
//                   {
//                     translateY: 0, // -index * 5
//                   },

//                   {
//                     rotate: `${-index * 10}deg`, // =>`${index * 10}deg`
//                   },
//                 ],
//               },
