import { StyleSheet } from "react-native";
import theme from "./theme";

export const mutateStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  input: (isError = false) => ({
    borderWidth: 1,
    borderColor: !isError ? theme.borders.input : theme.borders.inputError,
    padding: 10,
    marginBottom: 10,
  }),
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.button,
    textAlign: "center",
    fontFamily: theme.font.main,
  },
  error: {
    color: theme.colors.error,
    marginBottom: 10,
    fontFamily: theme.font.main,
  },
});
