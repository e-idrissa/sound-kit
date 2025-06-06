import { redirect } from 'next/navigation'
import { getAuthToken } from '@/lib/actions/auth.actions'

const AdminLayout = async ({ children }: { children: React.ReactNode}) => {
  const jwt = await getAuthToken() as IJWT

  if(!jwt) redirect("/sign-in")

  if(jwt.role !== "ADMIN") redirect("/")
  
  return (
    <div>{children}</div>
  )
}

export default AdminLayout