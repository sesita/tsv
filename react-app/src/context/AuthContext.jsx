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
        await axios.post("Auth/Logout",{},{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        localStorage.setItem("accessToken", null);
        setCurrentUser(null);
    };

    const setUser = async (token) => {
        setCurrentUser(false);
        try {
            const { data } = await axios.post("Auth/Me", {}, {
                    headers: {
                        Authorization: `Bearer ${token || accessToken}`,
                    },
                }
            );
            setCurrentUser(data);
        } catch (error) {
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        localStorage.setItem("accessToken", accessToken);
    }, [accessToken]);

    useEffect(() => {
        setUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, logout, login, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
};
