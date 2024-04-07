"use client"
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { format } from 'date-fns';
import FormReservation from '@/app/components/ReservationDrawer/Form'

export default function EditReservation({ selectedReservation, setSelectedReservation, open, onClose }) {
    const [form] = Form.useForm();
    const dateFormat = 'DD/MM/YYYY';
    const canEdit = !selectedReservation?.statusid
    const initialStateNewReservation = {
        employeeId: '',
        id: '',
        solicitationDate: '',
        room: '',
        daily: 0,
        guest: '',
        email: '',
        contact: '',
        adults: 1,
        childs: 0,
        totalGuests: 1,
        maxGuest: '',
        reservationTime: '',
        days: 0,
        totalValue: 0,
        status: '',
        observation: '',
    };
    const [newReservation, setNewReservation] = useState(initialStateNewReservation)

    useEffect(() => {
        const fieldsToSet = selectedReservation ? {
            id: selectedReservation.id,
            solicitationDate: format(selectedReservation?.solicitationdate, 'dd/MM/yyyy'),
            room: selectedReservation.roomid,
            guest: selectedReservation.nameguest,
            email: selectedReservation.emailguest,
            contact: selectedReservation.contactguest,
            adults: selectedReservation.adults,
            childs: selectedReservation.children,
            reservationTime: [dayjs(selectedReservation.startdate), dayjs(selectedReservation.enddate)],
            status: selectedReservation.status,
            observation: selectedReservation.observation,
        } : newReservation;

        setSelectedReservation(selectedReservation);
        form.setFieldsValue(fieldsToSet);

    }, [selectedReservation]);

    const handleFormChange = (changedValues, allValues) => {
        setNewReservation({
            ...newReservation,
            room: allValues.room.value,
            daily: allValues.room.title?.daily,
            guest: allValues.guest,
            email: allValues.email,
            contact: allValues.contact,
            adults: allValues.adults,
            childs: allValues.childs,
            totalGuests: allValues.adults + allValues.childs,
            maxGuest: allValues.room.title?.maxguest,
            reservationTime: allValues.reservationTime,
            // na hora de salvar fzr a formatação da data q nem ta abaixo:
            // se eu faço salvo ja formatado, da erro qnd altera qql valor dps no form.
            // reservationTime: [dayjs(allValues.reservationTime[0]?.$d).format('YYYY-MM-DD'), dayjs(allValues.reservationTime[1]?.$d).format('YYYY-MM-DD')],
            days: !allValues.reservationTime ? 0 : dayjs(allValues.reservationTime[1]?.$d).diff(dayjs(allValues.reservationTime[0]?.$d), 'day') + 1,
            status: allValues.status,
            observation: allValues.observation
        });
    };

    useEffect(() => {
        if (!open) {
            form.setFieldsValue(newReservation)
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
                        <Button type="primary" htmlType="submit" form="editReservationForm">
                            Salvar
                        </Button>
                    }
                    {/* status 1 é pendente */}
                    {selectedReservation?.statusid == 1 &&
                        <Button type="primary">
                            Confirmar reserva
                        </Button>
                    }
                    {/* status 3 é cancelado e 2 é confirmada */}
                    {(selectedReservation?.statusid == 1 || selectedReservation?.statusid == 2) && (selectedReservation?.statusid != 3) &&
                        <Button type="primary" danger>
                            Cancelar reserva
                        </Button>
                    }
                    {/* status 5 é checkout feito */}
                    {selectedReservation?.statusid == 5 &&
                        <Button type="primary">
                            Finalizar reserva
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
