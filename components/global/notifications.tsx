import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Bell, X } from 'lucide-react'
import { notifications } from '@/constants/data'
import { cn } from '@/lib/utils'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '../ui/alert-dialog'
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'

const Dot = ({ color }: { color: string }) => {
  return (
    <div className={cn('size-2 rounded-full', color)} />
  )
}

const Overview = (item: INotification) => {
  const date = item.createdAt.toISOString()
  const color = item.status === "read" ? "bg-zinc-400" : "bg-blue-600"

  return (
    <AlertDialog>
      <AlertDialogTrigger className='flex items-center gap-2 text-sm bg-secondary py-2 px-4 w-70 rounded-lg'>
        <Dot color={color} />
        <div className="flex flex-col items-start text-sm">
          <p>From {item.sender}</p>
          <p className='text-xs text-muted-foreground'>since {item.createdAt.toISOString()}</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='flex flex-col space-y-0'>
          <AlertDialogTitle>System Notification</AlertDialogTitle>
          <span className="text-xs text-muted-foreground">Since {date}</span>
        </AlertDialogHeader>
        <AlertDialogDescription className='text-base'>
          {item.message}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const Notifications = () => {
  const unreads = notifications.filter((i) => i.status === "unread")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className='relative'>
          <Bell className="size-4" />
          {unreads.length > 0 && (
            <span className="absolute text-xs top-2 right-2 bg-red-500 p-1 rounded-full size-2" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='max-h-76 w-75 space-y-1.5 px-4 py-3 border-none bg-background'>
        <DropdownMenuItem className='rounded-full group  h-10 bg-secondary' asChild>
          <div className="flex items-center gap-2 w-fit">
            <Button variant={"ghost"} className='bg-secondary rounded-full py-2'>
              Clear All
              <X className='size-4 hidden group-hover:block group-hover:animate-in' />
            </Button>

          </div>
        </DropdownMenuItem>
        {notifications.map((item, idx) => {
          return (<Overview key={idx} {...item} />)
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
