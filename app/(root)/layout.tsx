import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { cookies } from 'next/headers'
import { Notifications } from '@/components/global/notifications'
import { ModeToggle } from '@/components/global/mode-toggle'
import { getCurrentUser, getUserById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const jwt = await getCurrentUser() as IJWT

  if (!jwt) {
    return redirect("/sign-in")
  }

  const user = await getUserById(jwt.userId)

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user!}/>
      <main className='w-full'>
        <SidebarTrigger />
        <div className="flex items-center gap-4 absolute right-4 w-fit top-4">
          <div className="flex items-center">
            <Notifications />
            <ModeToggle />
          </div>
        </div>
        <section className="w-full">
          {children}
        </section>
      </main>
    </SidebarProvider>
  )
}

export default RootLayout