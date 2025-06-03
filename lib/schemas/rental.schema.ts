import z from "zod";

export const rentalSchema = z.object({
  instrumentId: z.string().min(2, {
    message: "Missing instrument"
  }),
  userId: z.string().min(2, {
    message: "Missing user"
  }),
  startDate: z.string(),
  endDate: z.string(),
  rentalReasonId: z.string().min(2, {
    message: "Missing Reason"
  })
})