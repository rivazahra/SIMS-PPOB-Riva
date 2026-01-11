import type { JSX } from "react";
import { useRegister } from "../../hooks/useRegister";
import { useShowPass } from "../../hooks/useShowPass";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "../../utils/validators";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../../components/layout/AuthLayout/AuthLayout";
import { AtSign, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type RegisFormSchema = z.infer<typeof registerFormSchema>;
const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate()


  const { mutate } = useRegister()

  const { showPass, togglePass, toggleConfirm, showConfirmPass } = useShowPass()

  const { register, formState: { isValid, errors }, handleSubmit } = useForm<RegisFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange"
  })

  const onsubmit = (values: RegisFormSchema) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Registrasi berhasil, silahkan login")
        navigate('/login')
      },
      onError: (err) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Registrasi gagal"
        toast.error(message)
      }
    })
  }

  return (
    <AuthLayout type="register">
      <form onSubmit={handleSubmit(onsubmit)} className="w-full">
        <section className='flex flex-col mb-5'>
          <div className='flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md'>
            <AtSign className='text-gray-400 ' />
            <input
              type='email'
              placeholder='Masukkan email anda'
              {...register("email")}
              className=' border-none outline-none  w-full bg-transparent'
            />
          </div>
          {errors.email?.message && (
            <p className='text-red-500'>
              {errors.email.message}
            </p>
          )}

        </section>
        <section className='flex flex-col mb-5'>
          <div className='flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md'>
            <UserRound className='text-gray-400 ' />
            <input
              type='text'
              placeholder='Nama depan'
              {...register("first_name")}
              className=' border-none outline-none  w-full bg-transparent'
            />
          </div>
          {errors.first_name?.message && (
            <p className='text-red-500'>
              {errors.first_name.message}
            </p>
          )}

        </section>
        <section className='flex flex-col mb-5'>
          <div className='flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md'>
            <UserRound className='text-gray-400 ' />
            <input
              type='text'
              placeholder='Nama belakang'
              {...register("last_name")}
              className=' border-none outline-none  w-full bg-transparent'
            />
          </div>
          {errors.last_name?.message && (
            <p className='text-red-500'>
              {errors.last_name.message}
            </p>
          )}

        </section>
        <section className='flex flex-col  '>
          <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md ">
            <LockKeyhole size={20} className='text-gray-400' />
            <input type={showPass ? 'text' : 'password'} placeholder={`Buat password `} {...register("password")} className=" relative w-full  focus:outline-none  transition-colors duration-200" />

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
        <section className='flex flex-col my-5'>
          <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md ">
            <LockKeyhole size={20} className='text-gray-400' />
            <input type={showConfirmPass ? 'text' : 'password'} placeholder={`Konfirmasi password `} {...register("confirmPassword")} className=" relative w-full  focus:outline-none  transition-colors duration-200" />

            <button
              type='button'
              onClick={toggleConfirm}>
              {showConfirmPass ? (
                <Eye className='text-gray-400' />
              ) : (
                <EyeOff size={20} className='text-gray-400' />
              )}
            </button>
          </div>
          {errors.confirmPassword?.message && (
            <p className='text-red-500'>
              {errors.confirmPassword.message}
            </p>
          )}
        </section>

        <button type='submit' disabled={!isValid} className={`${isValid ? 'hover:bg-red-700 bg-red-600 text-white' : 'bg-gray-400 '}  cursor-pointer text-white w-full rounded-sm p-3 mt-8 mb-5`}>Registrasi</button>
      </form>

    </AuthLayout>
  )
}
export default RegisterPage;