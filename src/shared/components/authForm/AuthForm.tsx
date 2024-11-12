import styles from "./styles.module.scss";
import AuthInput from "../authInput/AuthInput";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSignIn from "@/service/mutations/authMutations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import { LoginData, LoginSchema } from "@/interface/Login";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate, useNavigation } from "react-router-dom";

const AuthForm = () => {
  const {user} = useAuthStore()
  const navigate = useNavigate();
  const {state} = useNavigation()
  const signInMutation = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: yupResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    signInMutation.mutate(data, {
      onSuccess: (data) => {
        // Redirect to the user's role-specific dashboard
        navigate(`/${data?.data?.user?.role}/overview`, {replace: true});
      },
    });
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <AuthInput
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        error={errors.email?.message}
      />

      <AuthInput
        label="Password"
        id="password"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors.password?.message}
      />
      <div className={styles["forgot-password"]}>
        <a href="/" className={styles.link}>
          Forgot password?
        </a>
      </div>

      <Button
        className={styles["submit-btn"]}
        disabled={signInMutation.isPending}
      >
        {signInMutation.isPending ? <BeatLoader color="#FFFFFF" /> : "Sign in"}
      </Button>

      <ToastContainer/>
    </form>
  );
};

export default AuthForm;
