import { CalendarOutlined, TeamOutlined, TagsOutlined } from '@ant-design/icons';

export const siderbarItems = [
    { icon: <CalendarOutlined style={{ fontSize: '26px', color: '#fff' }} />, title: 'Calendário de Reservas', path: '/calendar' },
    { icon: <TagsOutlined style={{ fontSize: '26px', color: '#fff' }} />, title: 'Gerenciamento de Reservas', path: '/reservationManagement' },
    { icon: <TeamOutlined style={{ fontSize: '26px', color: '#fff' }} />, title: 'Gerenciamento de Funcionários', path: '/employeeManagement' }
]