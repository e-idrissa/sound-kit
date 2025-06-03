import { PageTitle } from '@/components/global/page-title'
import { Package2 } from 'lucide-react'
import React from 'react'

const RentalsPage = () => {
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='manage rentals' icon={Package2}/>
      </div>
    </div>
  )
}

export default RentalsPage