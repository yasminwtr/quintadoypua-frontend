"use client"
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import api from '@/app/api/api';
import { notification } from 'antd';

const useClient = () => {
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageApi, contextHolder] = notification.useNotification();

    const alertMessage = (type, message, description, placement) => {
        messageApi[type]({
            message: message,
            description: description,
            placement: placement ? placement : 'topRight',
        });
    };

    const fetchClient = async (id) => {
        try {
            const response = await api.get(`/client/${id}`);
            setClient(response.data)
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setError(error);
            setLoading(false);
        }
    };

    const deleteClient = async (id) => {
        try {
            const response = await api.delete(`/client/${id}`);
            setLoading(false);
            alertMessage('success', 'Operação realizada com sucesso!', 'Usuário Deletado.');
        } catch (error) {
            console.error('Erro ao deletar dados:', error);
            setError(error);
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
            }
        }
    };

    const updateClient = async (client) => {
        try {
            const response = await api.post(`/client/${client.id}`, {
                name: client.name,
                email: client.email,
                password: client.password
            });
            setLoading(false);
            alertMessage('success', 'Operação realizada com sucesso!', 'Dados atualizados.');
        } catch (error) {
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
            }
            console.log(error);
        }
    };

    // useEffect(() => {
    //     fetchClient();
    // }, []);

    return { client, fetchClient, loading, error, contextHolder, updateClient, deleteClient };
};

export default useClient;