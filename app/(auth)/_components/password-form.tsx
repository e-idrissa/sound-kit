"use client";

import React, { useState } from 'react'
import z from "zod"
import { PasswordFieldProps } from '@/lib/types/props'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { redirect } from 'next/navigation';
import { setPasswordSchema } from '@/lib/schemas/auth.schema';
import { toast } from 'sonner';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import { PasswordStrength } from './password-strength';
import { handleSetPassword } from '@/lib/actions/auth.actions';
import { PasswordFormProps } from '@/lib/types/props';

const PasswordInput = ({ field }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="pr-10"
          {...field}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            type="button"
            className='bg-none'
            variant={"ghost"}
            size={"icon"}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeClosed className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const PasswordForm = ({ userId }: PasswordFormProps) => {
  const form = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmedPassword: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof setPasswordSchema>) {
    if(values.password !== values.confirmedPassword) {
      toast.error("Passwords do not match")
      return
    }
    const result = await handleSetPassword({ userId, ...values })

    if(result.success) {
      toast.success("Password set successfully")
      redirect("/profile")
    } else {
      toast.error("Error. Try again")
    }
  }

  const { isValid, isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='capitalize'>{"Password"}</FormLabel>
              <FormControl>
                <PasswordInput field={field}/>
              </FormControl>
              <PasswordStrength password={field.value} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"confirmedPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='capitalize'>{"Confirm Password"}</FormLabel>
              <FormControl>
                <PasswordInput field={field}/>
              </FormControl>
              <PasswordStrength password={field.value} />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className='w-full' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className='size-4 mr-2 animate-spin' />
              <i>Submitting...</i>
            </span>
          ) : (
            <span className="flex items-center">
              <span>Set Password</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}

