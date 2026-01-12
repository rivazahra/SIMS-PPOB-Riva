import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import type { TransactionHistory } from "../../types/services.types";
interface TransactionState {
	records: TransactionHistory["records"];
	offset: number;
	limit: number;
}

const initialState: TransactionState = {
	records: [],
	offset: 0,
	limit: 3,
};

const transactionSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		setTransactions: (
			state,
			action: PayloadAction<TransactionHistory["records"]>
		) => {
			state.records = action.payload;
		},
		addTransactions: (
			state,
			action: PayloadAction<TransactionHistory["records"]>
		) => {
			state.records.push(...action.payload); // add new records
		},
		setOffset: (state, action: PayloadAction<number>) => {
			state.offset = action.payload;
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		clearTransactions: (state) => {
			state.records = []; // Clear records
		},
	},
});

export const {
	setTransactions,
	addTransactions,
	setOffset,
	setLimit,
	clearTransactions,
} = transactionSlice.actions;
export default transactionSlice.reducer;