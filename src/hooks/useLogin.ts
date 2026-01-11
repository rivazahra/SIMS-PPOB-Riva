import { data } from 'react-router';
import { api } from '../services/api';
import { type LoginResponse, type LoginType } from './../types/auth.types';
import { useMutation, type UseMutationResult } from "@tanstack/react-query"

export const useLogin = (): UseMutationResult<
    LoginResponse,
    any,
    LoginType,
    unknown
> => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (payload: LoginType) => {
            const { data } = await api.post("/login", payload);
            return data;
        },
    });
};