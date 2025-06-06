import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = ({ error, message }: HandleErrorParams) => {
  console.error(error)
  return message
}

export const hashToken = (token: string) => {
  const hash = crypto.createHash('sha256').update(token).digest('hex')
  return hash
}
