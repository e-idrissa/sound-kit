import { UICardProps } from '@/lib/types/props'
import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'

export const UICard = ({ label, amount, icon: Icon, isActive=false, className, variant="default" }: UICardProps) => {
  const variantColors = variant === "default" ? "bg-transparent md:bg-blue-600/20 text-blue-600" 
                                              : variant === "closed" ? "bg-transparent md:bg-emerald-700/20 text-emerald-700" 
                                              : variant === "pending" ? "bg-transparent md:bg-orange-500/20 text-orange-500"
                                              : "bg-transparent md:bg-red-500/20 text-red-500"
  return (
    <Card className={cn('w-full lg:w-70 bg-background', className)}>
      <CardContent className='space-y-2 md:space-y-0'>
        <div className="flex items-center gap-2"> 
          <div className={cn(variantColors, "rounded-md p-0 md:p-2 relative")}>
            <Icon className='size-4 lg:size-5' />
            {isActive && <div className='rounded-full size-1.5 md:size-2 bg-blue-600 absolute -top-1 -right-1 md:top-0 md:-right-1' />}
          </div>
          <CardTitle>{label}</CardTitle>
        </div>
        <div className="w-full text-right text-4xl font-bold">{amount}</div>
      </CardContent>
    </Card>
  )
}
