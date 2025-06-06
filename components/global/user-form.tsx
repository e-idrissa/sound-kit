"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { userSchema } from "@/lib/schemas/user.schema"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserFormProps } from "@/lib/types/props"
import { useRouter } from "next/navigation"
import { createUser, updateUser } from "@/lib/actions/user.actions"
import { Message } from "./message"
import { useCooldown } from "@/hooks/use-cooldown"

export function UserForm({ user, type, isAdmin }: UserFormProps) {
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const { setCooldown } = useCooldown()
  const router = useRouter()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      role: user?.role || "TECHNICIAN",
    },
  })

  async function onSubmit(data: z.infer<typeof userSchema>) {
    try {
      if (type === "create") {
        const result = await createUser(data)
        if (result.success) {
          setCooldown(10)
          setSuccess(true)
          form.reset()
          router.refresh()
        } else {
          setSuccess(false)
        }
      } else {
        const result = await updateUser(data)
        if (result.success) {
          setSuccess(true)
          form.reset()
          router.refresh()
        } else {
          setSuccess(false)
        }
      }
    } catch (error) {
      console.error(error)
      setSuccess(false)
    }
  }

  const { isValid, isSubmitting } = form.formState

  return (
    <div className="w-full space-y-6">
      <Message success={success} />
      <Card className="bg-background">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center"
                        disabled={!isAdmin}
                      >
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="ADMIN" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Admin
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="TECHNICIAN" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Technician
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="sm" className='w-full' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className='size-4 mr-2 animate-spin' />
                    <i>{type === "create" ? "Creating" : "Updating"}...</i>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span>{type === "create" ? "Create" : "Update"} User</span>
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
