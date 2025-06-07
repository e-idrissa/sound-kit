import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { RentalForm } from './rental-form'
import { getAvailableInstruments } from '@/lib/actions/intrument.actions'
import { getRentalReasons } from '@/lib/actions/rental.actions'
import { getAuthToken } from '@/lib/actions/auth.actions'

export const RentalCard = async () => {
  const jwt = await getAuthToken() as IJWT

  if (!jwt) return null

  const userId = jwt.userId
  const { instruments } = await getAvailableInstruments()
  const { rentalReasons } = await getRentalReasons()

  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Rental Form</CardTitle>
        <CardDescription>Create or Edit your instruments rentals</CardDescription>
      </CardHeader>
      <CardContent>
        <RentalForm instruments={instruments!} reasons={rentalReasons!} userId={userId}/>
      </CardContent>
    </Card>
  )
}
