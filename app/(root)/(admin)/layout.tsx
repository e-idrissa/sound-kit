import { users } from '@/constants/data'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode}) => {
  const user = users[0]

  if(!user) redirect("/sign-in")

  if(user.role !== "admin") redirect("/")
  
  return (
    <div>{children}</div>
  )
}

export default AdminLayout