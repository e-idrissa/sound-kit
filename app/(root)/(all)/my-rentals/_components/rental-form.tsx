"use client";

import React from 'react'
import z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, ScanLine } from 'lucide-react';
import { toast } from 'sonner';
import { rentalSchema } from '@/lib/schemas/rental.schema';
import { rentalFormData } from '@/constants/data';
import { Combobox } from '@/components/global/combo-box';

export const RentalForm = () => {

  const form = useForm<z.infer<typeof rentalSchema>>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      instrumentId: "",
      userId: "",
      startDate: "",
      endDate: "",
      rentalReasonId: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof rentalSchema>) {
    const result = {
      success: true
    }

    console.log(values)

    if (result.success) {
      toast.success("Welcome to MediaKit")
    } else {
      toast.error("Error. Try again")
    }
  }

  const { isValid, isSubmitting } = form.formState

  const instruments = rentalFormData.instruments
  // const users = rentalFormData.users
  const reasons = rentalFormData.reasons

  // TODO: add a checkInbox dialog and remove the temporary isSuccess state

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full flex-col space-y-4 items-center gap-4">
          <FormField
            control={form.control}
            name={"instrumentId"}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='capitalize'>{"Instrument"}</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Combobox items={instruments} />
                  </FormControl>
                  <Button variant={"outline"} className=''>
                    <ScanLine className='size-4' /> Scan
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"rentalReasonId"}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='capitalize'>{"Reason"}</FormLabel>
                <FormControl>
                  <Combobox items={reasons} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex-col space-y-4 items-center gap-4">
          <FormField
            control={form.control}
            name={"startDate"}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='capitalize'>{"Email"}</FormLabel>
                <FormControl>
                  <Input placeholder={"DD-MMM-YYYY"} type={"text"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"endDate"}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='capitalize'>{"Email"}</FormLabel>
                <FormControl>
                  <Input placeholder={"DD-MMM-YYYY"} type={"text"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="sm" className='w-full' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className='size-4 mr-2' />
              <i>Submitting...</i>
            </span>
          ) : (
            <span className="flex items-center">
              <span>Create</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}
