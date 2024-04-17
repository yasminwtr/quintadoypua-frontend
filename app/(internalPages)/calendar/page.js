"use client"
import LateralMenu from "@/app/components/Sidebar/Sidebar"
import { Calendar, Spin } from "antd";
import { useState } from 'react';
import ReservationDrawer from '@/app/components/ReservationDrawer/Drawer';
import useReservations from '@/app/hooks/useReservations';
import { CalendarReservations } from "@/app/utils/calendarReservations";

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
  };

  const formatReservationDates = (reservation) => {
    const startDate = new Date(reservation.startdate).toISOString().split('T')[0];
    const endDate = new Date(reservation.enddate).toISOString().split('T')[0];
    return { ...reservation, startdate: startDate, enddate: endDate };
  };

  const formattedReservations = confirmedReservations.map(formatReservationDates);

  const dateCellRender = (value) => (
    <>
      {formattedReservations.filter(reservation => {
        const formattedValue = value.format('YYYY-MM-DD');
        return formattedValue >= reservation.startdate && formattedValue <= reservation.enddate;
      }).map(reservation => (
        <div className='calendar-reservation' key={reservation.id} onClick={() => showDrawer(reservation)}>
          {CalendarReservations(reservation?.statusid, reservation?.id)}
        </div>
      ))}
    </>
  );

  const countReservationsForMonth = (year, month) => {
    return formattedReservations.filter(reservation =>
      new Date(reservation.startdate).getFullYear() === year &&
      new Date(reservation.startdate).getMonth() + 1 === month
    ).length;
  };

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

        {loading ?
          <Spin fullscreen={true} />
          :
          <Calendar cellRender={cellRender} />
        }

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
