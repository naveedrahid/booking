import { ApiService } from "./api.services";
import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const USERNAME_KEY = "username";

const saveToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires:7, secure: true, sameSite: "Strict"});
}

const removeToken = () => {
    return Cookies.remove(TOKEN_KEY);
}

const removeUsername = () => {
    return Cookies.remove(USERNAME_KEY);
}

const getToken = () => {
    return Cookies.get(TOKEN_KEY);
}

const getUsername = () => {
    return Cookies.get(USERNAME_KEY);
}

const isLoggesIn = () => {
    return !!getToken();
}

const login = async (credentials) => {
    try {
        const response = await ApiService.post("/login", credentials);
        if (response.status === 200 && response.data) {
            // saveToken(response.data.token);
            return { success: true, data: response.data };
        }
        return { success: false, error: response.data.message || "Login failed" };
    } catch (error) {
        return { success: false, error: error.message || "Login failed" };
    }
}


const logout = () => {
  removeToken();
  removeUsername();
  window.location.href = "/login";
};

export const AuthService = {
    login,
    logout,
    isLoggesIn,
    getToken,
    getUsername,
    saveToken,
    removeToken,
    removeUsername
}