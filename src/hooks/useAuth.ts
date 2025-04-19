import { useState } from "react";
import { bake_cookie, delete_cookie, read_cookie } from "sfcookies";
import { authApi } from "@/api/auth";

export function useAuth() {
    const [isLoading, setIsLoading] = useState(false);

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
        }
    };

    const logout = () => {
        // Clear the cookie
        delete_cookie("tokenServer");
    };

    const isAuthenticated = () => {
        return read_cookie("tokenServer").length ? true : false;
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout
    };
}