import { Card, CardContent } from '@/components/ui/card'
import { Pen, Shield, User2 } from 'lucide-react'
import React from 'react'
import { ProfileCardProps } from '@/lib/props'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { UserForm } from './user-form'

export const Profile = ({ user, isProfile }: ProfileCardProps) => {
  return (
    <Card className='w-full bg-background'>
      <CardContent className='flex flex-col lg:flex-row items-center gap-4 h-full'>
        <div className="flex flex-col items-center gap-4 py-8 px-12 w-2/5">
          <div className="relative size-30 rounded-full bg-blue-600 flex items-center justify-center p-6">
            <User2 className='size-24 text-white' />
            <Dialog>
              <DialogTrigger asChild className='absolute -bottom-0 -right-3'>
                <Button className='bg-background hover:bg-background hover:cursor-pointer rounded-full size-10'>
                  <Pen className='size-10 p-3 text-primary' />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User&apos;s Informations</DialogTitle>
                </DialogHeader>
                <UserForm user={user} type="edit" />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <Badge className='bg-blue-500/20 text-blue-600 capitalize text-xs'>{user.role}</Badge>
            <Badge className={cn("capitalize text-xs", user.status === "active" ? "bg-green-500/20 text-green-600" : "bg-orange-500/20 text-orange-600")}>{user.status}</Badge>
          </div>
          <div className="flex items-center flex-col">
            <p className="text-lg font-medium">{user.firstname + " " + user.lastname}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="h-full w-full lg:w-3/5 p-8 border-t lg:border-t-0 border-l-0 lg:border-l border-l-accent">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-1 rounded bg-accent py-1 px-3 w-fit">
                <Shield className='size-4' />
                Security
              </div>
              <p className="text-xs text-muted-foreground">Be careful when manipulationg this informations. They garantee access to the user.</p>
              <div className="space-y-4">
                <Label>Password Key</Label>
                <Input type="password" placeholder="••••••••" disabled />
              </div>
              <p className="text-xs text-muted-foreground">You can change the account password here. Notice that once changed, the action can not be undone.</p>
              <Button disabled={isProfile}>Change password</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}