"use client"
import LateralMenu from "@/app/components/LateralMenu/LateralMenu"
import { Calendar } from "antd";
import { useState } from 'react';
import ReservationDrawer from '@/app/components/ReservationDrawer/Drawer';
import useReservations from '@/app/hooks/useReservations';

export default function CalendarPage() {
  const { confirmedReservations, loading, error } = useReservations();
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

  const reservations = confirmedReservations.map(reservation => {
    return {
      id: reservation.id,
      clientid: reservation.id,
      employeeid: reservation.id,
      roomid: reservation.id,
      startdate: reservation.startdate,
      enddate: reservation.enddate,
      solicitationdate: reservation.solicitationdate,
      nameguest: reservation.nameguest,
      contactguest: reservation.contactguest,
      emailguest: reservation.emailguest,
      observation: reservation.observation,
      adults: reservation.adults,
      children: reservation.children,
      totalvalue: reservation.totalvalue,
      statusid: reservation.statusid,
      daily: reservation.daily,
      title: `Reserva ${reservation.id}`,
    };
  });

  const dateCellRender = (value) => (
    <>
      {reservations.filter(reservation => value.format('YYYY-MM-DD') >= reservation.startdate && value.format('YYYY-MM-DD') <= reservation.enddate)
        .map(reservation => (
          <div className='calendar-reservation' key={reservation.id} onClick={() => showDrawer(reservation)}>
            {reservation.title}
          </div>
        ))}
    </>
  );

  const countReservationsForMonth = (year, month) => reservations.filter(reservation => new Date(reservation.startdate).getFullYear() === year && new Date(reservation.startdate).getMonth() + 1 === month).length;

  const monthCellRender = (value) => {
    const reservationsCount = countReservationsForMonth(value.year(), value.month() + 1);
    return reservationsCount > 0 ? (
      <div className='notes-month'>
        {reservationsCount} {reservationsCount === 1 ? 'reserva' : 'reservas'}
      </div>
    ) : null;
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <main className="main-internal">
      <LateralMenu />

      <div className="page">
        <span className="title">Calendário de Reservas</span>

        <Calendar cellRender={cellRender} />

        <ReservationDrawer
          selectedReservation={selectedReservation}
          open={open}
          onClose={onClose}
          setSelectedReservation={setSelectedReservation}
        />
      </div>
    </main>
  );
}
