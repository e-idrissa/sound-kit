import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { RentalForm } from './rental-form'

export const RentalCard = () => {
  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Rental Form</CardTitle>
        <CardDescription>Create or Edit your instruments rentals</CardDescription>
      </CardHeader>
      <CardContent>
        <RentalForm />
      </CardContent>
    </Card>
  )
}
