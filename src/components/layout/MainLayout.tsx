import type { JSX, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../Navbar";
import { Avatar, BgSaldo } from "../../assets";
import { useProfile } from "../../services/useProfile";
import { useBalance } from "../../services/useBalance";
import { useToggleBalance } from "../../hooks/useToggleBalance";
import type { UserBalance } from "../../types/user.types";

type MainLayoutProps = {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
    const { data: profile } = useProfile()
    const { data: balance } = useBalance()
    const nullImage = "https://minio.nutech-integrasi.com/take-home-test/null";
    const { showBalance, toggleBalance } = useToggleBalance()


    const formatBalance = (): string => {
        if (!showBalance) return "Rp ••••••";

        const amount = balance?.balance;
        if (typeof amount !== 'number' || isNaN(amount)) return "Rp 0";
        return `Rp ${amount.toLocaleString("id-ID")}`;
    };
    return (
        <>
            <Navbar />
            <section className="px-4 md:px-12 lg:px-20 py-10 flex flex-col gap-8 md:gap-10 lg:gap-14">
                <section className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
                    <section className="flex md:flex-col  gap-2 ">

                        {profile?.profile_image && profile?.profile_image !== nullImage ? (
                            <img src={profile?.profile_image} className="w-30 h-30 object-contain rounded-full " alt="" />
                        ) :
                            <img src={Avatar} className="w-20 h-20" />
                        }
                        <section className="name md:mt-2 mt-0">
                            <p>Selamat datang,</p>
                            <h1 className="capitalize font-medium text-2xl">{profile?.first_name} {profile?.last_name}</h1>
                        </section>
                    </section>

                    <section
                        className='bg-cover bg-center md:basis-1/2  md:bg-top w-full rounded-md shadow-md flex flex-col gap-1 py-4 md:py-6 px-4 md:px-6 text-gray-200'
                        style={{ backgroundImage: `url(${BgSaldo})` }}>
                        <p className='text-xs md:text-sm'>Saldo anda</p>
                        <h1 className='font-bold text-lg md:text-xl'>
                            {formatBalance()}
                        </h1>
                        <button
                            type='button'
                            onClick={toggleBalance}
                            className='flex gap-2 items-center text-xs'>
                            <p>{showBalance ? "Tutup Saldo" : "Lihat Saldo"}</p>
                            {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>
                    </section>
                </section>
                {children}


            </section>


        </>
    )
}

export default MainLayout;