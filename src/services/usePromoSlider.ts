import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { BannerData } from "../types/banner.types";
import { api } from "./api";

export const usePromoSlider = ():UseQueryResult<BannerData[]>=>{
    return useQuery({
        queryKey:['banner'],
        queryFn:async ()=>{
            const {data} = await api.get("/banner")
            return data.data;
        }
    })
}