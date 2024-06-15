"use client"
import { useAuth } from './AuthContext';
import { useEffect } from 'react';
import Router from 'next/router';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user } = useAuth();

        useEffect(() => {
            if (!user) {
                Router.push('/login');
            }
        }, [user]);

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
