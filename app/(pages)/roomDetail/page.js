import vectorLocalization from '@/app/assets/vectors/vectorLocalization.png'
import vectorDelete from '@/app/assets/vectors/vectorDelete.png'
import vectorEdit from '@/app/assets/vectors/vectorEdit.png'
import roomOutside from '@/app/assets/images/roomOutside.png'
import roomInside from '@/app/assets/images/roomInside.png'
import Image from 'next/image'
import Navbar from '@/app/components/Navbar/navbar.js'
import { Rate } from "antd"
import styles from "@/app/styles/home.module.css";


export default function roomDetail() {
    return (
        <main> 
            <Navbar />
        <div className='flex justify-center'>
            <div className='bg-no-repeat bg-center h-[560px]  w-[1400px] mt-10 relative'
            style={{backgroundImage: `url(${roomOutside.src})`}}>

                <div className='absolute top-3 right-40'>
                    <button className='bg-white/70 rounded-3xl px-4 py-1 border-2 shadow-xl'>
                        <Image
                        src={vectorEdit}
                         alt="Vector edit"
                        />      
                    </button>
                </div>

                <div className='absolute top-3 right-20'>
                    <button className='bg-white/70 rounded-3xl px-4 py-1 border-2 shadow-xl'>
                        <Image
                        src={vectorDelete}
                         alt="Vector delete"
                        />      
                    </button>
                </div>

                <div className='top-[508px] left-[59px] mt-5 bg-white/70 h-24 w-[550px] rounded-full shadow-xl p-3 absolute'>
                    <h1 className='font-bold text-2xl ms-7'>Chalé família</h1>
                    <h2 className='ms-7'>Estrada Ipua no 6Laguna - SC|88790-000</h2>
                    <div className='ms-7 flex'>
                        <div className={styles.stars}>
                        <Rate defaultValue={5} />
                        </div>
                        <div className=' ms-3'>
                            <h6>4.5<span className=' text-gray-400'> - 1237 reviews </span></h6>
                        </div>
                    </div>
                    

                    <div className='absolute top-6 right-7'>
                        <button className='bg-white rounded-3xl px-6 py-3 border-2 border-gray-400/55'>
                            <Image
                            src={vectorLocalization}
                            alt="vectorLocalization"
                            />
                        </button>
                    </div>
                </div>

                <div className='absolute top-[520px] right-[59px] flex justify-between items-center gap-2'>
                    <div>
                        <Image
                        src={roomInside}
                        alt="Room Inside"
                        className='rounded-2xl h-24 w-28 shadow-lg'
                        />
                    </div>
                    <div>
                        <Image
                        src={roomInside}
                        alt="Room Inside"
                        className='rounded-2xl h-24 w-28 shadow-lg'
                        />
                    </div>
                    <div>
                        <Image
                        src={roomInside}
                        alt="Room Inside"
                        className='rounded-2xl h-24 w-28 shadow-lg'
                        />
                    </div>
                    <div>
                        <Image
                        src={roomInside}
                        alt="Room Inside"
                        className='rounded-2xl h-24 w-28 shadow-lg'
                        />
                    </div>

                </div>
            </div>
        </div>

        <div className='flex flex-col mt-24'>
            <div className='flex h-[100px] ms-[325px] me-[320px]'>
                <div>
                    <h1 className='font-bold text-3xl'>Informações</h1>
                    <h2 className=' text-lg'>Esta acomodação possui dois quartos, um dos quartos com cama de casal e TV e o outro com cama de casal e uma de solteiro. Ambos os quartos são equipados com ar-condicionado. Possui também banheiro, cozinha com utensílios básicos e churrasqueira. Na sua parte externa possui sacada com ampla vista para o mar. A acomodação é ideal para até cinco pessoas <span className='text-orange-300'>Ler mais...</span></h2>
                </div>
            </div>

            <div className='mt-10 ml-auto me-[320px]'>
                <button className='px-10 py-3 rounded-3xl bg-orange-400 font-inter font-bold text-white'>
                    Reserve Agora!
                </button>
            </div>
        </div>


</main>





    );
}