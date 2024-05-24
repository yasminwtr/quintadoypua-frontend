import styles from "@/app/styles/myReservation.module.css";
import Navbar from '@/app/components/Navbar/navbar.js'

export default function myReservation() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.rooms}>
                <div className={styles.header_rooms}>
                    <div>
                        <span>Minhas Reservas:</span>
                    </div>
                </div>

                <div className={styles.options}>
                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Principal c/Suite</span>
                            <span>Já chegou no hotel?</span>
                            <br></br>
                            <button className={styles.in}>Chek-in</button>
                            <br></br>
                            <button className={styles.out}>Chek-Out</button>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    );
}
