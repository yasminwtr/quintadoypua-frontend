"use client"
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import FormReservation from '@/app/components/ReservationDrawer/Form'

export default function EditReservation({ selectedReservation, setSelectedReservation, open, onClose, addReservation, checkInOut, updateStatus }) {
    const [form] = Form.useForm();
    const dateFormat = 'DD/MM/YYYY';
    const canEdit = !selectedReservation?.statusid
    const initialStateNewReservation = {
        clientId: null,
        employeeId: null, // qnd aplicar a autenticação, o valor aqui vai ser do funcionario logado
        id: '',
        solicitationDate: '',
        room: '',
        daily: 0,
        guest: '',
        email: '',
        contact: '',
        adults: 1,
        children: 0,
        totalGuests: 1,
        maxGuest: '',
        reservationTime: '',
        days: 0,
        totalValue: 0,
        status: 3, // confirmada
        observation: '',
        internalReservation: true
    };
    const [newReservation, setNewReservation] = useState(initialStateNewReservation)

    useEffect(() => {
        const fieldsToSet = selectedReservation ? {
            id: selectedReservation.id,
            solicitationDate: selectedReservation?.solicitationdate,
            room: selectedReservation.roomid,
            guest: selectedReservation.nameguest,
            email: selectedReservation.emailguest,
            contact: selectedReservation.contactguest,
            adults: selectedReservation.adults,
            children: selectedReservation.children,
            reservationTime: [dayjs(selectedReservation.startdate), dayjs(selectedReservation.enddate)],
            status: selectedReservation.status,
            observation: selectedReservation.observation,
        } : newReservation;

        setSelectedReservation(selectedReservation);
        form.setFieldsValue(fieldsToSet);

    }, [selectedReservation]);

    const handleFormChange = (changedValues, allValues) => {
        const key = Object.keys(changedValues)[0];
        const value = changedValues[key];
        setNewReservation((prevData) => ({
            ...prevData,
            [key]: value,
            room: allValues.room?.value || '',
            daily: allValues.room?.title?.daily || 0,
            totalGuests: allValues.adults + allValues.children,
            maxGuest: allValues.room?.title?.maxguest || '',
            days: !allValues.reservationTime ? 0 : dayjs(allValues.reservationTime[1]?.$d).diff(dayjs(allValues.reservationTime[0]?.$d), 'day') + 1,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newReservation);
        addReservation(newReservation)
    };

    useEffect(() => {
        if (!open) {
            setNewReservation(initialStateNewReservation)
            form.setFieldsValue(initialStateNewReservation)
            setSelectedReservation(null)
        }
    }, [open]);

    return (
        <Drawer
            title={canEdit ? 'Nova reserva' : `Reserva ${selectedReservation.id}`}
            width={720}
            onClose={onClose}
            open={open}
            styles={{
                footer: {
                    padding: 22
                }
            }}
            footer={
                <Space>
                    {canEdit &&
                        <Button type="primary" htmlType="submit" form="editReservationForm" onClick={e => handleSubmit(e)}>
                            Salvar
                        </Button>
                    }
                    {selectedReservation?.statusid == 2 &&
                        <Button type="primary" onClick={() => updateStatus(selectedReservation.id, 3)}>
                            Confirmar reserva
                        </Button>
                    }
                    {selectedReservation?.statusid == 3 &&
                        <Button type="primary" onClick={() => checkInOut(selectedReservation.id, true, false)}>
                            Confirmar Check-In
                        </Button>
                    }
                    {selectedReservation?.statusid == 5 &&
                        <Button type="primary" onClick={() => checkInOut(selectedReservation.id, false, true)}>
                            Confirmar Check-Out
                        </Button>
                    }
                    {selectedReservation?.statusid == 6 &&
                        <Button type="primary" onClick={() => updateStatus(selectedReservation.id, 7)}>
                            Finalizar reserva
                        </Button>
                    }
                    {(selectedReservation?.statusid == 1 || selectedReservation?.statusid == 2 || selectedReservation?.statusid == 3) && (selectedReservation?.statusid != 4) &&
                        <Button type="primary" danger onClick={() => updateStatus(selectedReservation.id, 4)}>
                            Cancelar reserva
                        </Button>
                    }
                </Space>
            }
        >
            <FormReservation
                form={form}
                handleFormChange={handleFormChange}
                reservation={selectedReservation}
                canEdit={canEdit}
                dateFormat={dateFormat}
                newReservation={newReservation}
            />
        </Drawer>
    );
}
