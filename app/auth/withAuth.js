"use client"
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/auth/AuthContext';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { getTokenFromStorage } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            const token = getTokenFromStorage();

            if (!token) {
                router.replace('/login');
            }

        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
