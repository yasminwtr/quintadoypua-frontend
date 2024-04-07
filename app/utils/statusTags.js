import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const statusMap = {
    1: { icon: <ClockCircleOutlined />, color: 'orange', text: 'Pendente' },
    2: { icon: <CheckCircleOutlined />, color: 'green', text: 'Confirmada' },
    3: { icon: <CloseCircleOutlined />, color: 'red', text: 'Cancelada' },
    4: { icon: <CheckCircleOutlined />, color: 'magenta', text: 'Check-In Realizado' },
    5: { icon: <CheckCircleOutlined />, color: 'purple', text: 'Check-Out Realizado' },
    6: { icon: <CheckCircleOutlined />, color: 'geekblue', text: 'Finalizada' },
  };
  
  export function StatusTag(idstatus) {
    const status = statusMap[idstatus];
    if (!status) return null; 
    
    const { icon, color, text } = status;
    return <Tag icon={icon} color={color}>{text}</Tag>;
  }