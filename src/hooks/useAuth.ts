import { useState } from "react";
import { bake_cookie, delete_cookie, read_cookie } from "sfcookies";
import { authApi } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (credentials: {email: string, password: string}) => {
        try {
            setIsLoading(true);
            const { accessToken } = await authApi.login(credentials);
            if(accessToken) {
                bake_cookie("tokenServer", accessToken);
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
            navigate("/");
        }
    };

    const logout = () => {
        // Clear the cookie
        delete_cookie("tokenServer");
        navigate("/");
    };

    const isAuthenticated = () => {
        return read_cookie("tokenServer").length ? true : false;
    };

    const authUser = () => {
        const token = read_cookie("tokenServer");
        if(token.length) {
            console.log(typeof token === "string" ? jwtDecode(token) : null)
            return typeof token === "string" ? jwtDecode(token) : null;
        }
        return null
    }

    return {
        isAuthenticated,
        isLoading,
        login,
        logout,
        authUser
    };
}