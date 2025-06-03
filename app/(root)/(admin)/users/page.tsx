import { PageTitle } from '@/components/global/page-title'
import { Users2 } from 'lucide-react'
import React from 'react'
import { AdminCard } from '../_components/card'
import { UserCard } from './_components/user-card'
import { UsersTable } from '@/components/global/users-table/data-table'
import { columns } from '@/components/global/users-table/columns'
import { users } from '@/constants/data'

const UsersPage = () => {
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='manage users' icon={Users2} />
      </div>
      <div className="w-full p-8 space-y-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
          <div className="flex items-center gap-8 w-full lg:w-fit">
            <AdminCard label={"Total"} count={123} />
            <AdminCard label={"Active"} count={63} />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <UsersTable columns={columns} data={users} />
          </div>
          <div className="w-full lg:w-1/4">
            <UserCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage