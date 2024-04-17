import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const statusMap = {
  1: { icon: <ClockCircleOutlined />, color: 'gold'},
  2: { icon: <ClockCircleOutlined />, color: 'orange'},
  3: { icon: <CheckCircleOutlined />, color: 'green'},
  4: { icon: <CloseCircleOutlined />, color: 'red'},
  5: { icon: <CheckCircleOutlined />, color: 'purple'},
  6: { icon: <CheckCircleOutlined />, color: 'magenta'},
  7: { icon: <CheckCircleOutlined />, color: 'geekblue'},
};

export function StatusTag(idstatus, statusText) {
  const status = statusMap[idstatus];
  if (!status) return null;

  const { icon, color } = status;
  return <Tag icon={icon} color={color}>{statusText}</Tag>;
}