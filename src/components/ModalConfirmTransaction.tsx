
import { useNavigate } from "react-router";
import { Wallet } from "../assets";

// Types
type ModalType = "confirm" | "success" | "fail";

interface TransactionModalProps {
  open: boolean;
  type: ModalType;
  title?: string;
  amount?: number;
  confirmText?: string;
  message?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

// Constants
const MODAL_CONFIG = {
  success: {
    icon: "✓",
    iconBgColor: "bg-green-500",
    defaultMessage: "Transaksi berhasil",
  },
  fail: {
    icon: "✗",
    iconBgColor: "bg-red-500",
    defaultMessage: "Transaksi gagal",
  },
} as const;

// Components
const ModalOverlay = ({ onClick }: { onClick: () => void }) => (
  <div className="absolute inset-0 bg-black/40" onClick={onClick} />
);

const ConfirmIcon = () => (
  <img src={Wallet} alt="Logo" className="w-12 h-12 mx-auto" />
);

const StatusIcon = ({ type }: { type: "success" | "fail" }) => {
  const config = MODAL_CONFIG[type];
  
  return (
    <div
      className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold ${config.iconBgColor}`}
    >
      {config.icon}
    </div>
  );
};

const ConfirmContent = ({
  title,
  amount,
  confirmText,
  onConfirm,
  onClose,
}: {
  title?: string;
  amount?: number;
  confirmText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}) => (
  <>
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold">Rp {amount?.toLocaleString("id-ID")} ?</p>
    
    <div className="space-y-2 pt-2">
      <button
        onClick={onConfirm}
        className="w-full py-2 text-red-500 font-semibold hover:bg-red-50 rounded transition-colors"
      >
        {confirmText || "Ya, lanjutkan"}
      </button>
      
      <button
        onClick={onClose}
        className="w-full py-2 text-gray-400 text-sm hover:bg-gray-50 rounded transition-colors"
      >
        Batalkan
      </button>
    </div>
  </>
);

const ResultContent = ({
  type,
  message,
  navigate,
}: {
  type: "success" | "fail";
  message?: string;
  navigate: ReturnType<typeof useNavigate>;
}) => {
  const config = MODAL_CONFIG[type];
  
  return (
    <>
      <p className="text-sm text-gray-500">{config.defaultMessage}</p>
      
      {message && (
        <p className="font-semibold text-gray-800">{message}</p>
      )}
      
      <button
        onClick={() => navigate("/")}
        className="w-full py-2 text-red-500 font-semibold hover:bg-red-50 rounded transition-colors mt-2"
      >
        Kembali ke Beranda
      </button>
    </>
  );
};

// Main Component
export default function TransactionModal({
  open,
  type,
  title,
  amount,
  confirmText,
  message,
  onConfirm,
  onClose,
}: TransactionModalProps) {
  const navigate = useNavigate();

  if (!open) return null;

  const isConfirm = type === "confirm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ModalOverlay onClick={onClose} />
      
      <div className="relative bg-white rounded-xl p-6 w-[320px] shadow-lg text-center space-y-4 z-10 animate-in fade-in zoom-in duration-200">
        
        {/* Icon */}
        {isConfirm ? (
          <ConfirmIcon />
        ) : (
          <StatusIcon type={type} />
        )}

        {/* Content */}
        {isConfirm ? (
          <ConfirmContent
            title={title}
            amount={amount}
            confirmText={confirmText}
            onConfirm={onConfirm}
            onClose={onClose}
          />
        ) : (
          <ResultContent
            type={type}
            message={message}
            navigate={navigate}
          />
        )}
      </div>
    </div>
  );
}