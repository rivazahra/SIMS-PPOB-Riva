import { Banknote } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import MainLayout from "../components/layout/MainLayout";
import { useTopUp } from "../services/useTopUp";
import { useBalance } from "../services/useBalance";
import { formatBalance, topUpSchema } from "../utils/validators";
import { useNavigate } from "react-router";

type TopUpFormData = z.infer<typeof topUpSchema>;

const NOMINAL_OPTIONS = [10000, 20000, 50000, 100000, 250000, 500000];

const TopUp = () => {
	const navigate = useNavigate();

	// API Hooks
	const { mutate: topUp } = useTopUp();
	const { refetch: refetchBalance } = useBalance();

	// Form
	const {
		register,
		formState: { isValid, errors },
		handleSubmit,
		setValue,
		trigger,
		reset,
	} = useForm<TopUpFormData>({
		resolver: zodResolver(topUpSchema),
		mode: "onChange",
		defaultValues: {
			top_up_amount: 0,
		},
	});

	// Handlers
	const handleNominalClick = (amount: number) => {
		setValue("top_up_amount", amount);
		trigger("top_up_amount");
	};

	const handleTopUp = handleSubmit((formData) => {
		topUp(formData, {
			onError: (error: any) => {
				toast.error(error?.message || "Top Up gagal");
			},
			onSuccess: (response) => {
				toast.success(response?.message || "Top Up berhasil!");
				reset();
				refetchBalance();

				setTimeout(() => {
					navigate("/");
				}, 1000);
			},
		});
	});

	return (
		<MainLayout>
			<section className="flex flex-col gap-4">
				{/* Header */}
				<header className="flex flex-col gap-2">
					<p className="text-gray-500 text-xs md:text-sm">
						Silahkan Masukan
					</p>
					<h1 className="text-gray-800 text-base md:text-lg lg:text-xl font-bold">
						Nominal Top Up
					</h1>
				</header>

				{/* Form */}
				<form
					onSubmit={handleTopUp}
					className="grid grid-cols-1 md:grid-cols-3 gap-6"
				>
					{/* Left Column: Input & Submit */}
					<section className="col-span-2 flex flex-col gap-4">
						{/* Input Field */}
						<div>
							<div className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md">
								<Banknote className="text-gray-400" />
								<input
									type="number"
									placeholder="Masukan nominal top-up"
									{...register("top_up_amount", { valueAsNumber: true })}
									className="text-xs md:text-sm text-gray-500 outline-none placeholder:text-gray-400 w-full bg-transparent"
								/>
							</div>

							{errors.top_up_amount && (
								<p className="text-red-500 text-xs mt-1">
									{errors.top_up_amount.message}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={!isValid}
							className={`w-full py-2  font-semibold transition-colors ${isValid
									? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
									: "bg-gray-400 text-white cursor-not-allowed"
								}`}
						>
							Top Up
						</button>
					</section>

					{/* Right Column: Nominal Options */}
					<section className="grid grid-cols-3 gap-4">
						{NOMINAL_OPTIONS.map((nominal) => (
							<button
								key={nominal}
								type="button"
								onClick={() => handleNominalClick(nominal)}
								className="bg-white hover:bg-gray-100 border border-gray-200 text-xs lg:text-sm transition-colors cursor-pointer py-2 px-1 rounded"
							>
								{formatBalance(nominal)}
							</button>
						))}
					</section>
				</form>
			</section>
		</MainLayout>
	);
};

export default TopUp;