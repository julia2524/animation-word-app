import { StatusBar } from "expo-status-bar";
import { Animated, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
const Container = styled.View`
  flex: 1;
  background-color: #f7f1e3;
  justify-content: space-between;
  padding: 50px;
`;

const IconContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const Icon = styled.View`
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
`;

const Word = styled.Text`
  color: #2f3640;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;
const Center = styled.View`
  flex: 3;
  z-index: 10;
  justify-content: center;
  align-items: center;
`;
export default function App() {
  return (
    <Container>
      <StatusBar style="auto" />
      <IconContainer>
        <Icon>
          <MaterialCommunityIcons name="butterfly" size={48} color="white" />
        </Icon>
        <Icon>
          <FontAwesome5 name="dog" size={48} color="white" />
        </Icon>
      </IconContainer>

      <Center>
        <WordContainer>
          <Word adjustsFontSizeToFit numberOfLines={1}>
            브라키오사우르스가 좋아요!!
          </Word>
        </WordContainer>
      </Center>

      <IconContainer>
        <Icon>
          <FontAwesome5 name="apple-alt" size={48} color="white" />
        </Icon>
        <Icon>
          <Ionicons name="umbrella" size={48} color="white" />
        </Icon>
      </IconContainer>
    </Container>
  );
}
