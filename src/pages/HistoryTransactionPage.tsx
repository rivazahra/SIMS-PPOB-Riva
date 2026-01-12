import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/layout/MainLayout";
import { useTransactionHistory } from "../services/useTransactionHistory";
import type { RootState } from "../store/store";
import { addTransactions, setOffset, setTransactions } from "../store/slice/TransactionSlice";
import { useEffect } from "react";
import { formatDate } from "../utils/validators";


const HistoryTransaction = () => {
 	const dispatch = useDispatch();
	const { records, offset, limit } = useSelector(
		(state: RootState) => state.transactionHistory
	);
	const { data } = useTransactionHistory(offset, limit);

	useEffect(() => {
		if (data?.records.length) {
			if (offset === 0) {
				dispatch(setTransactions(data.records));
			} else {
				dispatch(addTransactions(data.records));
			}
		}
	}, [data, dispatch, offset]);

	const handleShowMore = () => {
		dispatch(setOffset(offset + limit));
	};

  return (
    <MainLayout>
      <section>
        <h1>Semua Transaksi</h1>

        <section className="flex flex-col gap-4">
          {records.map((record) => (
            <section
              key={record.invoice_number}
              className="border rounded-lg border-gray-200 flex items-center justify-between px-6 py-4"
            >
              <section className="flex flex-col gap-1">
                <p
                  className={`flex items-center gap-2 ${
                    record.transaction_type === "TOPUP"
                      ? "text-[#55dbb2]"
                      : "text-red-500"
                  } text-sm font-semibold`}
                >
                  <span>{record.transaction_type === "TOPUP" ? "+" : "-"}</span>
                  <span>
                    {record.total_amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </p>
                <p className="text-gray-400 text-xs">
                  {formatDate(record.created_on || "")} WIB
                </p>
              </section>

              <p className="text-xs text-black">
                {record.description || "-"}
              </p>
            </section>
          ))}

        {data?.records.length === limit   && (
				<button
					onClick={handleShowMore}
					className='text-xs text-primary hover:text-primaryDark transition-all ease-in-out duration-200'>
					Show More
				</button>
			)}
        </section>
      </section>
    </MainLayout>
  );
};

export default HistoryTransaction;
