import { LoginData } from "@/interface/Login";
import apiClient from "./apiClient";

export const signIn = async (data: LoginData) => {
    return (await apiClient.post('/auth/login', data));
}


