import Link from 'next/link'
import React from 'react'
import { ForgotPasswordForm } from '../_components/forgot-password-form'
import { KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ForgetPasswordPage = () => {
  return (
    <div className='space-y-4'>
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-input">
        <KeyRound className='text-white bg-blue-700 rounded-md p-2 size-12 mb-2' />
        <h3 className='text-md font-medium'>Password Recovery</h3>
        <p className='text-muted-foreground text-sm'>Enter your email to continue</p>
      </div>
      <ForgotPasswordForm />
      <div className="text-muted-foreground text-sm text-center">
        <Button variant={"secondary"} size={"sm"} className='w-full' asChild>
          <Link href={"/sign-in"}>Back</Link>
        </Button>
      </div>
    </div>
  )
}

export default ForgetPasswordPage