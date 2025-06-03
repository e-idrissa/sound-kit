import React from 'react'
import { AuthForm } from '../_components/auth-form'
import { Clapperboard } from 'lucide-react'

const SignInPage = () => {
  return (
    <div className='space-y-4 mb-4'>
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-input">
        <Clapperboard className='text-white bg-blue-700 rounded-md p-2 size-12 mb-2' />
        <h3 className='text-md font-medium'>Welcome to MediaKit</h3>
        <p className='text-muted-foreground text-sm'>Enter your informations to continue</p>
      </div>
      <AuthForm type='sign-in' />
    </div>
  )
}

export default SignInPage