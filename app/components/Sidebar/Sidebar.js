"use client"
import { Tooltip } from 'antd';
import styles from '@/app/components/Sidebar/sidebar.module.css';
import { siderbarItems } from '@/app/utils/siderbarItems';
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const onClick = (path) => {
        return router.push(path);
    };

    return (
        <div className={styles.menu}>
            {siderbarItems.map((item) => (
                <Tooltip
                    key={item.title}
                    placement="right"
                    title={item.title}
                    onClick={() => onClick(item.path)}
                    className={pathname === item.path ? styles.active : ''}
                >
                    {item.icon}
                </Tooltip>
            ))}
        </div>
    );
}
