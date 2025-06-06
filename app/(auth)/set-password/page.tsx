import React from 'react'
import { PasswordForm } from '../_components/password-form'
import Link from 'next/link'
import { KeyRound } from 'lucide-react'
import { getAuthToken } from '@/lib/actions/auth.actions'
import { redirect } from 'next/navigation'

const SetPasswordPage = async () => {
  const token = await getAuthToken() as IJWT
  if (!token) redirect('/sign-in')

  return (
    <div className='space-y-4'>
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-input">
        <KeyRound className='text-white bg-blue-700 rounded-md p-2 size-12 mb-2' />
        <h3 className='text-md font-medium'>Password Setup</h3>
        <p className='text-muted-foreground text-sm'>Enter your new password</p>
      </div>
      <PasswordForm userId={token.userId}/>
      <div className="text-muted-foreground text-sm text-center border-t border-input pt-2 mt-6">
        <span>Not sure? <Link className="text-blue-500 hover:underline" href={"/profile"}>Back to Profile</Link></span>
      </div>
    </div>
  )
}

export default SetPasswordPage