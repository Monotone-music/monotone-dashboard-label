import { LoginData } from "@/interface/Login";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../authService";
import { AxiosError, AxiosResponse } from "axios";
import useAuthStore from "@/store/useAuthStore";

const useSignIn = () => {
  const { login: setLoginState, setError } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginData) => signIn(data),
    onError: (error: AxiosError<{ msg: string }>) => {
      const errorMessage = error.response?.data?.msg || "Login failed. Please try again.";
      setError(errorMessage)
    },
    onSuccess: (response: AxiosResponse) => {
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      setLoginState(token, user);
    },
  });
};

export default useSignIn;
