import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const statusMap = {
    2: { icon: <ClockCircleOutlined />, color: 'orange', text: 'Pendente' },
    3: { icon: <CheckCircleOutlined />, color: 'green', text: 'Confirmada' },
    5: { icon: <CheckCircleOutlined />, color: 'purple', text: 'Check-In Realizado' },
    6: { icon: <CheckCircleOutlined />, color: 'magenta', text: 'Check-Out Realizado' },
    7: { icon: <CheckCircleOutlined />, color: 'geekblue', text: 'Finalizada' },
};

export function CalendarReservations(idstatus, idreservation) {
    const status = statusMap[idstatus];
    if (!status) return null;

    const { icon, color } = status;
    return <Tag icon={icon} color={color}>Reserva {idreservation}</Tag>;
}