"use client";

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Pen, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { InstrumentForm } from './instrument-form'
import { InstrumentDialogProps } from '@/lib/props'

export const InstrumentDialog = ({ instrument, type = "create" }: InstrumentDialogProps) => {
  const isCreate = type === "create"
  const [isOpen, setIsOpen] = useState(false)

  const toggleDialog = () => setIsOpen(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isCreate ? "default" : "ghost"} size={"sm"}>
          {isCreate ? (
            <>
              <PlusCircle className='size-4' />
              <span>New Instrument</span>
            </>
          ) : (
            <Pen className='size-4' />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='flex flex-col -space-y-1'>
          <DialogTitle>{isCreate ? "Create New" : "Edit Your"} Instrument</DialogTitle>
          <span className="text-xs text-muted-foreground">
            Fill all the fields with your new instrument informations
          </span>
        </DialogHeader>
        <InstrumentForm onSuccess={toggleDialog} type={type} instrument={instrument}/>
      </DialogContent>
    </Dialog>
  )
}
