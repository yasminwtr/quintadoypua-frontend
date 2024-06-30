"use client"
import { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import styles from "@/app/styles/reservation.module.css";
import Navbar from '@/app/components/Navbar/Navbar.js';
import { Table, Spin, Button } from 'antd';
import { useRouter } from 'next/navigation';
import useRooms from '@/app/hooks/useRooms';
import EditRoomForm from "@/app/components/roomDrawer/Drawer";
import { roomColumns } from '@/app/utils/tablesColumns';


export default function Reservation() {
        const { rooms, loading, error, addRoom, updateRoom, deleteRoom } = useRooms()
        const [open, setOpen] = useState(false);
        const router = useRouter();
        const [selectedRoom, setSeletedRoom] = useState(null);
        const initialStateNewRoom = {
            name: '',
            description: '',
            checkIn: '',
            checkOut: '',
            maxGuest: '',
            daily: '',
            url: ''
        };
        const [newRoom, setNewRoom] = useState(initialStateNewRoom)
      
        const showDrawer = (room) => {
          setSeletedRoom(room)
          setNewRoom(initialStateNewRoom)
          setOpen(true);
        };
        const onClose = () => {
          setOpen(false);
        };

    return (
        <main className={styles.main}>
          <Navbar />
          <div className={styles.rooms}>
            <div className={styles.header_rooms}>
                  <div>
                      <span className={styles.t1}>Todas acomodações</span>
                  </div>
                    <Button onClick={() => showDrawer(null)} type='primary' className='buttonAdd'>Adicionar</Button>
                    
            </div>

            <div className={styles.options}>
              {loading ? (
                <Spin fullscreen={true} />
              ) : (
                rooms.map((room) => (
                  <div key={room.id} className={styles.room}>
                    <div></div>
                    <div>
                      <span>{room.name}<TbEdit size={24} color={'#5e0606ec'} onClick={() => showDrawer(room)}/></span>
                      <a className='link' onClick={() => router.push('/roomDetail')}>Ver acomodação</a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <EditRoomForm
              selectedRoom={selectedRoom}
              newRoom={newRoom}
              setNewRoom={setNewRoom}
              open={open}
              onClose={onClose}
              addRoom={addRoom}
              updateRoom={updateRoom}
              deleteRoom={deleteRoom}
            />
          </div>
        </main>
    );
}
