import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3, "username must be at least 3 characters"),
  password: yup
    .string()
    .required()
    .min(8, "password must be at least 8 characters"),
});

const styles = StyleSheet.create({
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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        style={styles.input(formik.touched.username && formik.errors.username)}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        style={styles.input(formik.touched.password && formik.errors.password)}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
