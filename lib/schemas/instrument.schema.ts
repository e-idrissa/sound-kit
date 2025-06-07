import z from "zod";

export const newInstrumentSchema = z.object({
  quantity: z.string().min(1, {
    message: "Missing quantity"
  }),
  categoryId: z.string().min(2, {
    message: "Missing category"
  }),
  brandId: z.string().min(2, {
    message: "Missing brand"
  }),
  state: z.enum(["new", "dated", "damaged"]),
  situation: z.enum(["available", "rented"]),
  warehouseId: z.string().min(2, {
    message: "Missing warehouse"
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
  state: z.string().min(2, {
    message: "Missing state"
  }),
  warehouseId: z.string().min(2, {
    message: "Missing warehouse"
  }),
  situation: z.string().min(2, {
    message: "Missing situation"
  }),
})
