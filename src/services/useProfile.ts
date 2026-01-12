import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { UserProfile } from "../types/user.types";
import { api } from "./api";

export const useProfile = ():UseQueryResult<UserProfile> =>{
return useQuery({
    queryKey:['profile'],
    queryFn: async ()=>{
        const {data} = await api.get('/profile');
        return data.data;
    }   
})
}