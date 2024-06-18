"use client"
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import api from '@/app/api/api';
import { notification } from 'antd';

const useReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [confirmedReservations, setConfirmedReservations] = useState([]);
    const [reservationStatus, setReservationStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageApi, contextHolder] = notification.useNotification();

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

    const addReservation = async (reservation, onClose) => {
        try {
            const response = await api.post("/reservation/add", {
                clientId: reservation.clientid,
                employeeId: reservation.employeeid,
                roomId: reservation.roomid,
                startDate: dayjs(reservation.reservationtime[0]?.$d).format('YYYY-MM-DD'),
                endDate: dayjs(reservation.reservationtime[1]?.$d).format('YYYY-MM-DD'),
                nameGuest: reservation.nameguest,
                emailGuest: reservation.emailguest,
                contactGuest: reservation.contactguest,
                observation: reservation.observation,
                adults: reservation.adults,
                children: reservation.children,
                totalValue: reservation.totalvalue,
                statusId: 3, // confirmada 
                internalReservation: reservation.internalreservation,
            });

            alert('cadastrada')
            if (reservation.internalreservation === true) {
                notification.success({ message: 'Operação realizada com sucesso!', description: 'Reserva cadastrada.' })
                fetchReservations();
                onClose();
            } else {
                notification.success({ message: 'Operação realizada com sucesso!', description: 'A sua estadia foi reservada.' })
            }

        } catch (error) {
            if (error.response) {
                notification.error({ message: `Ocorreu um erro ${error.response.status} ao realizar a operação.`, description: 'Por favor tente novamente ou contate o administrador do site.' })
            }
            console.log(error);
        }
    };

    const checkInOut = async (id, checkIn, checkOut, onClose) => {
        try {
            console.log(checkIn, checkOut);
            const response = await api.put(`/reservation/checkinout/${id}`, {
                checkIn: checkIn,
                checkOut: checkOut,
                statusId: checkIn ? 5 : 6,
            });

            notification.success({ message: 'Operação realizada com sucesso!', description: `${checkIn ? 'Check-in registrado e status atualizado.' : 'Check-out registrado e status atualizado.'}` })
            fetchReservations();
            onClose();

        } catch (error) {
            if (error.response) {
                notification.error({ message: `Ocorreu um erro ${error.response.status} ao realizar a operação.`, description: 'Por favor tente novamente ou contate o administrador do site.' })
            }
        }
    };

    const updateStatus = async (id, statusId, status, onClose) => {
        try {
            const response = await api.put(`/reservation/status/${id}`, {
                statusId: statusId
            });

            notification.success({ message: 'Operação realizada com sucesso!', description: `A reserva foi ${status}.` })
            fetchReservations();
            onClose()

        } catch (error) {
            if (error.response) {
                notification.error({ message: `Ocorreu um erro ${error.response.status} ao realizar a operação.`, description: 'Por favor tente novamente ou contate o administrador do site.' })
            }
        }
    };

    useEffect(() => {
        fetchReservations();
        fetchStatus();
        fetchConfirmedReservations();
    }, []);

    return { reservations, confirmedReservations, reservationStatus, addReservation, checkInOut, updateStatus, loading, error, contextHolder };
};

export default useReservations;