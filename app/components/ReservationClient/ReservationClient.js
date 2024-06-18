// "use client";

// import { useState, useEffect } from 'react';
// import styles from "@/app/styles/reservation.module.css";

// export default function ReservationClient() {
//     const [rooms, setRooms] = useState([]);
//     const [newRoom, setNewRoom] = useState({
//         name: '',
//         description: '',
//         checkIn: '',
//         checkOut: '',
//         maxGuest: '',
//         daily: ''
//     });

//     useEffect(() => {
//         fetchRooms();
//     }, []);

//     const fetchRooms = async () => {
//         const response = await fetch('/api/rooms');
//         const data = await response.json();
//         setRooms(data);
//     };

//     const addRoom = async () => {
//         const response = await fetch('/api/rooms', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newRoom),
//         });
//         const newRoomData = await response.json();
//         setRooms([...rooms, newRoomData]);
//     };

//     const editRoom = async (id, updatedRoom) => {
//         const response = await fetch(`/api/rooms/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedRoom),
//         });
//         const updatedRoomData = await response.json();
//         setRooms(rooms.map(room => room.id === id ? updatedRoomData : room));
//     };

//     const deleteRoom = async (id) => {
//         await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
//         setRooms(rooms.filter(room => room.id !== id));
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewRoom({ ...newRoom, [name]: value });
//     };

//     return (
//         <div className={styles.rooms}>
//             <div className={styles.header_rooms}>
//                 <div>
//                     <span className={styles.t1}>Todas acomodações</span>
//                 </div>
//                 <div>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Nome do quarto"
//                         value={newRoom.name}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="text"
//                         name="description"
//                         placeholder="Descrição do quarto"
//                         value={newRoom.description}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="time"
//                         name="checkIn"
//                         placeholder="Check-in"
//                         value={newRoom.checkIn}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="time"
//                         name="checkOut"
//                         placeholder="Check-out"
//                         value={newRoom.checkOut}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="number"
//                         name="maxGuest"
//                         placeholder="Máximo de hóspedes"
//                         value={newRoom.maxGuest}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="number"
//                         name="daily"
//                         placeholder="Diária"
//                         value={newRoom.daily}
//                         onChange={handleChange}
//                     />
//                     <button className={styles.buttonAdd} onClick={addRoom}>Adicionar</button>
//                 </div>
//             </div>

//             <div className={styles.options}>
//                 {rooms.map(room => (
//                     <div className={styles.room} key={room.id}>
//                         <div></div>
//                         <div>
//                             <span>{room.name}</span>
//                             <span>Ver acomodação</span>
//                         </div>
//                         <button className={styles.buttonEdit} onClick={() => editRoom(room.id, { ...room, name: 'Novo Nome', description: 'Nova Descrição' })}>Edit</button>
//                         <button className={styles.buttonDelete} onClick={() => deleteRoom(room.id)}>Delete</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
