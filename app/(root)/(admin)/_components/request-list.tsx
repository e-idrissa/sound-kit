import { ActionButtons } from "@/components/global/action-buttons"
import { AlertDialogTitle, AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { requestInstrument } from "@/constants/data"
import { Info } from "lucide-react"

const Description = (req: IRequest) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex-1 justify-start p-3 pl-4 hover:cursor-pointer text-sm text-left">
        <span className="font-semibold">From:</span> {req.user}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-70">
        <AlertDialogHeader className='flex flex-row items-center'>
          <Info className='size-8 text-blue-500 bg-blue-500/20 p-2 rounded-lg' />
          <AlertDialogTitle className='w-fit'>Details</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex flex-col space-y-2 border-y border-input py-4">
          <p>
            <span className="font-semibold">Made by: </span>
            <span className="font-semibold">{req.user}</span>
          </p>
          <p>
            <span className="font-semibold">Instrument: </span>
            <span className="font-semibold">{req.instrument}</span>
          </p>
          <p>
            <span className="font-semibold">Reason: </span>
            <span className="font-semibold">{req.requestReason}</span>
          </p>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const RequestList = () => {

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-col items-center text-left w-full pt-0">
        <h3 className="text-xl font-semibold text-left w-full">Instruments Request</h3>
        <p className="text-sm text-muted-foreground text-left w-full">Valid or reject requests here</p>
      </CardHeader>
      <CardContent>
      <Card className="bg-background">
        <CardContent>
          {requestInstrument.map((req, idx) => (
            <div key={idx} className="flex items-center gap-2 w-full hover:bg-secondary/40 rounded-md pr-2">
              <Description {...req} />
              <ActionButtons id={req.id} />
            </div>
          ))}
        </CardContent>
      </Card>
      </CardContent>
    </Card>
  )
}
