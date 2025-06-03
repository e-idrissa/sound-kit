import { Camera, Guitar, Speaker, Video } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const Guitard = () => {
  return (
    <Guitar className='size-4 text-blue-500'/>
  )
}

export const Seaker = () => {
  return (
    <Speaker className='size-4 text-blue-500'/>
  )
}

export const PhotoCamera = () => {
  return (
    <Camera className='size-4 text-blue-500'/>
  )
}

export const VideoDevice = () => {
  return (
    <Video className='size-4 text-blue-500'/>
  )
}

export const Micro = () => {
  return (
    <Image src={"/images/microphone.png"} alt={"micro"} width={20} height={20}/>
  )            
}

export const Mixer = () => {
  return (
    <Image src={"/images/mixer.png"} alt={"micro"} width={16} height={16}/>
  ) 
}
