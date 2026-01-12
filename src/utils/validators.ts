
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


  export const topUpSchema = z.object({
   	top_up_amount: z
		.int()
		.positive("Amount must be a positive number")
		.min(10000, "Amount must be at least 10,000")
		.max(1000000, "Amount must be at most 1,000,000"),
});

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const updateProfileValidationSchema = z.object({
	email: z.string().email({ message: "Invalid email format" }),
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
});

export const  formatBalance = (amount: number): string => {
        if (typeof amount !== 'number' || isNaN(amount)) return "Rp 0";
        return `Rp ${amount.toLocaleString("id-ID")}`;
    };