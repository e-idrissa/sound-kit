import React from 'react'
import { redirect } from 'next/navigation'
import { PageTitle } from '@/components/global/page-title'
import { UICard } from '@/components/global/ui-card'
import { Guitar, ScrollText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { InstrumentsChart } from './_components/chart'
import { InstrumentDialog } from '@/components/global/instrument-dialog'
import { getAuthToken } from '@/lib/actions/auth.actions'
import { getInstrumentsByUserId } from '@/lib/actions/intrument.actions'

const HomePage = async () => {
  const jwt = await getAuthToken() as IJWT
  if (!jwt) return redirect('/sign-in')

  const isAdmin = jwt.role === "ADMIN"

  const { instruments, instrumentsCount } = await getInstrumentsByUserId(jwt.userId!)

  return (
    <div className='w-full'>
      <div className="relative w-96">
        <PageTitle title='Home' />
      </div>
      <div className="w-full flex flex-col-reverse lg:flex-row gap-4 px-4 py-8">
        <Card className="w-full bg-background border-none p-0 shadow-none">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="">
                <h2 className="text-xl font-semibold">
                  Recent Instruments
                </h2>
                <p className='text-sm text-muted-foreground'>Browse your recently used instruments</p>
              </div>
              <div className="flex items-center justify-end gap-2">
                {isAdmin && (
                  <InstrumentDialog />
                )}
              </div>
            </div>
            <DataTable columns={columns} data={instruments!} />
          </CardContent>
        </Card>
        <div className="w-full lg:w-2/5 space-y-8 p-4">
          <div className="flex flex-row gap-8">
            <UICard
              label={'My Intruments'}
              amount={instrumentsCount!}
              icon={Guitar}
            />
            <UICard
              label={'My Rentals'}
              amount={103}
              icon={ScrollText}
            />
          </div>
          <InstrumentsChart />
        </div>
      </div>
    </div>
  )
}

export default HomePage