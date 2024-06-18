"use client"
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/auth/AuthContext';

const withoutAuth = (WrappedComponent) => {
    return (props) => {
        const { getTokenFromStorage } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            const token = getTokenFromStorage();

            if (token) {
                const role = localStorage.getItem('role');
                if(role === 'client') {
                    router.replace('/myReservation');
                    
                } else if(role === 'employee') {
                    router.replace('/calendar');
                }
            }

        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withoutAuth;
