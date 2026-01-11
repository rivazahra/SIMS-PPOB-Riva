
import z from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(8, 'Password minimal 8 karakter').max(16, 'Password maksimal 10 karakter'),
})

export const registerFormSchema = z.object({
    email: z.string().email({ message: 'Email tidak valid' }),
    first_name: z.string().min(2, 'Nama depan wajib diisi'),
    last_name: z.string().min(2, 'Nama belakang wajib diisi'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string().min(8, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak sama',
    path: ['confirmPassword'],
  })

