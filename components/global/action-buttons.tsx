"use client";

import { ListActionsProps } from '@/lib/types/props'
import React from 'react'
import { Button } from '../ui/button'
import { CheckCheck, Loader2, X } from 'lucide-react'
import { confirmRental, rejectRental } from '@/lib/actions/rental.actions';
import { confirmRequest, rejectRequest } from '@/lib/actions/request.actions';
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const ActionButtons = ({ id, type }: ListActionsProps) => {
  console.log("rentalId", id)
  const [loadingConfirmation, setLoadingConfirmation] = React.useState(false)
  const [loadingRejection, setLoadingRejection] = React.useState(false)
  const router = useRouter()

  const onConfirm = async (id: string) => {
    setLoadingConfirmation(true)
    if (type === "request") {
      const { success } = await confirmRequest(id)
      if (success) {
        setLoadingConfirmation(false)
        toast.success("Request confirmed successfully")
        router.refresh()
      } else {
        setLoadingConfirmation(false)
        toast.error("Failed to confirm request")
      }
    } else if (type === "rental") {
      const { success } = await confirmRental(id)
      if (success) {
        setLoadingConfirmation(false)
        toast.success("Rental confirmed successfully")
        router.refresh()
      } else {
        setLoadingConfirmation(false)
        toast.error("Failed to confirm rental")
      }
    }
    setLoadingConfirmation(false)
  }

  const onReject = async (id: string) => {
    setLoadingRejection(true)
    if (type === "request") {
      const { success } = await rejectRequest(id)
      if (success) {
        setLoadingRejection(false)
        toast.success("Request rejected successfully")
        router.refresh()
      } else {
        setLoadingRejection(false)
        toast.error("Failed to reject request")
      }
    } else if (type === "rental") {
      const { success } = await rejectRental(id)
      if (success) {
        setLoadingRejection(false)
        toast.success("Rental rejected successfully")
        router.refresh()
      } else {
        setLoadingRejection(false)
        toast.error("Failed to reject rental")
      }
    }  
    setLoadingRejection(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant={"ghost"} size={"icon"} onClick={() => onConfirm(id)} disabled={loadingConfirmation}>
        {loadingConfirmation ? <Loader2 className='size-4 animate-spin' /> : <CheckCheck className='size-4 text-blue-500' />}
      </Button>
      <Button variant={"ghost"} size={"icon"} onClick={() => onReject(id)} disabled={loadingRejection}>
        {loadingRejection ? <Loader2 className='size-4 animate-spin' /> : <X className='size-4 text-red-500' />}
      </Button>
    </div>
  )
}
