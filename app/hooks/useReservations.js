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

    const alertMessage = (type, message, description, placement) => {
        messageApi[type]({
            message: message,
            description: description,
            placement: placement ? placement : 'topRight',
        });
    };

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
                statusId: !reservation.clientid ? 3 : 1, // confirmada ou aguardando pagto
                internalReservation: reservation.internalreservation,
                // internalReservation: reservation.internalReservation, -> qnd houver id do funcionario logado, deve ser true. e qnd n houver, false. tirar do newstate dps lá
            });

            alertMessage('success', 'Operação realizada com sucesso!', 'Reserva cadastrada.');
            fetchReservations();
            onClose();

        } catch (error) {
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
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

            alertMessage('success', 'Operação realizada com sucesso!', checkIn ? 'Check-in registrado e status atualizado.' : 'Check-out registrado e status atualizado.');
            fetchReservations();
            onClose();

        } catch (error) {
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
            }
        }
    };

    const updateStatus = async (id, statusId, status, onClose) => {
        try {
            const response = await api.put(`/reservation/status/${id}`, {
                statusId: statusId
            });

            alertMessage('success', 'Operação realizada com sucesso!', `A reserva foi ${status}.`);
            fetchReservations();
            onClose()

        } catch (error) {
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
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