import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

const SkeletonPulse = ({ children }: { children: React.ReactNode }) => {
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnimation, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    pulse();
  }, []);

  return (
    <Animated.View
      style={[
        styles.pulse,
        {
          opacity: opacityAnimation,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pulse: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SkeletonPulse;
