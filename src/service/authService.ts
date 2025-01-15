import { LoginData } from "@/interface/Login";
import apiClient from "./apiClient";
import { RegisterData } from "@/interface/Register";

export const signIn = async (data: LoginData) => {
    return (await apiClient.post('/auth/login?flag=label', data));
}

export const signUp = async (data: RegisterData) => {
  return (await apiClient.post('/account/register?type=label', data))
}

export const refreshTokenApi2 = async () => {
    
    const response = await apiClient.post('/auth/refresh?flag=label', {
      refreshToken: localStorage.getItem('refreshToken')
    });
    return response.data.data;
  };

