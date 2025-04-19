import axios from "@/lib/axios";
import CryptoJS from "crypto-js";

interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Handles user authentication with the server
 */
export const authApi = {
  /**
   * Authenticates user credentials
   */
  login: async (credentials: LoginCredentials) => {
    const encryptedPassword = CryptoJS.AES.encrypt(
      credentials.password,
      import.meta.env.VITE_REACT_APP_PASS_KEY
    ).toString();
    
    const response = await axios.post('/auth/sign_in', {
      email: credentials.email,
      password: encryptedPassword
    });
    
    return response.data;
  }
};
