import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-col items-center justify-center h-screen p-4 sm:p-0'>
      <div className="border border-input rounded-lg bg-sidebar w-full sm:w-120 p-4 flex flex-col items-center">
        
        <div className="w-full px-4">
          {children}
        </div>
      </div>
    </main>
  )
}

export default AuthLayout