"use client"
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../api/api';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const localSecretKey = "85dscybe8b5f5486732b479395c48897a";
    const router = useRouter();

    const removeTokenFromStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

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

    const setTokenToStorage = (token, role) => {
        const encryptedToken = CryptoJS.AES.encrypt(token, localSecretKey).toString();
        localStorage.setItem('token', encryptedToken);
        localStorage.setItem('role', role);

        const expirationTimeMillis = 4 * 60 * 60 * 1000;
        setTimeout(() => {
            removeTokenFromStorage();
        }, expirationTimeMillis);
    };

    const login = async (formData) => {
        if (!formData.email || !formData.password) {
            alert('Por favor preencha todos os campos.');
            return;
        }

        try {
            const response = await api.post("/auth/login", formData);

            if (response.status >= 200 && response.status < 300) {
                const loginData = response.data;
                setTokenToStorage(loginData.token, loginData.role)
                if (loginData.role === 'client') {
                    router.replace('/myReservation')

                } else if (loginData.role === 'employee') {
                    router.replace('/calendar')
                }

            } else {
                alert('Um erro ocorreu durante o login. Por favor tente novamente mais tarde.');
            }

        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        removeTokenFromStorage()
        router.replace('/login');
    };

    return (
        <AuthContext.Provider value={{ login, logout, getTokenFromStorage }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;