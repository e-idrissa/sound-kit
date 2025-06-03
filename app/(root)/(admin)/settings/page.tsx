import { PageTitle } from '@/components/global/page-title'
import { Settings } from 'lucide-react'
import React from 'react'

const SettingsPage = () => {
  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='system settings' icon={Settings} />
      </div>
    </div>
  )
}

export default SettingsPage