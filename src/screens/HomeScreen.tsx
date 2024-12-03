import React from "react";
import { View, StyleSheet } from "react-native";
import CharacterPicker  from "../components/CharacterPicker";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CharacterPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;
