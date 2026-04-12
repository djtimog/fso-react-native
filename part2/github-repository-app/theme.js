import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#0366d6",
    error: "#d73a4a",
    button: "white",
  },
  bgColors: {
    tabs: "#24292e",
    main: "#e1e4e8",
    repoItem: "white",
    repoTag: "#0366d6",
  },
  borders: {
    input: "gray",
    inputError: "#d73a4a",
  },
  font: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
};

export default theme;
