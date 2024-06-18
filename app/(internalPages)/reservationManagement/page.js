"use client"
import { useState } from 'react';
import { format } from 'date-fns';
import { Table, Spin, Button } from 'antd';
import LateralMenu from "@/app/components/Sidebar/Sidebar"
import useReservations from '@/app/hooks/useReservations';
import { reservationColumns } from '@/app/utils/tablesColumns';
import { TbEdit } from "react-icons/tb";
import { StatusTag } from '@/app/utils/statusTags';
import ReservationDrawer from '@/app/components/ReservationDrawer/Drawer';

export default function ReservationManagement() {
  const { reservations, loading, error, addReservation, checkInOut, updateStatus, contextHolder } = useReservations();
  const [open, setOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const initialStateNewReservation = {
    clientid: null,
    employeeid: null, // qnd aplicar a autenticação, o valor aqui vai ser do funcionario logado
    roomid: '',
    daily: 0,
    nameguest: '',
    emailguest: '',
    contactguest: '',
    adults: 1,
    children: 0,
    maxguest: '',
    reservationtime: null,
    days: 0,
    totalvalue: 0,
    observation: '',
    internalreservation: true // qnd aplicar a autenticação, tirar ele daq
  };
  const [newReservation, setNewReservation] = useState(initialStateNewReservation)

  const showDrawer = (reservation) => {
    setSelectedReservation(reservation)
    setNewReservation(initialStateNewReservation)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
      status: <>{StatusTag(reservation.statusid, reservation.status)}</>,
      actions: <TbEdit size={20} color={'#29343F'} onClick={() => showDrawer(reservation)} />
    };
  });

  return (
    <main className="main-internal">
      <LateralMenu />

      <div className="page">
        {loading ?
          <Spin fullscreen={true} />
          :
          <>
            <span className="title">Gerenciamento de Reservas</span>

            <Button onClick={() => showDrawer(null)} type='primary' className='new'>Nova reserva</Button>
            
            <Table
              className="table"
              columns={reservationColumns}
              dataSource={tableData}
              pagination={{
                total: reservations?.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} reservas`,
              }}
            />
          </>

        }

        {contextHolder}

        <ReservationDrawer
          selectedReservation={selectedReservation}
          newReservation={newReservation}
          setNewReservation={setNewReservation}
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
