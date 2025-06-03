import z from "zod";

export const newInstrumentSchema = z.object({
  
  categoryId: z.string().min(2, {
    message: "Missing category"
  }),
  brandId: z.string().min(2, {
    message: "Missing brand"
  }),
  state: z.enum(["new", "dated", "damaged"]),
  situation: z.enum(["available", "rented"]),
  local: z.enum(["local-1", "local-2", "local-3"]),
  qrCodeId: z.string().min(2, {
    message: "Missing QR Code"
  }),
})

export const editInstrumentSchema = z.object({
  id: z.string().min(2, {
    message: "Missing id"
  }),
  qrCodeId: z.string().min(2, {
    message: "Missing QR Code"
  }),
  userId: z.string(),
  categoryId: z.string().min(2, {
    message: "Missing category"
  }),
  brandId: z.string().min(2, {
    message: "Missing brand"
  }),
  state: z.enum(["new", "dated", "damaged"]),
  local: z.enum(["local-1", "local-2", "local-3"]),
  situation: z.enum(["available", "rented"]),
})
