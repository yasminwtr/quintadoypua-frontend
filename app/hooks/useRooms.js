"use client"
import { useState, useEffect } from 'react';
import api from '@/app/api/api';

const useRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return { rooms, room, loading, error, fetchRoomById };
};

export default useRooms;