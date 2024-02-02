import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(false);
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken") || null
    );

    const login = async (inputs) => {
        try {
            const res = await axios.post("Auth/Login", inputs);
            localStorage.setItem("accessToken", res.data?.access_token);
            setAccessToken(res.data?.access_token);
            setTimeout(() => {
                setUser();
            }, 500);
            return res;
        } catch (error) {
            return error.response;
        }
    };

    const logout = async () => {
        await axios.post(
            "Auth/Logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        setCurrentUser(null);
    };

    const setUser = async () => {
        try {
            if (!accessToken) return;
            const { data } = await axios.post(
                "Auth/Me",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setCurrentUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        localStorage.setItem("accessToken", accessToken);
    }, [accessToken]);

    useEffect(() => {
        setUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
};
