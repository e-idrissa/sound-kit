import z from "zod";

export const rentalSchema = z.object({
  instrumentIds: z.array(z.string()),
  startDate: z.date(),
  endDate: z.date(),
  rentalReasonId: z.string().min(2, {
    message: "Missing Reason"
  })
})