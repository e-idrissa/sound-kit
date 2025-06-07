import { PageTitle } from '@/components/global/page-title'
import { Construction, Package } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const LoansPage = () => {
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='Manage Loans' icon={Package} />
      </div>
      <div className="w-full space-y-0 p-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <Construction className='size-28 lg:size-32 text-white bg-blue-700 rounded-full p-6 mt-36' />
          <p className='text-2xl font-semibold'>Page Under Construction</p>
          <p className='text-xl text-muted-foreground'>Check back later</p>
          <Link href="/admin/instruments" className='text-blue-600 hover:underline text-lg'>Go Back</Link>
        </div>
      </div>
    </div>
  )
}

export default LoansPage