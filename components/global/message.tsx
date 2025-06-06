import { MessageProps } from "@/lib/types/props"
import { cn } from "@/lib/utils"
import { CircleAlert, CircleCheck } from "lucide-react"

export const Message = ({ success }: MessageProps) => {
  return (
    <>
      {success !== undefined && (
        <div className={cn("p-3 text-sm rounded-md flex items-center gap-4", success === true ? "text-green-500 bg-green-500/20 border border-green-500/60" : "text-red-500 bg-red-500/20 border border-red-500/60")}>
          {success === true && (
            <>
              <CircleCheck className="size-4" />
              <span className="text-sm">Successfully done.</span>
            </>
          )}
          {success === false && (
            <>
              <CircleAlert className="size-4" />
              <span className="text-sm">Failed! Something went wrong.</span>
            </>
          )}
        </div>
      )}
    </>
  )
}