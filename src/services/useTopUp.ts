import type { TopUpPayload, TopUpResponse } from '../types/payment.types';
import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import { api } from './api';

export const useTopUp = (): UseMutationResult<
	TopUpResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	TopUpPayload,
	unknown
> => {
	return useMutation({
		mutationKey: ["top-up"],
		mutationFn: async (payload: TopUpPayload) => {
			const { data } = await api.post("/topup", payload);
			return data;
		},
	});
};