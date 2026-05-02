import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/mutations";
import useCreateReview from "../hooks/useCreateReview";
import { mutateStyles } from "../lib/mutationStyles";

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner name is required")
    .min(3, "Repository owner name must be at least 3 characters"),
  repositoryName: yup
    .string()
    .required("Repository name is required")
    .min(3, "Repository name must be at least 3 characters"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  review: yup.string().min(10, "Review must be at least 10 characters"),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating,
        review,
      });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      review: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={mutateStyles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        style={mutateStyles.input(
          formik.touched.ownerName && formik.errors.ownerName,
        )}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={mutateStyles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        style={mutateStyles.input(
          formik.touched.repositoryName && formik.errors.repositoryName,
        )}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={mutateStyles.errorText}>
          {formik.errors.repositoryName}
        </Text>
      )}

      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        keyboardType="numeric"
        style={mutateStyles.input(
          formik.touched.rating && formik.errors.rating,
        )}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={mutateStyles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        onBlur={formik.handleBlur("review")}
        multiline
        style={[
          mutateStyles.input(formik.touched.review && formik.errors.review),
          { minHeight: 80 },
        ]}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={mutateStyles.errorText}>{formik.errors.review}</Text>
      )}

      <Pressable style={mutateStyles.button} onPress={formik.handleSubmit}>
        <Text style={mutateStyles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;
