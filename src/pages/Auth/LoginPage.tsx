import React, { type JSX } from 'react'
import { AuthLayout } from '../../components/layout/AuthLayout/AuthLayout'
import { AtSign, Eye, EyeOff, LockKeyhole } from 'lucide-react'
import type z from 'zod'
import { loginFormSchema } from '../../utils/validators'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '../../services/useLogin'
import { useShowPass } from '../../hooks/useShowPass'
import toast from 'react-hot-toast'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router'


type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginPage = ():JSX.Element => {

  const { mutate: login } = useLogin()
  const navigate = useNavigate()


  const { showPass, togglePass } = useShowPass()

  const { register, formState: { isValid, errors }, handleSubmit } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange"
  })

  const onsubmit = (values: LoginFormSchema) => {
  login(values,{
    onSuccess:(data)=>{
      const token = data?.data.token;
      Cookies.set("auth_token", token,{
        expires:1,
        secure:true
      })
      
      toast.success('Login sukses!')
      navigate('/')
    },
    onError:(error)=>{
      toast.error(error.response?.data?.message|| "Login gagal")
    }
  })

  }
  return (
    <AuthLayout type='login' >

      <form onSubmit={handleSubmit(onsubmit)} className='w-full '>
        <section className='flex flex-col mb-5'>
          <div className='flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md'>
            <AtSign className='text-gray-400 ' size={20} />
            <input
              type='email'
              placeholder='masukan email anda'
              {...register("email")}
              className='text-gray-500 relative w-full  focus:outline-none  transition-colors duration-200"'
            />
          </div>
          {errors.email?.message && (
            <p className='text-red-500'>
              {errors.email.message}
            </p>
          )}

        </section>


        <section className='flex flex-col '>
          <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md ">
            <LockKeyhole size={20} className='text-gray-400' />
            <input type={showPass ? 'text' : 'password'} placeholder={` masukkan password anda`} {...register("password")} className="text-gray-500 relative w-full  focus:outline-none  transition-colors duration-200" />
            	<button
							type='button'
							onClick={togglePass}>
							{showPass ? (
								<Eye className='text-gray-400' />
							) : (
								<EyeOff size={20} className='text-gray-400' />
							)}
						</button>
          </div>
          {errors.password?.message && (
            <p className='text-red-500'>
              {errors.password.message}
            </p>
          )}
        </section>

        <button type='submit' disabled={!isValid} className={`${isValid ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-400 '} cursor-pointer text-white w-full rounded-sm p-3 mt-8 mb-5`}>Masuk</button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
