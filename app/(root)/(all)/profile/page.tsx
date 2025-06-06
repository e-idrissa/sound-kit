import { PageTitle } from '@/components/global/page-title'
import { Profile } from '@/components/global/profile-card'
import { User2 } from 'lucide-react'

import { getUserById } from '@/lib/actions/user.actions'
import { getAuthToken } from '@/lib/actions/auth.actions'

const ProfilePage = async () => {
  const jwt = await getAuthToken() as IJWT

  const user = await getUserById(jwt.userId)

  return (
    <div className=''>
      <div className="relative w-96">
        <PageTitle title='Profile' icon={User2} />
      </div>
      <div className='w-full p-8 flex flex-col lg:flex-row gap-8'>
      <div className="w-full lg:w-1/2">
        <Profile user={user!} isProfile={true}/>
      </div>
      <div className="w-full lg:w-1/2"></div>
    </div>
    </div>
  )
}

export default ProfilePage