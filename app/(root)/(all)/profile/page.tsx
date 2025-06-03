import { PageTitle } from '@/components/global/page-title'
import { User2 } from 'lucide-react'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='Profile' icon={User2} />
      </div>
    </div>
  )
}

export default ProfilePage