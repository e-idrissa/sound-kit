import { PageTitle } from '@/components/global/page-title'
import { Package } from 'lucide-react'
import React from 'react'

const LoansPage = () => {
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='Manage Instruments' icon={Package} />
      </div>
    </div>
  )
}

export default LoansPage