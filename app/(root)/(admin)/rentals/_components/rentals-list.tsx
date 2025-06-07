"use client"

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Info } from 'lucide-react'
import { ActionButtons } from '@/components/global/action-buttons'

const Description = ({ rental }: IPendingRental) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex-1 justify-start p-3 pl-4 hover:cursor-pointer text-sm text-left">
        <span className="font-semibold">From:</span> {rental.user}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-70">
        <AlertDialogHeader className='flex flex-row items-center'>
          <Info className='size-8 text-blue-500 bg-blue-500/20 p-2 rounded-lg' />
          <AlertDialogTitle className='w-fit'>Details</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className={`flex flex-col space-y-2 border-y border-input py-4 font-courier`}>
          <span>
            <span className={`text-base`}>Made by: </span>
            <span className={`font-semibold`}>{rental.user}</span>
          </span>
          <span>
            <span className={`text-base`}>Instrument: </span>
            <span className={`font-semibold`}>{rental.instruments}</span>
          </span>
          <span>
            <span className={`text-base`}>Reason: </span>
            <span className={`font-semibold`}>{rental.rentalReason}</span>
          </span>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const RentalsList = ({ rentals }: IPendingRentals) => {
  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-col items-center text-left w-full pt-0">
        <h3 className="text-xl font-semibold text-left w-full">Rental List</h3>
        <p className="text-sm text-muted-foreground text-left w-full">Valid or reject rentals here</p>
      </CardHeader>
      <CardContent>
        <Card className="bg-background">
          <CardContent>
            {rentals.map((rental, idx) => (
              <div key={idx} className="flex items-center gap-2 w-full hover:bg-secondary/40 rounded-md pr-2">
                <Description {...rental} />
                <ActionButtons id={rental.rental.rentalId} type='rental' />
              </div>
            ))}
            {rentals.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full gap-2 p-4">
                <Info className="size-8 text-muted-foreground" />
                <p className="text-muted-foreground">No results.</p>
                <p className="text-muted-foreground -mt-2">Add data to view them here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default RentalsList