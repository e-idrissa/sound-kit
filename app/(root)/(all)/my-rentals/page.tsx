import { PageTitle } from '@/components/global/page-title'
import { UICard } from '@/components/global/ui-card'
import { ScrollText } from 'lucide-react'
import React from 'react'
import { RentalsTable } from '@/components/global/rentals-table/data-table'
import { columns } from '@/components/global/rentals-table/columns'
import { rentals } from '@/constants/data'
import { RentalCard } from './_components/rental-card'

const MyRentalsPage = () => {
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='my rentals' icon={ScrollText} />
      </div>
      <div className="w-full space-y-0 p-8">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex items-center gap-8">
              <UICard
                label={'Total'}
                amount={123}
                icon={ScrollText}
              />
              <UICard
                label={'Active'}
                amount={13}
                icon={ScrollText}
                isActive={true}
              />
            </div>
            <div className="flex items-center gap-8">
              <UICard
                label={'Closed'}
                amount={23}
                icon={ScrollText}
                variant='closed'
              />
              <UICard
                label={'Pending'}
                amount={3}
                icon={ScrollText}
                variant='pending'
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <RentalsTable columns={columns} data={rentals} />
          </div>
          <div className="w-full lg:w-1/4 py-8">
            <RentalCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyRentalsPage