"use client"
import LateralMenu from "@/app/components/LateralMenu/LateralMenu"
import { Calendar } from "antd";

export default function CalendarPage() {
  const reservations = [
    { id: 1, title: "Reserva 1", startDate: "2024-04-05", endDate: "2024-04-07" },
    { id: 1, title: "Reserva 5", startDate: "2024-04-05", endDate: "2024-04-07" },
    { id: 2, title: "Reserva 2", startDate: "2024-04-10", endDate: "2024-04-12" },
    { id: 2, title: "Reserva 3", startDate: "2024-05-10", endDate: "2024-05-12" },
    { id: 2, title: "Reserva 3", startDate: "2024-12-10", endDate: "2024-12-12" },
  ];

  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const reservationsOnDate = reservations.filter(reservation => {
      return formattedDate >= reservation.startDate && formattedDate <= reservation.endDate;
    });

    return <>
      {reservationsOnDate.map(reservation => (
        <div className='calendar-reservation' key={reservation.id}>
          {reservation.title}
        </div>
      ))}
    </>
  };

  const countReservationsForMonth = (year, month) => {
    const reservationsInMonth = reservations.filter(reservation => {
      const reservationStartDate = new Date(reservation.startDate);
      return reservationStartDate.getFullYear() === year && reservationStartDate.getMonth() + 1 === month;
    });

    return reservationsInMonth.length;
  };

  const monthCellRender = (value) => {
    const year = value.year();
    const month = value.month() + 1;

    const reservationsCount = countReservationsForMonth(year, month);

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
      </div>
    </main>
  );
}
