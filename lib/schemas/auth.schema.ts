import z from "zod";

export const signInSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  })
})

export const setPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  confirmedPassword: z.string().min(8, {
    message: "Password must be at least 8 characters."
  })
})

export const forgotPasswordSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
})
