// pages/ServiceDetailPage.tsx
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";
import { useServices } from "../services/useServices";
import type { ServiceData } from "../types/services.types";
import Skeleton from "../components/Skeleton";
import { Banknote } from "lucide-react";
import { useTransaction } from "../services/useTransaction";
import { clearSelectedService } from "../store/slice/ServiceSlice";
import { useParams } from "react-router";
import TransactionModal from "../components/ModalConfirmTransaction";
import { useState } from "react";
import { formatBalance } from "../utils/validators";

const ServiceDetailPage = () => {
    const { data } = useServices();
    const { service_code } = useParams<{ service_code: string }>();
    const dispatch = useDispatch();

    const { mutate, isPending } = useTransaction();

    // Modal states
    const [modalState, setModalState] = useState<{
        open: boolean;
        type: "confirm" | "success" | "fail";
        message?: string;
    }>({
        open: false,
        type: "confirm",
        message: "",
    });
    const service = data?.find(
        (service: ServiceData) => service.service_code === service_code,
    );
    // Show confirm modal
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!service) {
            toast.error("Service tidak ditemukan");
            return;
        }

        // Open confirm modal
        setModalState({
            open: true,
            type: "confirm",
        });
    };
    const handleConfirmPayment = () => {
        if (!service_code) {
            toast.error("Service code tidak ditemukan");
            return;
        }

        // Close confirm modal
        setModalState({ open: false, type: "confirm" });

        mutate(
            { service_code },
            {
                onError: (error: any) => {
                    console.error("Payment error:", error);

                    const errorMessage =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Pembayaran gagal";

                    // Show fail modal
                    setModalState({
                        open: true,
                        type: "fail",
                        message: errorMessage,
                    });
                },
                onSuccess: (response) => {
                    console.log("Payment success:", response);

                    handleClearSelection();

                    // Show success modal
                    setModalState({
                        open: true,
                        type: "success",
                        message: `Pembayaran ${service?.service_name} sebesar ${formatBalance(service?.service_tariff ?? 0)} berhasil!`,
                    });
                },
            }
        );
    };

    const closeModal = () => {
        setModalState({ open: false, type: "confirm" });
    };


    const handleClearSelection = () => {
        dispatch(clearSelectedService());
    };

   

    if (!service) {
        return (
            <MainLayout>
                <section>
                    <h1>Pembayaran</h1>
                    <div className="flex items-center gap-2">
                        <Skeleton className="aspect-square w-8" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                </section>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <section>
                <h1 className="text-xl font-bold mb-4">Pembayaran</h1>

                <div className="flex items-center gap-3 mb-6">
                    <img
                        src={service.service_icon}
                        className="w-9"
                        alt={service.service_code}
                    />
                    <p className="font-semibold">{service.service_name}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="relative w-full mt-5">
                        <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={formatBalance(service.service_tariff)}
                            disabled
                            className="w-full pl-10 p-3 rounded border border-gray-400 bg-gray-50 text-black"
                        />
                    </div>

                    <button
                        type="submit"

                        disabled={isPending}
                        className="cursor-pointer bg-red-600 text-white w-full mt-5 p-3 rounded-sm hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                    >
                        {isPending ? "Processing..." : "Bayar"}
                    </button>
                </form>
            </section>
            <TransactionModal
                open={modalState.open}
                type={modalState.type}
                title={modalState.type === "confirm" ? `Beli ${service.service_name} senilai` : undefined}
                amount={modalState.type === "confirm" ? service.service_tariff : undefined}
                confirmText="Ya, lanjutkan Transaksi"
                message={modalState.message}
                onConfirm={handleConfirmPayment}
                onClose={closeModal}
            />
        </MainLayout>
    );
};

export default ServiceDetailPage;