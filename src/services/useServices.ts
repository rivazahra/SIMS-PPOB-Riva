import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { ServiceData } from "../types/services.types";
import { api } from "./api";

export const useServices = ():UseQueryResult<ServiceData[]>=>{
    return useQuery({
        queryKey:['services'],
        queryFn:async () =>{
            const {data} = await api.get('/services')
            return data.data;
        }
    })
}
