import { Wallet, AuthImg } from '@/assets'
import { Link } from 'react-router';

interface AuthLayoutProps {
    children: React.ReactNode;
    type?: 'login' | 'register';
}



export const AuthLayout = ({ children, type }: AuthLayoutProps) => {
    return (
        <div className="flex justify-between  overflow-hidden items-center h-screen px-5 md:px-2 ">
            <div className="flex flex-col justify-center mx-auto  py-10 items-center ">
                <div className="flex items-center justify-center gap-3 mb-10"> 
                    <img src={Wallet} alt="" className='object-cover' />
                    <h1 className='font-semibold'>SIMS PPOB</h1>
                </div>

                <h1 className="text-xl mb-10 md:text-2xl font-semibold text-center">
                    {type === 'login' ?
                        "Masuk atau buat akun untuk memulai" :
                        "Lengkapi data untuk membuat akun"
                    }

                </h1>
                {children}

                <p className="text-sm  font-semibold">
                    {type === 'login' ? (
                        <>
                            belum punya akun? registrasi{' '}
                            <Link className="text-red-500" to="/register">di sini</Link>
                        </>
                    ) : (
                        <>
                            sudah punya akun? login{' '}
                            <Link className="text-red-500" to="/login">di sini</Link>
                        </>
                    )}
                </p>
            </div>

            <div className=' hidden lg:block'>
                <img src={AuthImg} className='object-cover' alt="" />
            </div>
        </div>
    )
}