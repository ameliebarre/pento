import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password")], "Passwords must match")
  //   .required("Confirm Password is required"),
  // acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

export default registerSchema;
