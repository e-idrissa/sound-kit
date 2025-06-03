import { AdminCardProps } from '@/lib/props'
import React from 'react'

export const AdminCard = ({ label, count}: AdminCardProps) => {
  return (
    <div className='rounded-lg p-4 bg-input flex flex-col lg:flex-row lg:items-center lg:justify-between w-full lg:w-70'>
      <h3 data-slot="card-title" className="leading-none font-medium">{label}</h3>
      <span className="text-4xl font-bold">{count}</span>
    </div>
  )
}
