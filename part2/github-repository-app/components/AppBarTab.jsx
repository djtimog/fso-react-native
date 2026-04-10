import { Text, Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "600",
    textAlign: "left",
    fontSize: 20,
  },
});

export default function AppBarTab({ name }) {
  return (
    <Pressable>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}
