"use client";

import { ListActionsProps } from '@/lib/types/props'
import React from 'react'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'

export const ActionButtons = ({ id }: ListActionsProps) => {
  const onConfirm = async (id: string) => {
    console.log("ACTIONBUTTONS", id)
    return {success: true}
  }

  const onReject = async (id: string) => {
    console.log("ACTIONBUTTONS", id)
    return {success: true}
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant={"ghost"} size={"icon"} onClick={() => onConfirm(id)}>
        <Check className='size-4 text-blue-500' />
      </Button>
      <Button variant={"ghost"} size={"icon"} onClick={() => onReject(id)}>
      <X className='size-4 text-red-500' />
    </Button>
    </div>
  )
}
