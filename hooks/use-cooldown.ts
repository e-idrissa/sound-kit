import { useEffect, useState } from "react"

export const useCooldown = () => {
  const [cooldown, setCooldown] = useState(0)

  // ⏳ Décompte automatique du cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [cooldown])

  return {cooldown, setCooldown}
}