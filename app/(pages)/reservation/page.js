import styles from "@/app/styles/reservation.module.css";
import Navbar from '@/app/components/Navbar/navbar.js'

export default function Reservation() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.rooms}>
                <div className={styles.header_rooms}>
                    <div>
                        <span>Todas acomodações</span>
                    </div>
                    <button>Filtrar Por</button>
                </div>

                <div className={styles.options}>
                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>
                </div>




                <div className={styles.options}>
                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>
                </div>




                <div className={styles.options}>
                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                    </div>
                </div>
            </div>



        </main>
    );
}
