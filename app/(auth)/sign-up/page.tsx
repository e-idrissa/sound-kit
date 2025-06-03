import React from 'react'
import { AuthForm } from '../_components/auth-form'
import Link from 'next/link'
import { Clapperboard } from 'lucide-react'

const SignUpPage = () => {
  return (
    <div className='space-y-4'>
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-input">
        <Clapperboard className='text-white bg-blue-700 rounded-md p-2 size-12 mb-2' />
        <h3 className='text-md font-medium'>Welcome to MediaKit</h3>
        <p className='text-muted-foreground text-sm'>Enter your informations to get started</p>
      </div>
      <AuthForm type='sign-up' />
      <div className="text-muted-foreground text-sm text-center border-t border-input pt-2 mt-6">
        <span>Already have an account? <Link className="text-blue-500 hover:underline" href={"/sign-in"}>Sign in</Link></span>
      </div>
    </div>
  )
}

export default SignUpPage