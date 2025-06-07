"use client";

import React from 'react'
import z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { rentalSchema } from '@/lib/schemas/rental.schema';
import { cn, handleError } from '@/lib/utils';
import { RentalFormProps } from '@/lib/types/props';
import { createRental } from '@/lib/actions/rental.actions';
import { useRouter } from 'next/navigation';

export const RentalForm = ({ instruments, reasons, userId }: RentalFormProps) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof rentalSchema>>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      instrumentIds: [],
      startDate: undefined,
      endDate: undefined,
      rentalReasonId: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof rentalSchema>) {
    try {
      const { success } = await createRental({
        userId,
        instrumentIds: values.instrumentIds,
        rentalReasonId: values.rentalReasonId,
        startDate: values.startDate,
        endDate: values.endDate,
      })
      if (!success) {
        toast.error("Failed to create rental")
      }
      toast.success("Rental created successfully")
      form.reset()
      router.refresh()
    } catch (error) {
      handleError({ error, message: "Error creating rental" })
    }
  }

  const { isValid, isSubmitting } = form.formState

  const groupedInstruments = ({ instruments }: groupInstrumentsByCategoryIdParams) => {
    const grouped: Record<string, groupInstrumentsByCategoryIdParams['instruments']> = {}

    for (const instrument of instruments) {
      const key = instrument.categoryId
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(instrument)
    }

    const groups = Object.values(grouped)
    return groups
  }

  // TODO: add a checkInbox dialog and remove the temporary isSuccess state

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={"instrumentIds"}
          render={({ field }) => (
            <FormItem className='w-full'>
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue=""
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className='hover:underline-offset-0'>
                    <FormLabel className="font-semibold text-md">Instruments</FormLabel>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance bg-accent p-4 rounded-md">
                    {groupedInstruments({ instruments }).map((group, index) => (
                      <div key={index} className={cn(group.length <= 1 ? "hidden" : "flex items-center justify-between")}>
                        <FormLabel className="font-semibold flex items-center gap-2">
                          {group[0].category}
                        </FormLabel>
                        <Input
                          type="number"
                          className='w-[60%]'
                          placeholder={`max ${group.length - 1}`}
                          min={0}
                          max={group.length - 1}
                          onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (isNaN(value)) return

                            const selectedIds = group.slice(0, value).map(i => i.id)
                            const currentGroupIds = group.map(i => i.id)
                            const preservedIds = field.value.filter((id: string) => !currentGroupIds.includes(id))
                            form.setValue("instrumentIds", [...preservedIds, ...selectedIds])
                          }}
                        />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rentalReasonId"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormItem className="flex flex-col">
                  <FormLabel>Reason</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          type='button'
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? reasons?.find(
                              (reason) => reason.id === field.value
                            )?.name
                            : "Select reason"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search reason..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No reason found.</CommandEmpty>
                          <CommandGroup>
                            {reasons?.map((reason) => (
                              <CommandItem
                                value={reason.name}
                                key={reason.id}
                                onSelect={() => {
                                  form.setValue("rentalReasonId", reason.id)
                                }}
                              >
                                {reason.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    reason.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex-col space-y-4 items-center gap-4">
          <FormField
            control={form.control}
            name={"startDate"}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className='capitalize'>{"From"}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className='capitalize'>{"To"}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="sm" className='w-full' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className='size-4 mr-2 animate-spin' />
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
