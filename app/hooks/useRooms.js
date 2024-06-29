"use client"
import { useState, useEffect } from 'react';
import api from '@/app/api/api';
import { notification } from 'antd';

const useRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState(null);
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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/room');
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const fetchRoomById = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/room/${id}`);
            setRoom(response.data);
            setLoading(false);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setError(error);
            setLoading(false);
        }
    };

    const updateRoom = async (room, id) => {
        try {
            await api.post(`/room/edit/${id}`, {
                name: room.name,
                description: room.description,
                maxGuest: room.maxGuest,
                daily: room.daily,
                url: room.url
            });
            setRooms((prevRooms) => prevRooms.map(r => r.id === id ? { ...r, ...room } : r)); // Atualiza a lista de quartos
            alertMessage('success', 'Operação realizada com sucesso!', 'Dados atualizados.');
        } catch (error) {
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
            }
            console.error('Erro ao atualizar dados:', error);
        }
    };
    

    const deleteRoom = async (id) => {
        try {
            await api.delete(`/room/delete/${id}`);
            setRooms((prevRooms) => prevRooms.filter(r => r.id !== id)); // Remove o quarto da lista
            alertMessage('success', 'Operação realizada com sucesso!', 'Quarto Deletado.');
        } catch (error) {
            console.error('Erro ao deletar dados:', error);
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
            }
        }
    };


    return { rooms, room, loading, error, updateRoom, deleteRoom, fetchRoomById};
};

export default useRooms;