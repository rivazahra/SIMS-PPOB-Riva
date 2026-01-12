// components/FormField.tsx

import type { FC, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
	id: string;
	label: string;
	type: string;
	icon: ReactNode;
	placeholder: string;
	register: UseFormRegisterReturn;
	error?: string;
}

const FormField: FC<FormFieldProps> = ({
	id,
	label,
	type,
	icon,
	placeholder,
	register,
	error,
}) => {
	return (
		<section className="flex flex-col gap-2">
			<label htmlFor={id} className="text-sm text-gray-700 font-medium">
				{label}
			</label>
			
			<div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-sm">
				{icon}
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					{...register}
					className="text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent"
				/>
			</div>
			
			{error && <p className="text-red-500 text-xs">{error}</p>}
		</section>
	);
};

export default FormField;