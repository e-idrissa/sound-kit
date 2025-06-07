import { PageTitle } from '@/components/global/page-title'
import { columns } from '@/components/global/rentals-table/columns'
import { Package2 } from 'lucide-react'
import React from 'react'
import { AdminCard } from '../_components/card'
import { RentalsTable } from '@/components/global/rentals-table/data-table'
import { getAllRentals, getPendingRentals } from '@/lib/actions/rental.actions'
import RentalsList from './_components/rentals-list'

const RentalsPage = async () => {
  const { rentals, totalRentals, activeRentalsCount, closedRentalsCount, pendingRentalsCount } = await getAllRentals()
  const { pendingRentals } = await getPendingRentals()
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='manage rentals' icon={Package2} />
      </div>
      <div className="w-full space-y-0 p-8">
        <div className="w-full flex flex-col gap-8 lg:flex-row">
          <div className="flex items-center gap-8 w-full lg:w-fit">
            <AdminCard label={"Total"} count={totalRentals!} />
            <AdminCard label={"Active"} count={activeRentalsCount!} />
          </div>
          <div className="flex items-center gap-8 w-full lg:w-fit">
            <AdminCard label={"Closed"} count={closedRentalsCount!} />
            <AdminCard label={"Pending"} count={pendingRentalsCount!} />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <RentalsTable columns={columns} data={rentals!} />
          </div>
          <div className="w-full lg:w-1/4 py-8">
            <RentalsList rentals={pendingRentals!} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalsPage