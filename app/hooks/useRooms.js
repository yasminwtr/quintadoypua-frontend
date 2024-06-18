"use client"
import { useState, useEffect } from 'react';
import api from '@/app/api/api';

const useRooms = () => {
    const [rooms, setRooms] = useState([]);
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

    return { rooms, loading, error };
};

export default useRooms;