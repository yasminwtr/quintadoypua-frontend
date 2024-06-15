"use client"
import dayjs from 'dayjs';
import { Button, Drawer, Space } from 'antd';
import FormReservation from '@/app/components/ReservationDrawer/Form'

export default function EditReservation({ selectedReservation, newReservation, setNewReservation, open, onClose, addReservation, checkInOut, updateStatus }) {
    const dateFormat = 'DD/MM/YYYY';
    const canEdit = !selectedReservation?.statusid

    const handleFormChange = (e, option) => {
        if (!option) {
            const { name, value } = e.target;
            let daysValue = newReservation?.days

            if (name === 'reservationtime') {
                daysValue = !value ? 0 : (dayjs(value[1]?.$d).diff(dayjs(value[0]?.$d), 'day') + 1)
            }

            setNewReservation((prevData) => ({
                ...prevData,
                [name]: value,
                days: daysValue,
                totalvalue: daysValue * prevData.daily
            }));

        } else {
            const { value, daily, maxguest } = option;

            setNewReservation((prevData) => ({
                ...prevData,
                roomid: value || '',
                daily,
                maxguest,
                totalvalue: prevData.days * daily
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addReservation(newReservation, onClose())
    };

    return (
        <Drawer
            title={canEdit ? 'Nova reserva' : `Reserva ${selectedReservation.id}`}
            width={720}
            onClose={onClose}
            open={open}
            styles={{ footer: { padding: 22 } }}
            footer={
                <Space>
                    {canEdit &&
                        <Button type="primary" htmlType="submit" form="editReservationForm" onClick={e => handleSubmit(e)}>
                            Salvar
                        </Button>
                    }
                    {selectedReservation?.statusid == 2 &&
                        <Button type="primary" onClick={() => updateStatus(selectedReservation.id, 3, 'confirmada', onClose())}>
                            Confirmar reserva
                        </Button>
                    }
                    {selectedReservation?.statusid == 3 &&
                        <Button type="primary" onClick={() => checkInOut(selectedReservation.id, true, false, onClose())}>
                            Confirmar Check-In
                        </Button>
                    }
                    {selectedReservation?.statusid == 5 &&
                        <Button type="primary" onClick={() => checkInOut(selectedReservation.id, false, true, onClose())}>
                            Confirmar Check-Out
                        </Button>
                    }
                    {selectedReservation?.statusid == 6 &&
                        <Button type="primary" onClick={() => updateStatus(selectedReservation.id, 7, 'finalizada', onClose())}>
                            Finalizar reserva
                        </Button>
                    }
                    {(selectedReservation?.statusid == 1 || selectedReservation?.statusid == 2 || selectedReservation?.statusid == 3) && (selectedReservation?.statusid != 4) &&
                        <Button type="primary" danger onClick={() => updateStatus(selectedReservation.id, 4, 'cancelada', onClose())}>
                            Cancelar reserva
                        </Button>
                    }
                </Space>
            }
        >
            <FormReservation
                reservation={selectedReservation}
                canEdit={canEdit}
                dateFormat={dateFormat}
                newReservation={newReservation}
                handleFormChange={handleFormChange}
            />
        </Drawer>
    );
}
