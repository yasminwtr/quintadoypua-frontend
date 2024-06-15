"use client"
import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../api/api';
import CryptoJS from 'crypto-js';
import jwt, { JwtPayload } from 'jsonwebtoken';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const localSecretKey = "85dscybe8b5f5486732b479395c48897a";
    const router = useRouter();

    const getTokenFromStorage = () => {
        try {
            const encryptedToken = localStorage.getItem('token');
            if (encryptedToken === null) {
                return null;
            }

            const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, localSecretKey).toString(CryptoJS.enc.Utf8);
            if (!decryptedToken) {
                console.error('Decryption failed or resulted in an empty token.');
                removeTokenFromStorage();
                return null;
            }

            return decryptedToken;
        } catch (error) {
            console.error('An error occurred while getting the token:', error);
            return null;
        }
    };

    const setTokenToStorage = (token) => {
        const encryptedToken = CryptoJS.AES.encrypt(token, localSecretKey).toString();
        localStorage.setItem('token', encryptedToken);

        const expirationTimeMillis = 4 * 60 * 60 * 1000;
        setTimeout(() => {
            removeTokenFromStorage();
        }, expirationTimeMillis);
    };

    const getUser = () => {
        const token = getTokenFromStorage();

        if (!token) {
            return null;
        }

        setUser(jwt.decode(token))
    };

    const login = async (formData) => {
        try {
            const response = await api.post("/auth/login", formData);

            if (response.status >= 200 && response.status < 300) {
                const loginData = response.data;
                setTokenToStorage(loginData.token)
                getUser()
                router.replace('/')

            } else {
                alert('Um erro ocorreu durante o login. Por favor tente novamente mais tarde.');
            }

        } catch (error) {
            console.log(error);
        }
    };

    function logout() {
        localStorage.removeItem('token');
        router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
