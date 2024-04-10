"use client"
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import api from '@/app/api/api';

const useReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [confirmedReservations, setConfirmedReservations] = useState([]);
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

    const fetchConfirmedReservations = async () => {
        try {
            const response = await api.get('/reservation/valid');
            setConfirmedReservations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setError(error);
            setLoading(false);
        }
    };

    const addReservation = async (reservation) => {
        console.log(reservation);
        try {
            const response = await api.post("/reservation/add", {
                clientId: reservation.clientId,
                employeeId: reservation.employeeId,
                roomId: reservation.room,
                startDate: dayjs(reservation.reservationTime[0]?.$d).format('YYYY-MM-DD'),
                endDate: dayjs(reservation.reservationTime[1]?.$d).format('YYYY-MM-DD'),
                nameGuest: reservation.guest,
                emailGuest: reservation.email,
                contactGuest: reservation.contact,
                observation: reservation.observation,
                adults: reservation.adults,
                children: reservation.children,
                totalValue: reservation.totalValue,
                statusId: !clientId ? 3 : 1,
                internalReservation: reservation.internalReservation,
            });

            fetchReservations();

        } catch (error) {
            if (error.response) {
                console.error('Registration failed with status code:', error.response.status);
                console.error('Error details:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    const checkInOut = async (id, checkIn, checkOut) => {
        try {
            console.log(checkIn, checkOut);
            const response = await api.put(`/reservation/checkinout/${id}`, {
                checkIn: checkIn,
                checkOut: checkOut
            });

            if(response && response.status >= 200 && response.status < 300) {
                updateStatus(id, checkIn ? 5 : 6);
                fetchReservations();
            }

        } catch (error) {
            if (error.response) {
                console.error('Registration failed with status code:', error.response.status);
                console.error('Error details:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await api.put(`/reservation/status/${id}`, {
                statusId: status
            });
            fetchReservations();

        } catch (error) {
            if (error.response) {
                console.error('Registration failed with status code:', error.response.status);
                console.error('Error details:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    useEffect(() => {
        fetchReservations();
        fetchStatus();
        fetchConfirmedReservations();
    }, []);

    return { reservations, confirmedReservations, reservationStatus, addReservation, checkInOut, updateStatus, loading, error };
};

export default useReservations;