import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import * as profileService from '../services'
import type { SavedAddress } from '../../checkout/types/checkout.types'

export const useUpdateProfile = (token: string | null) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (data: { name?: string; phone?: string; address?: string }) => {
      if (!token) throw new Error('No token');
      return profileService.profileService.updateProfile(token, data)
    },
    onSuccess: (updatedUser, variables) => {
      // Invalidate and refetch profile queries
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      
      // Optionally set the updated user directly to cache
      if (updatedUser) {
        queryClient.setQueryData(['profile', token], updatedUser)
      }

      // If address was updated, merge with local addresses
      if (variables.address && user?.id) {
        const addressStorageKey = `may_saved_addresses_user_${user.id}`
        const raw = localStorage.getItem(addressStorageKey)
        const localAddresses = raw ? (JSON.parse(raw) as SavedAddress[]) : []

        if (localAddresses.length > 0) {
          // Update only the first address (from API) with new data from profile
          const updatedAddresses = localAddresses.map((addr, idx) => {
            if (idx === 0) {
              // Update first address with new data from profile
              return {
                ...addr,
                fullName: updatedUser?.name || addr.fullName,
                email: updatedUser?.email || addr.email,
                phone: updatedUser?.phone || addr.phone,
                address: variables.address || addr.address,
              }
            }
            // Keep other local addresses unchanged
            return addr
          })

          localStorage.setItem(addressStorageKey, JSON.stringify(updatedAddresses))
          console.log('✅ Updated first address while preserving local addresses')
        }
      }
    },
    onError: (error) => {
      console.error('Profile update failed:', error)
    },
  })
}
