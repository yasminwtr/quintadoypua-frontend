"use client"
import { useContext } from 'react';
import { Tooltip } from 'antd';
import styles from '@/app/components/Sidebar/sidebar.module.css';
import { usePathname, useRouter } from "next/navigation";
import { CalendarOutlined, TeamOutlined, TagsOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import AuthContext from '@/app/auth/AuthContext';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { logout } = useContext(AuthContext);

    return (
        <div className={styles.menu}>
            <Tooltip
                placement="right"
                title="Calendário de Reservas"
                onClick={() => router.push('/calendar')}
                className={pathname === "/calendar" ? styles.active : ''}
            >
                <CalendarOutlined style={{ fontSize: '26px', color: '#fff' }} />
            </Tooltip>

            <Tooltip
                placement="right"
                title="Gerenciamento de Reservas"
                onClick={() => router.push('/reservationManagement')}
                className={pathname === "/reservationManagement" ? styles.active : ''}
            >
                <TagsOutlined style={{ fontSize: '26px', color: '#fff' }} />
            </Tooltip>

            <Tooltip
                placement="right"
                title="Gerenciamento de Funcionários"
                onClick={() => router.push('/employeeManagement')}
                className={pathname === "/employeeManagement" ? styles.active : ''}
            >
                <TeamOutlined style={{ fontSize: '26px', color: '#fff' }} />
            </Tooltip>

            <Tooltip
                placement="right"
                title="Minha conta"
                onClick={() => router.push('/userEdit')}
                className={pathname === "/userEdit" ? styles.active : ''}
            >
                <UserOutlined style={{ fontSize: '26px', color: '#fff' }} />
            </Tooltip>

            <Tooltip
                placement="right"
                title="Sair"
                onClick={logout}
            >
                <LogoutOutlined style={{ fontSize: '25px', color: '#fff' }} />
            </Tooltip>
        </div>
    );
}
