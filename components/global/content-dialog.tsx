"use client"

import { ContentDialogProps } from '@/lib/types/props'
import React from 'react'
import { 
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel 
} from '../ui/alert-dialog'
import { Info } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { Micro } from './instruments'
import Image from 'next/image'

const ContentDialog = ({ isRental, rental, instrument, user, isGhost, className }: ContentDialogProps) => {
  const variant = rental?.status === "approved" ? "var1"
    : rental?.status === "pending" ? "var2"
      : rental?.status === "closed" ? "var4"
        : "var5"
  const stateVar = instrument?.state === "new" ? "var1"
    : instrument?.state === "dated" ? "var2" : "var3"
  const situationVar = instrument?.situation === "available" ? "var1" : "var2"

  const qrCodeImg = instrument?.qrCodeImg || ""

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={className}>
        <Button variant={"ghost"} size={"sm"}>
          <Info className={cn(isGhost ? "hidden" : 'size-4')} />
        </Button>
      </AlertDialogTrigger>
      {isRental ? (
        <AlertDialogContent className={cn(isRental ? "w-72" : "w-72")}>
          <AlertDialogHeader className='flex flex-row items-center'>
            <Info className='size-8 text-blue-500 bg-blue-500/20 p-2 rounded-lg' />
            <AlertDialogTitle className='w-fit'>Details</AlertDialogTitle>
            <Badge variant={variant} className="capitalize ml-auto">{rental?.status}</Badge>
          </AlertDialogHeader>
          <AlertDialogDescription className={`flex flex-col space-y-1 text-sm text-muted-foreground border-y border-input py-4 font-courier`}>
            <span>
              <span className="font-bold mr-2">Instrument Id:</span>
              <span>{rental?.qrCodeId}</span>
            </span>
            <span>
              <span className="font-bold mr-2">Technician:</span>
              <span>{user}</span>
            </span>
            <span>
              <span className="font-bold mr-2">From:</span>
              <span>{rental?.startDate.toDateString()}</span>
            </span>
            <span>
              <span className="font-bold mr-2">To:</span>
              <span>{rental?.endDate.toDateString()}</span>
            </span>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className='w-full'>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent className='w-110'>
          <AlertDialogHeader className='flex flex-row items-center'>
            <div className="rounded-md p-2 bg-blue-500/20">
              <Micro />
            </div>
            <AlertDialogTitle className='w-fit'>Details</AlertDialogTitle>
            <Badge variant={stateVar} className="capitalize ml-auto">{instrument?.state}</Badge>
          </AlertDialogHeader>
          <AlertDialogDescription className='flex items-center gap-8 border-y border-input py-4 text-sm font-courier'>
            <span className="flex flex-col space-y-1 flex-1 text-muted-foreground">
              <span>
                <span className="font-bold mr-2">Instrument Id:</span>
                <span>********</span>
              </span>
              <span>
                <span className="font-bold mr-2">Category:</span>
                <span>{instrument?.category}</span>
              </span>
              <span>
                <span className="font-bold mr-2">Brand:</span>
                <span>{instrument?.brand}</span>
              </span>
              <span>
                <span className="font-bold mr-2">Technician:</span>
                <span>{user}</span>
              </span>
              <Badge variant={situationVar} className="capitalize mt-4">{instrument?.situation}</Badge>
            </span>
            <span className="flex flex-col space-y-1 items-center size-36">
              <Image src={qrCodeImg} alt="qrCode" width={60} height={60} className="rounded-lg w-full h-full" />
            </span>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className='w-full'>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}

export default ContentDialog