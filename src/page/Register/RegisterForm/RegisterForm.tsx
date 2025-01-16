// import styles from "./styles.module.scss";
// import { Button } from "@/components/ui/button";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useToast } from "@/hooks/use-toast";
// import BeatLoader from "react-spinners/BeatLoader";
// import { useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import AuthInput from "@/shared/components/authInput/AuthInput";

// interface RegisterData {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   labelName: string;
// }

// const RegisterSchema = yup.object().shape({
//   username: yup.string().required("Username is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   confirmPassword: yup.string()
//     .oneOf([yup.ref('password')], 'Passwords must match')
//     .required("Please confirm your password"),
//   labelName: yup.string().required("Label name is required"),
// });

// const RegisterForm = () => {
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<RegisterData>({ resolver: yupResolver(RegisterSchema) });

//   const onSubmit: SubmitHandler<RegisterData> = async (data) => {
//     try {
//       // API call will go here
//       console.log("Registration data:", data); // Temporary use of data to avoid unused variable warning
//       toast({
//         title: "Registration successful",
//         description: "Welcome to Monotone!",
//         className: styles['toast-success']
//       });
//       navigate('/auth/sign-in');
//     } catch (error) {
//         console.error("Registration failed:", error);
//       toast({
//         variant: "destructive",
//         title: "Registration failed",
//         description: "Please try again"
//       });
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
//       <AuthInput
//         label="Username"
//         id="username"
//         type="text"
//         placeholder="Enter your username"
//         register={register}
//         error={errors.username?.message}
//       />

//       <AuthInput
//         label="Email"
//         id="email"
//         type="email"
//         placeholder="Enter your email"
//         register={register}
//         error={errors.email?.message}
//       />

//       <AuthInput
//         label="Label Name"
//         id="labelName"
//         type="text"
//         placeholder="Enter your label name"
//         register={register}
//         error={errors.labelName?.message}
//       />

//       <AuthInput
//         label="Password"
//         id="password"
//         type="password"
//         placeholder="Enter your password"
//         register={register}
//         error={errors.password?.message}
//       />

//       <AuthInput
//         label="Confirm Password"
//         id="confirmPassword"
//         type="password"
//         placeholder="Confirm your password"
//         register={register}
//         error={errors.confirmPassword?.message}
//       />

//       <Button
//         className={styles["submit-btn"]}
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? <BeatLoader color="#FFFFFF" /> : "Register"}
//       </Button>

//       <div className={styles["login-link"]}>
//         Already have an account? <a href="/" className={styles.link}>Login here</a>
//       </div>
//     </form>
//   );
// };

// export default RegisterForm;
