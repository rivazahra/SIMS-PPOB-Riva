import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { TransactionHistory } from '../types/services.types'
import { api } from './api'

export const useTransactionHistory = (offset: number, limit: number): UseQueryResult<TransactionHistory> => {
  return useQuery({
    queryKey: ['transaction-history'],
    queryFn: async () => {
      const { data } = await api.get('/transaction/history', {
        params: { offset, limit },
      })
      return data.data
    },
  })
}
