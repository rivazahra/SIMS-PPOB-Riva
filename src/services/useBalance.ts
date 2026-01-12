
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { UserBalance } from "../types/user.types";
import { api } from "./api";

export const useBalance = ():UseQueryResult<UserBalance>=>{
    return useQuery({
        queryKey:['balance'],
        queryFn: async () =>{
            const {data} = await api.get('/balance');
            return data.data;
        }
    })
}