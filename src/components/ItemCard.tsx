import { ImageStyle } from "expo-image";
import React from "react";
import { Dimensions, StyleProp, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type ItemCardProps = {
  image: string;
  index: number;
  imageWidth: number;
  itemWidth: number;
  scrollOffset: SharedValue<number>;
  style: StyleProp<ImageStyle>;
};

const ItemCard: React.FC<ItemCardProps> = ({
  image,
  imageWidth,
  itemWidth,
  style,
  scrollOffset,
  index,
}) => {
  const { width: ScreenWidth } = Dimensions.get("window");

  const inputRange = [
    itemWidth * (index - 1),
    itemWidth * index,
    itemWidth * (index + 1),
  ];
  const rImageStyle = useAnimatedStyle(() => {
    const outputRange = [-ScreenWidth / 2, 0, ScreenWidth / 2];
    const translateX = interpolate(scrollOffset.value, inputRange, outputRange);

    return {
      transform: [
        {
          scale: 1.7,
        },
        { translateX: translateX },
      ],
    };
  });
  const rContainerStyle = useAnimatedStyle(() => {
    const outputRange = [1, 1.05, 1];
    const scale = interpolate(scrollOffset.value, inputRange, outputRange);
    return {
      transform: [{ scale: scale }],
    };
  });
  return (
    <Animated.View
      style={[style, { overflow: "hidden", borderRadius: 20 }, rContainerStyle]}
    >
      <Animated.Image
        key={image}
        source={{ uri: image }}
        style={[styles.imageBox, { width: imageWidth }, rImageStyle]}
      />
    </Animated.View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  imageBox: {
    aspectRatio: 0.6,
  },
});
