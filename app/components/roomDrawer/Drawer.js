"use client"
import dayjs from 'dayjs';
import { Button, Drawer, Space } from 'antd';
import FormRoom from '@/app/components/roomDrawer/Form'



export default function EditRoomForm({ selectedRoom, newRoom, setNewRoom, open, onClose, addRoom, checkInOut, updateStatus }) {
    const dateFormat = 'DD/MM/YYYY';
    const canEdit = !selectedRoom?.statusid

    const handleFormChange = (e, option) => {
        if (!option) {
            const { name, value } = e.target;
            let daysValue = newRoom?.days

            if (name === 'roomtime') {
                daysValue = !value ? 0 : (dayjs(value[1]?.$d).diff(dayjs(value[0]?.$d), 'day') + 1)
            }

            setNewRoom((prevData) => ({
                ...prevData,
                [name]: value,
                days: daysValue,
                totalvalue: daysValue * prevData.daily
            }));

        } else {
            const { value, daily, maxguest } = option;

            setNewRoom((prevData) => ({
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
        addRoom(newRoom, onClose())
    };

    return (
        <Drawer
            title={canEdit ? 'Adicionar' : `Reserva ${selectedRoom.id}`}
            width={720}
            onClose={onClose}
            open={open}
            styles={{ footer: { padding: 22 } }}
            footer={
                <Space>
                    {canEdit &&
                        <Button type="primary" htmlType="submit" form="EditRoomForm" onClick={e => handleSubmit(e)}>
                            Salvar
                        </Button>
                    }
                    {selectedRoom?.statusid == 2 &&
                        <Button type="primary" onClick={() => updateStatus(selectedRoom.id, 3, 'confirmada', onClose())}>
                            Confirmar reserva
                        </Button>
                    }
                    {selectedRoom?.statusid == 3 &&
                        <Button type="primary" onClick={() => checkInOut(selectedRoom.id, true, false, onClose())}>
                            Confirmar Check-In
                        </Button>
                    }
                    {selectedRoom?.statusid == 5 &&
                        <Button type="primary" onClick={() => checkInOut(selectedRoom.id, false, true, onClose())}>
                            Confirmar Check-Out
                        </Button>
                    }
                    {selectedRoom?.statusid == 6 &&
                        <Button type="primary" onClick={() => updateStatus(selectedRoom.id, 7, 'finalizada', onClose())}>
                            Finalizar reserva
                        </Button>
                    }
                    {(selectedRoom?.statusid == 1 || selectedRoom?.statusid == 2 || selectedRoom?.statusid == 3) && (selectedRoom?.statusid != 4) &&
                        <Button type="primary" danger onClick={() => updateStatus(selectedRoom.id, 4, 'cancelada', onClose())}>
                            Cancelar reserva
                        </Button>
                    }
                </Space>
            }
        >
            <FormRoom
                room={selectedRoom}
                canEdit={canEdit}
                dateFormat={dateFormat}
                newRoom={newRoom}
                handleFormChange={handleFormChange}
            />
        </Drawer>
    );
}
