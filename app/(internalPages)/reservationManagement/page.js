"use client"
import { useState } from 'react';
import { TbEditCircle } from "react-icons/tb";
import { Table } from 'antd';
import LateralMenu from "@/app/components/(internalPages)/LateralMenu"
import EditReservation from '@/app/components/(internalPages)/EditReservation';

export default function ReservationManagement() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'RESERVA',
      dataIndex: 'reserva',
      sorter: {
        compare: (a, b) => a.reserva - b.reserva,
        multiple: 3,
      },
    },
    {
      title: 'DATA RESERVA',
      dataIndex: 'dataReserva',
      sorter: {
        compare: (a, b) => a.dataReserva - b.dataReserva,
        multiple: 3,
      },
    },
    {
      title: 'ACOMODAÇÃO',
      dataIndex: 'acomodacao',
    },
    {
      title: 'HÓSPEDE',
      dataIndex: 'name',
    },
    {
      title: 'CHECK-IN',
      dataIndex: 'checkIn',
      sorter: {
        compare: (a, b) => a.checkIn - b.checkIn,
        multiple: 3,
      },
    },
    {
      title: 'CHECK-OUT',
      dataIndex: 'checkOut',
      sorter: {
        compare: (a, b) => a.checkOut - b.checkOut,
        multiple: 3,
      },
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
    },
    {
      title: 'AÇÕES',
      dataIndex: 'acao',
    },
  ];
  const data = [
    {
      key: '1',
      reserva: '121',
      dataReserva: '10/02',
      acomodacao: 'Quarto Sacada',
      name: 'Yasmin',
      checkIn: '18/02',
      checkOut: '19/02',
      total: 'R$ 1200',
      status: 'Finalizada',
      acao: <TbEditCircle size={20} color={'#29343F'} onClick={showDrawer} />,
    },
  ];

  return (
    <main className="main-internal">
      <LateralMenu />

      <div className="page">
        <span className="title">Gerenciamento de Reservas</span>

        <Table className="table" columns={columns} dataSource={data} />

        <EditReservation open={open} onClose={onClose} />
      </div>
    </main>
  );
}
