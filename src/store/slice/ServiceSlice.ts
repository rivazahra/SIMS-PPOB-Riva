// store/serviceSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ServiceData } from "../../types/services.types";

interface ServiceState {
	selectedService: ServiceData | null;
}

const initialState: ServiceState = {
	selectedService: null,
};

const serviceSlice = createSlice({
	name: "service",
	initialState,
	reducers: {
		setSelectedService: (state, action: PayloadAction<ServiceData>) => {
			state.selectedService = action.payload;
		},
		clearSelectedService: (state) => {
			state.selectedService = null;
		},
	},
});

export const { setSelectedService, clearSelectedService } =
	serviceSlice.actions;
export default serviceSlice.reducer;