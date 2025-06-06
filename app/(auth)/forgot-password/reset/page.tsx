import React from 'react'
import Link from 'next/link'
import { KeyRound } from 'lucide-react'
import { redirect } from 'next/navigation'
import { PasswordForm } from '../../_components/password-form'
import { ResetPasswordProps } from '@/lib/types/props'
import { validateResetToken } from '@/lib/actions/auth.actions'

const SetPasswordPage = async ({ searchParams }: ResetPasswordProps) => {
  const token = searchParams?.token
  if (!token) redirect('/sign-in')

  const { valid, user } = await validateResetToken(token)
  if (!valid || !user) redirect('/sign-in')

  return (
    <div className='space-y-4'>
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-input">
        <KeyRound className='text-white bg-blue-700 rounded-md p-2 size-12 mb-2' />
        <h3 className='text-md font-medium'>Password Setup</h3>
        <p className='text-muted-foreground text-sm'>Enter your new password</p>
      </div>
      <PasswordForm userId={user.id} />
      <div className="text-muted-foreground text-sm text-center border-t border-input pt-2 mt-6">
        <span>Remember your password? <Link className="text-blue-500 hover:underline" href={"/sign-in"}>Back to Sign In</Link></span>
      </div>
    </div>
  )
}

export default SetPasswordPage