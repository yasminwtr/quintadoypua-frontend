"use client"
import { useState, useEffect, useContext } from 'react';
import api from '@/app/api/api';
import { notification } from 'antd';
import AuthContext from '@/app/auth/AuthContext';
import jwt from 'jsonwebtoken';

const useClient = () => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = notification.useNotification();
    const { getTokenFromStorage } = useContext(AuthContext);

    const alertMessage = (type, message, description, placement) => {
        messageApi[type]({
            message: message,
            description: description,
            placement: placement ? placement : 'topRight',
        });
    };

    const deleteClient = async (id) => {
        try {
            const response = await api.delete(`/client/${id}`);
            notification.success({ message: 'Operação realizada com sucesso!', description: 'Sua conta foi deletada.' })
        } catch (error) {
            console.error('Erro ao deletar dados:', error);
            setError(error);
            if (error.response) {
                notification.error({ message: `Ocorreu um erro ${error.response.status} ao realizar a operação.`, description: 'Por favor tente novamente ou contate o administrador do site.' })
            }
        }
    };

    const getUser = async () => {
        try {
            const token = getTokenFromStorage();

            if (!token) {
                return null;
            }

            const userInfo = jwt.decode(token);
            setUser(userInfo)
            setLoading(false)

        } catch (error) {
            if (error.response) {
                notification.error({ message: `Ocorreu um erro ${error.response.status} ao realizar a operação.`, description: 'Por favor tente novamente ou contate o administrador do site.' })
            } else {
                notification.error({ message: `Ocorreu um erro ao realizar a operação.`, description: 'Por favor tente novamente ou contate o administrador do site.' })
            }
            console.log(error);
        }
    };

    const updateClient = async (client) => {
        try {
            const response = await api.post(`/client/${client.id}`, {
                name: client.name,
                email: client.email,
                password: client.password
            });
            notification.success({ message: 'Operação realizada com sucesso!', description: 'Dados atualizados.' })
        } catch (error) {
            if (error.response) {
                notification.error({ message: `Ocorreu um erro ${error.response.status} ao realizar a operação.`, description: 'Por favor tente novamente ou contate o administrador do site.' })
            }
            console.log(error);
        }
    };

    return { loading, user, error, contextHolder, updateClient, deleteClient, getUser };
};

export default useClient;