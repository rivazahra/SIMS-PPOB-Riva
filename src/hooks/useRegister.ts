import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { RegisResponse, RegisType } from "../types/auth.types";
import { api } from "../services/api";

export const useRegister = ():UseMutationResult<RegisResponse, any, RegisType, unknown> =>{

    return useMutation({
        mutationKey:["register"],
        mutationFn: async (payload: RegisType) =>{
            const {data} = await api.post('/registration',  payload);
            return data;
        }
    })
    
}