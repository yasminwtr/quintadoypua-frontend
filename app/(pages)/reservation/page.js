import styles from "@/app/styles/reservation.module.css";
import Navbar from '@/app/components/Navbar/navbar.js';
import useRooms from '@/app/hooks/useRooms';

export default function Reservation() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.rooms}>
                <div className={styles.header_rooms}>
                    <div>
                        <span className={styles.t1}>Todas acomodações</span>
                    </div>
                     {/* <Button onClick={() => showDrawer(null)} type='primary' className='buttonAdd'>Adicionar</Button> */}
                </div>

                <div className={styles.options}>
                    <div className={styles.room}>
                        <div></div>
                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                            
                        </div>
                        <button onClick={1} className={styles.buttonEidt}>Edit</button>
                        <button className={styles.buttonDelete}>Delete</button>
                    </div>
              </div>
            </div>



        </main>
    );
}
