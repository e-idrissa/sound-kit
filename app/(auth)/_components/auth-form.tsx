"use client";

import React, { useState } from 'react'
import z from "zod"
import { AuthFormProps, PasswordFieldProps } from '@/lib/props'
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
import { redirect } from 'next/navigation';
import { signInSchema, signUpSchema } from '@/lib/schemas/auth.schema';
import { toast } from 'sonner';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { PasswordStrength } from './password-strength';
import { handleSignIn, handleSignUp } from '@/lib/actions/auth.actions';

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

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmedPassword: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const result = await handleSignUp(values)

    if(result.success) {
      toast.success("Welcome to MediaKit")
      redirect("/")
    } else {
      toast.error("Error. Try again")
    }
  }

  const { isValid, isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name={"firstname"}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='capitalize'>{"first name"}</FormLabel>
                <FormControl>
                  <Input placeholder={"John"} type={"text"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"lastname"}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='capitalize'>{"Last name"}</FormLabel>
                <FormControl>
                  <Input placeholder={"Doe"} type={"text"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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

const SignInForm = () => {

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const result = await handleSignIn(values)

    if(result.success) {
      toast.success("Welcome to MediaKit")
      redirect("/")
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
        <div className="w-full flex justify-end">
          <Link href={"/forgot-password"} className='text-blue-500 italic text-sm -mt-2 mb-1 hover:underline'>Forget password?</Link>
        </div>
        <Button type="submit" size="sm" className='w-full' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className='size-4 mr-2 animate-spin' />
              <i>Submitting...</i>
            </span>
          ) : (
            <span className="flex items-center">
              <span>Sign In</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}

export const AuthForm = ({ type }: AuthFormProps) => {
  if (type === "sign-in") return <SignInForm />
  else if (type === "sign-up") return <SignUpForm />
  else return null
}
