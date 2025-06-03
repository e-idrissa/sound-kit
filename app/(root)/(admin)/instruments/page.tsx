import { PageTitle } from '@/components/global/page-title'
import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'
import { AdminCard } from '../_components/card'
import { InstrumentsTable } from '@/components/global/instruments-table/data-table'
import { instruments } from '@/constants/data'
import { adminColumns } from '@/components/global/instruments-table/admin-columns'
import { RequestList } from '../_components/request-list'

const InstrumentsPage = () => {
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='Manage Instruments' icon={GalleryVerticalEnd} />
      </div>
      <div className="w-full space-y-8 p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
          <div className="flex items-center gap-8 w-full lg:w-fit">
            <AdminCard label={"Total"} count={123} />
            <AdminCard label={"In Use"} count={63} />
          </div>
          <div className="flex items-center gap-8 w-full lg:w-fit">
            <AdminCard label={"Damaged"} count={123} />
            <AdminCard label={"Reparing"} count={63} />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <InstrumentsTable columns={adminColumns} data={instruments} isAdmin={true}/>
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