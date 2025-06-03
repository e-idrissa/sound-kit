"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserFormProps } from "@/lib/props"

export function UserForm({ user, type, isAdmin }: UserFormProps) {
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      role: user?.role || "technician",
    },
  })

  function onSubmit(data: z.infer<typeof userSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    setSuccess(true)
  }

  const { isValid, isSubmitting } = form.formState

  const Message = () => {
    return (
      <>
        {success !== undefined && (
          <div className={cn("p-3 text-sm rounded-md flex items-center gap-4", success === true ? "text-green-500 bg-green-500/20 border border-green-500/60" : "text-red-500 bg-red-500/20 border border-red-500/60")}>
            {success === true && (
              <>
                <CircleCheck className="size-4" />
                <span className="text-sm">User {type === "create" ? "created" : "updated"} successfully</span>
              </>
            )}
            {success === false && (
              <>
                <CircleAlert className="size-4" />
                <span className="text-sm">Failed to {type === "create" ? "create" : "update"} user</span>
              </>
            )}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="w-full space-y-6">
      <Message />
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
                            <RadioGroupItem value="admin" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Admin
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="technician" />
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
                    <Loader2 className='size-4 mr-2' />
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
