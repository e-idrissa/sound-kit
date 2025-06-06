import React from 'react'
import { PageTitle } from '@/components/global/page-title'
import { UICard } from '@/components/global/ui-card'
import { Guitar } from 'lucide-react'
import { InstrumentsTable } from '@/components/global/instruments-table/data-table'
import { columns } from '@/components/global/instruments-table/columns'
import RequestsCard from './_components/requests-card'
import { getInstrumentsByUserId } from '@/lib/actions/intrument.actions'
import { getAuthToken } from '@/lib/actions/auth.actions'
import { redirect } from 'next/navigation'

const MyInstrumentsPage = async () => {
  const jwt = await getAuthToken() as IJWT
  if (!jwt) return redirect('/sign-in')

  const { instruments, instrumentsCount } = await getInstrumentsByUserId(jwt.userId!)

  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='my instruments' icon={Guitar} />
      </div>
      <div className="w-full space-y-8 p-8">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-8">
            <UICard
              label={'My Intruments'}
              amount={instrumentsCount!}
              icon={Guitar}
              className='hidden lg:block'
            />
            <RequestsCard />
          </div>
        </div>
        <div className="w-full">
          <div className="">
          <InstrumentsTable columns={columns} data={instruments!} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyInstrumentsPage