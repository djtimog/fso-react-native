import { Pressable, Text, TextInput, View } from "react-native";
import { useFormik } from "formik";
import theme from "../lib/theme";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { mutateStyles } from "../lib/mutationStyles";
import useSignUp from "../hooks/useSignUp";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3, "username must be at least 3 characters"),
  password: yup
    .string()
    .required()
    .min(8, "password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const [signUp] = useSignUp(); //
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={mutateStyles.container}>
      <TextInput
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        style={mutateStyles.input(
          formik.touched.username && formik.errors.username,
        )}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={mutateStyles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        style={mutateStyles.input(
          formik.touched.password && formik.errors.password,
        )}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={mutateStyles.error}>{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder="Confirm Password"
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange("confirmPassword")}
        onBlur={formik.handleBlur("confirmPassword")}
        style={mutateStyles.input(
          formik.touched.confirmPassword && formik.errors.confirmPassword,
        )}
        secureTextEntry
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={mutateStyles.error}>{formik.errors.confirmPassword}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={mutateStyles.button}>
        <Text style={mutateStyles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};
