import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const statusMap = {
    2: { icon: <ClockCircleOutlined />, color: 'orange' },
    3: { icon: <CheckCircleOutlined />, color: 'green' },
    5: { icon: <CheckCircleOutlined />, color: 'purple' },
    6: { icon: <CheckCircleOutlined />, color: 'magenta' },
    7: { icon: <CheckCircleOutlined />, color: 'geekblue' },
};

export function CalendarReservations(idstatus, idreservation) {
    const status = statusMap[idstatus];
    if (!status) return null;

    const { icon, color } = status;
    return <Tag icon={icon} color={color}>Reserva {idreservation}</Tag>;
}