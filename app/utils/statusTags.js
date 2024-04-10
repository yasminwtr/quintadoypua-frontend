import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const statusMap = {
  1: { icon: <ClockCircleOutlined />, color: 'gold', text: 'Aguardando pagamento' },
  2: { icon: <ClockCircleOutlined />, color: 'orange', text: 'Pendente' },
  3: { icon: <CheckCircleOutlined />, color: 'green', text: 'Confirmada' },
  4: { icon: <CloseCircleOutlined />, color: 'red', text: 'Cancelada' },
  5: { icon: <CheckCircleOutlined />, color: 'magenta', text: 'Check-In Realizado' },
  6: { icon: <CheckCircleOutlined />, color: 'purple', text: 'Check-Out Realizado' },
  7: { icon: <CheckCircleOutlined />, color: 'geekblue', text: 'Finalizada' },
};

export function StatusTag(idstatus) {
  const status = statusMap[idstatus];
  if (!status) return null;

  const { icon, color, text } = status;
  return <Tag icon={icon} color={color}>{text}</Tag>;
}