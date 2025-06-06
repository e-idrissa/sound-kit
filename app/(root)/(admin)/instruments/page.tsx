import { PageTitle } from '@/components/global/page-title'
import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'
import { AdminCard } from '../_components/card'
import { InstrumentsTable } from '@/components/global/instruments-table/data-table'
import { adminColumns } from '@/components/global/instruments-table/admin-columns'
import { RequestList } from '../_components/request-list'
import { getAllInstruments } from '@/lib/actions/intrument.actions'

const InstrumentsPage = async () => {
  const { instruments, reparationCount, damagedCount, inUseCount, instrumentsCount } = await getAllInstruments()
  
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='Manage Instruments' icon={GalleryVerticalEnd} />
      </div>
      <div className="w-full space-y-8 p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
          <div className="flex items-center gap-8 w-full lg:w-fit">
            <AdminCard label={"Total"} count={instrumentsCount} />
            <AdminCard label={"In Use"} count={inUseCount} />
          </div>
          <div className="flex items-center gap-8 w-full lg:w-fit">
            <AdminCard label={"Damaged"} count={damagedCount} />
            <AdminCard label={"Reparing"} count={reparationCount} />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <InstrumentsTable columns={adminColumns} data={instruments!} isAdmin={true}/>
          </div>
          <div className="w-full lg:w-1/4">
            <RequestList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstrumentsPage