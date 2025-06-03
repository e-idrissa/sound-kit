
import { Profile } from '@/components/global/profile-card'
import { getUserById } from '@/lib/actions/user.actions'


const UserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const user = await getUserById(id)

  return (
    <div className='w-full p-8 flex flex-col lg:flex-row gap-8'>
      <div className="w-full lg:w-1/2">
        <Profile user={user!} isProfile={false}/>
      </div>
      <div className="w-full lg:w-1/2"></div>
    </div>
  )
}

export default UserPage