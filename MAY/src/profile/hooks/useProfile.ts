import { useQuery } from '@tanstack/react-query'
import * as profileService from '../services'
import type { User } from '../../contexts/AuthContext'

export const useProfile = (token: string | null) => {
  return useQuery<User>({
    queryKey: ['profile', token],
    queryFn: () => {
      if (!token) throw new Error('No token');
      return profileService.profileService.getProfile(token)
    },
    enabled: !!token,
  })
}
