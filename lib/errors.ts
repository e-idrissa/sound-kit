import { toast } from "sonner"

export const errorHandler = (error: unknown) => {
  console.error(error || "Something went wrong")
  toast.error("Something went wrong...")
}