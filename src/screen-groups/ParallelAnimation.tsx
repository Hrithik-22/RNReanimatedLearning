import { Images } from "@/constants/constants";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import ItemCard from "../components/ItemCard";

export const { width: WindowWidth } = Dimensions.get("window");
export const ListImageWidth = WindowWidth * 0.8;
export const ItemInternalPadding = 10;
export const ItemContainerWidth = ListImageWidth + ItemInternalPadding * 2;
export const ListPadding = (WindowWidth - ItemContainerWidth) / 2;

// console.log({ ListImageWidth, ItemContainerWidth, ListPadding });
const ParallelAnimation = () => {
  const scrollOffset = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.x; // box gets updated
    },
  });
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={onScrollHandler}
        contentContainerStyle={styles.scrollContainer}
        horizontal
        snapToInterval={ItemContainerWidth}
        pagingEnabled
        decelerationRate={"fast"}
      >
        {Images.map((item, idx) => (
          <ItemCard
            key={idx}
            index={idx}
            image={item}
            scrollOffset={scrollOffset}
            imageWidth={ListImageWidth}
            itemWidth={ItemContainerWidth}
            style={{
              marginHorizontal: ItemInternalPadding,
            }}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ParallelAnimation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContainer: {
    alignItems: "center",
    paddingLeft: ListPadding,
    paddingRight: ListPadding,
  },
});
