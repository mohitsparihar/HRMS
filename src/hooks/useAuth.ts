import axios from "@/lib/axios";
import { useState } from "react";
import CryptoJS from "crypto-js";
import { bake_cookie, delete_cookie, read_cookie } from "sfcookies";


export function useAuth() {
    const [isLoading, setIsLoading] = useState(false)

    const login = async (credentials: {email: string, password: string}) => {
        try {
            setIsLoading(true)
            const password = CryptoJS.AES.encrypt( credentials.password, import.meta.env.VITE_REACT_APP_PASS_KEY ).toString();
            const response = await axios.post('/auth/sign_in', {email: credentials.email, password})
            const {accessToken} = response.data;
            if(accessToken) {
                bake_cookie( "tokenServer", accessToken );
            }
        } catch (error) {
            console.error('Login failed:', error)
        } finally{
            setIsLoading(false)
        }
    }

    const logout = () => {
        // Clear the cookie
        delete_cookie("tokenServer")
    };

    const isAuthenticated = () => {
        return read_cookie("tokenServer").length ? true : false 
    }

    return {
        isAuthenticated,
        isLoading,
        login,
        logout
    }
}