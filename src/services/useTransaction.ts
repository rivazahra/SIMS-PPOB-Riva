import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { PayService, PayServiceResponse } from "../types/payment.types";
import { api } from "./api";

export const useTransaction = (): UseMutationResult<
	PayServiceResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	PayService,
	unknown
> => {
	return useMutation({
		mutationKey: ["payment-service"],
		mutationFn: async (payload: PayService) => {
			const { data } = await api.post("/transaction", payload);
			return data;
		},
	});
};