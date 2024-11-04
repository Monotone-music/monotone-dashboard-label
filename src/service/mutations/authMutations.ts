import { LoginData } from "@/interface/Login";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../authSerivce";
import { AxiosError, AxiosResponse } from "axios";
import triggerToast from "@/shared/auth/toast/AuthToast";
import useAuthStore from "@/store/useAuthStore";

const useSignIn = () => {
  const {setUser} = useAuthStore()
  return useMutation({
    mutationFn: (data: LoginData) => signIn(data),
    onError: (error: AxiosError) => {
      triggerToast((error?.response?.data as { msg: string })?.msg, "error");
    },
    onSuccess: (response: AxiosResponse) => {
      setUser({user: response.data.user, token: response.data.token })
      triggerToast(response?.data.msg, "success");
    },
  });
};

export default useSignIn;
