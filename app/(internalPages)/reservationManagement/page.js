"use client"
import { useState } from 'react';
import { format } from 'date-fns';
import { Table, Spin, Button } from 'antd';
import LateralMenu from "@/app/components/LateralMenu/LateralMenu"
import useReservations from '@/app/hooks/useReservations';
import { reservationColumns } from '@/app/utils/tablesColumns';
import { TbEdit } from "react-icons/tb";
import { StatusTag } from '@/app/utils/statusTags';
import ReservationDrawer from '@/app/components/ReservationDrawer/Drawer';

export default function ReservationManagement() {
  const { reservations, loading, error, addReservation, checkInOut, updateStatus } = useReservations();
  const [open, setOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const showDrawer = (reservation) => {
    setSelectedReservation(reservation)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedReservation(null);
  };

  const tableData = reservations.map(reservation => {
    return {
      key: reservation.id,
      solicitationDate: reservation.solicitationdate,
      room: reservation.name,
      nameGuest: reservation.nameguest,
      startDate: format(reservation.startdate, 'dd/MM/yyyy'),
      endDate: format(reservation.enddate, 'dd/MM/yyyy'),
      total: `R$ ${reservation.totalvalue}`,
      status: <>{StatusTag(reservation.statusid)}</>,
      actions: <TbEdit size={20} color={'#29343F'} onClick={() => showDrawer(reservation)} />
    };
  });

  return (
    <main className="main-internal">
      <LateralMenu />

      <div className="page">
        <span className="title">Gerenciamento de Reservas</span>

        <Button onClick={() => showDrawer(null)} type='primary' className='new'>Nova reserva</Button>

        {loading ?
          <Spin fullscreen={true} />
          :
          <Table
            className="table"
            columns={reservationColumns}
            dataSource={tableData}
            pagination={{
              total: reservations?.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} reservas`,
            }}
          />
        }

        <ReservationDrawer
          selectedReservation={selectedReservation}
          open={open}
          onClose={onClose}
          setSelectedReservation={setSelectedReservation}
          addReservation={addReservation}
          checkInOut={checkInOut}
          updateStatus={updateStatus}
        />
      </div>
    </main>
  );
}
