import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import styled from "styled-components/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useRef, useState } from "react";
import quizzes from "./icons";
const Container = styled.View<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.isDark ? "#2C3A47" : "#f7f1e3")};
  justify-content: space-between;
  padding: 50px;
`;

const Edge = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const IconContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #ff6b6b;
  align-items: center;
  justify-content: center;
  elevation: 5;
  shadow-color: #000; /* 아이폰 그림자 */
  shadow-opacity: 0.1;
  shadow-radius: 5px;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  background-color: #fffa65;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 30px;
  elevation: 5;
  shadow-color: #000; /* 아이폰 그림자 */
  shadow-opacity: 0.1;
  shadow-radius: 5px;

  z-index: 10;
`;

const Word = styled.Text`
  color: #2f3640;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;
export default function App() {
  const isDark = useColorScheme() === "dark";
  // console.log(isDark);

  //values
  const currentTarget = useRef<Animated.Value | null>(null);
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const scaleTopLeft = useRef(new Animated.Value(1)).current;
  const scaleTopRight = useRef(new Animated.Value(1)).current;
  const scaleBottomLeft = useRef(new Animated.Value(1)).current;
  const scaleBottomRight = useRef(new Animated.Value(1)).current;

  const feedbackScale = useRef(new Animated.Value(0)).current;
  const feedbackOpacity = useRef(new Animated.Value(0)).current;

  //State
  const [index, setIndex] = useState(0);
  const currentQuiz = quizzes[index];
  const indexRef = useRef(index);
  indexRef.current = index;
  const [feedbackType, setFeedBackType] = useState<"correct" | "wrong" | null>(
    null
  );
  //Animations
  const triggerScale = (target: Animated.Value) => {
    if (currentTarget.current === target) return;
    resetAllScales(false);
    currentTarget.current = target;
    Animated.spring(target, { toValue: 1.3, useNativeDriver: true }).start();
  };
  const resetAllScales = (clear = true) => {
    Animated.parallel([
      Animated.timing(scaleTopLeft, {
        toValue: 1,
        useNativeDriver: true,
        duration: 120,
      }),
      Animated.timing(scaleTopRight, {
        toValue: 1,
        useNativeDriver: true,
        duration: 120,
      }),
      Animated.timing(scaleBottomLeft, {
        toValue: 1,
        useNativeDriver: true,
        duration: 120,
      }),
      Animated.timing(scaleBottomRight, {
        toValue: 1,
        useNativeDriver: true,
        duration: 120,
      }),
    ]).start();
    if (clear) {
      currentTarget.current = null;
    }
  };
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    useNativeDriver: true,
    duration: 50,
    easing: Easing.linear,
  });
  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    useNativeDriver: true,
    duration: 50,
    easing: Easing.linear,
  });
  const nextScale = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const nextOpacity = Animated.spring(opacity, {
    toValue: 1,
    useNativeDriver: true,
  });
  const showFeedback = (type: "correct" | "wrong") => {
    setFeedBackType(type);
    feedbackScale.setValue(0);
    feedbackOpacity.setValue(1);

    Animated.sequence([
      Animated.spring(feedbackScale, {
        toValue: 4,
        useNativeDriver: true,
      }),
      Animated.timing(feedbackOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start(() => {
      console.log("애니메이션 끝!");
      setFeedBackType(null);
      setIndex((prev) => (prev + 1) % quizzes.length);
      Animated.parallel([nextScale, nextOpacity]).start();
    });
  };
  //Pan Responders
  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
        if (dx < -40 && dy < -150) {
          triggerScale(scaleTopLeft);
        } else if (dx > 40 && dy < -150) {
          triggerScale(scaleTopRight);
        } else if (dx > 40 && dy > 150) {
          triggerScale(scaleBottomRight);
        } else if (dx < -40 && dy > 150) {
          triggerScale(scaleBottomLeft);
        } else {
          resetAllScales();
        }
      },
      onPanResponderRelease: (_, { dx, dy }) => {
        resetAllScales();
        const isTopLeft = dx < -50 && dy < -270;
        const isTopRight = dx > 50 && dy < -270;
        const isBottomLeft = dx < -50 && dy > 270;
        const isBottomRight = dx > 50 && dy > 270;

        const liveQuiz = quizzes[indexRef.current];
        let selectedChoice = null;

        if (isTopLeft) selectedChoice = liveQuiz.choices.topLeft;
        else if (isTopRight) selectedChoice = liveQuiz.choices.topRight;
        else if (isBottomLeft) selectedChoice = liveQuiz.choices.bottomLeft;
        else if (isBottomRight) selectedChoice = liveQuiz.choices.bottomRight;

        if (selectedChoice) {
          console.log("index:", index);
          console.log("selected:", selectedChoice);
          console.log("answer:", liveQuiz.answer);
          console.log("equal?", selectedChoice === liveQuiz.answer);
          if (selectedChoice === liveQuiz.answer) {
            showFeedback("correct");
          } else {
            showFeedback("wrong");
          }
          Animated.sequence([
            Animated.parallel([onDropScale, onDropOpacity]),
            Animated.timing(position, {
              toValue: 0,
              useNativeDriver: true,
              duration: 50,
              easing: Easing.linear,
            }),
          ]).start();
        } else {
          Animated.parallel([onPressOut, goHome]).start();
        }
      },
    })
  ).current;

  return (
    <Container isDark={isDark}>
      <StatusBar style="auto" />
      <Edge>
        <IconContainer
          style={{
            transform: [{ scale: scaleTopLeft }],
          }}
        >
          <MaterialCommunityIcons
            name={currentQuiz.choices.topLeft}
            size={48}
            color="white"
          />
        </IconContainer>
        <IconContainer style={{ transform: [{ scale: scaleTopRight }] }}>
          <MaterialCommunityIcons
            name={currentQuiz.choices.topRight}
            size={48}
            color="white"
          />
        </IconContainer>
      </Edge>

      <Center>
        {feedbackType && (
          <Animated.View
            style={{
              position: "absolute",
              zIndex: 20,
              opacity: feedbackOpacity,
              transform: [{ scale: feedbackScale }],
            }}
          >
            <MaterialCommunityIcons
              name={
                feedbackType === "correct"
                  ? "check-circle-outline"
                  : "close-circle-outline"
              }
              size={100}
              color={feedbackType === "correct" ? "#2ecc71" : "#e74c3c"}
            />
          </Animated.View>
        )}
        <WordContainer
          {...panResponders.panHandlers}
          style={{
            opacity,
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Word adjustsFontSizeToFit numberOfLines={1}>
            {currentQuiz.word}
          </Word>
        </WordContainer>
      </Center>

      <Edge>
        <IconContainer style={{ transform: [{ scale: scaleBottomLeft }] }}>
          <MaterialCommunityIcons
            name={currentQuiz.choices.bottomLeft}
            size={48}
            color="white"
          />
        </IconContainer>
        <IconContainer style={{ transform: [{ scale: scaleBottomRight }] }}>
          <MaterialCommunityIcons
            name={currentQuiz.choices.bottomRight}
            size={48}
            color="white"
          />
        </IconContainer>
      </Edge>
    </Container>
  );
}
