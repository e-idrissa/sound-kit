import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { categories } from '@/constants/data'
import { CategoryBadgeProps } from '@/lib/props'
import { PlusCircle } from 'lucide-react'
import React from 'react'

const CategoryBadge = ({ label, count }: CategoryBadgeProps) => {
  return (
    <div className="rounded-md flex items-center gap-2 bg-blue-700/20 text-blue-500 w-fit px-4 py-1">
      {count} {(<span>{label}</span>)}
    </div>
  )
}

const RequestsCard = () => {
  const data = categories
  return (
    <Card className='w-fit bg-background'>
      <CardHeader className='flex items-center justify-between w-full'>
        <CardTitle>Requested Instruments</CardTitle>
        <div className="flex items-center gap-2">
          <Button size={"sm"}>
            <PlusCircle className='size-4'/>
          </Button>
          <Button size={"sm"}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className='flex items-center gap-4 flex-wrap'>
        {data.map((cat, idx) => (
          <CategoryBadge key={idx} label={cat.category} count={cat.count}/>
        ))}
      </CardContent>
    </Card>
  )
}

export default RequestsCard