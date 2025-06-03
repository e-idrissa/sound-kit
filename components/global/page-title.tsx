import { PageTitleProps } from '@/lib/props'
import { Home } from 'lucide-react'
import React from 'react'

export const PageTitle = ({ title, icon:Icon = Home }: PageTitleProps) => {
  return (
    <div className="absolute -top-7 left-8 text-sm font-medium bg-sidebar border border-input px-2 py-1 rounded uppercase flex items-center-safe">
      <Icon className='size-4 mr-2'/>
      <p>{title}</p>
    </div>
  )
}
