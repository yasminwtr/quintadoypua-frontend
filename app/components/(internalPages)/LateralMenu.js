"use client"
import styles from "@/app/page.module.css";
import { Tooltip } from 'antd';
import { RiHotelBedFill } from "react-icons/ri";
import { FaUserTie, FaUsers } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";

export default function LateralMenu() {
    return (
        <div className="menu">
            <span>
                <Tooltip placement="right" title={'Calendário'}>
                    <FaCalendarCheck size={24} color="#fff" />
                </Tooltip>
            </span>

            <span>
                <Tooltip placement="right" title={'Reservas'}>
                    <RiHotelBedFill size={28} color="#fff" />
                </Tooltip>
            </span>

            <span>
                <Tooltip placement="right" title={'Funcionários'}>
                    <FaUserTie size={26} color="#fff" />
                </Tooltip>
            </span>
        </div>
    );
}
