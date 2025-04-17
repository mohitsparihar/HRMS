import { useState } from "react"

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const login = () => {
        setIsLoading(true)
        setIsAuthenticated(true)
        setIsLoading(false)
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    return {
        isAuthenticated,
        isLoading,
        login,
        logout
    }
}