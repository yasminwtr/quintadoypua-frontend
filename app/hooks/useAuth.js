// "use client"
import CryptoJS from 'crypto-js';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import { useState, useEffect } from 'react';

const useAuth = () => {
    const localSecretKey = "85dscybe8b5f5486732b479395c48897a";

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

    const removeTokenFromStorage = () => {
        localStorage.removeItem('token');
    };

    const getUser = () => {
        const token = getTokenFromStorage();

        if (!token) {
            return null;
        }

        const user = jwt.decode(token);
        return user;
    };

    const user = getUser()

    return { user, setTokenToStorage, removeTokenFromStorage, getTokenFromStorage };
};

export default useAuth;