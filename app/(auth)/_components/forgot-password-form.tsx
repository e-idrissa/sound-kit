"use client";

import React from 'react'
import z from "zod"
import { useForm} from 'react-hook-form'
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
import { forgotPasswordSchema } from '@/lib/schemas/auth.schema';
import { Loader2 } from 'lucide-react';
import { handleForgotPassword } from '@/lib/actions/auth.actions';
import { toast } from 'sonner';

export const ForgotPasswordForm = () => {

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const result = await handleForgotPassword(values)

    if(result.success) {
      toast.success("Welcome to MediaKit")
    } else {
      toast.error("Error. Try again")
    }
  }

    const { isValid, isSubmitting } = form.formState

  // TODO: add a checkInbox dialog and remove the temporary isSuccess state

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='capitalize'>{"Email"}</FormLabel>
              <FormControl>
                <Input placeholder={"user@gmaill.com"} type={"email"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className='w-full' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className='size-4 mr-2' />
              <i>Submitting...</i>
            </span>
          ) : (
            <span className="flex items-center">
              <span>Sign Up</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}
