import styles from "@/app/styles/reservationAdmin.module.css";
import Navbar from '@/app/components/Navbar/navbar.js'

export default function reservationAdmin() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.rooms}>
                <div className={styles.header_rooms}>
                    <div>
                        <span>Todas acomodações</span>
                    </div>
                    <button className={styles.adicionar}>+ Adicionar</button>
                    <button className={styles.filtro}>Filtrar Por</button>
                </div>


                <div className={styles.options}>
                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                            
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>
                </div>




                <div className={styles.options}>
                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>
                </div>




                <div className={styles.options}>
                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>

                    <div className={styles.room}>
                        <div></div>

                        <div>
                            <span>Quarto Sacada</span>
                            <span>Ver acomodação</span>
                        </div>
                        <button className={styles.buttonEdit}>Editar</button>
                        <button className={styles.buttonDelete}>Excluir</button>
                    </div>
                    
                </div>
                <div className={styles.espaco}></div>
            </div>



        </main>
    );
}
