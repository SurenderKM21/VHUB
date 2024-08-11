import { axiosInstance } from "./api";
import { jwtDecode } from "jwt-decode";

const setToken = (token) => localStorage.setItem('token', token);

const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return token;
    }
    return "No token";
}
const setUser=(user)=>localStorage.setItem('username',user);

const getUserEmail = () => {
    const token = getToken();
    if (token) {
        const payLoad = jwtDecode(token);
        return payLoad?.sub;
    }
    return null;
}

const getUserRole = () => {
    const token = getToken();
    if (token) {
        const payLoad = jwtDecode(token);
        return payLoad?.role;
    }
    return null;
}

const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const payLoad = jwtDecode(token);
        const isLogin = Date.now() < payLoad.exp * 1000;
        return isLogin;

    }
    return false;
}

const SignIn = (email, password) => axiosInstance.post("/auth/login", { email, password });
const SignOut = () => localStorage.clear()


export const authService = { getToken, setToken,setUser, getUserEmail, getUserRole, isLoggedIn, SignIn, SignOut };