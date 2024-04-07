"use client"
import { useState, useEffect } from 'react';
import api from '@/app/api/api';

const useReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [reservationStatus, setReservationStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservations = async () => {
        try {
            const response = await api.get('/reservation');
            setReservations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setError(error);
            setLoading(false);
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await api.get('reservation/status');
            setReservationStatus(response.data);
        } catch (error) {
            console.error('Erro ao buscar status das reservas:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchReservations();
        fetchStatus();
    }, []);

    return { reservations, reservationStatus, loading, error };
};

export default useReservations;