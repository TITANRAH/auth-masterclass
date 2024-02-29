import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string({
    invalid_type_error: 'tipo inválido'
  }).email({
    message: 'Email es requerido'
  }),
  password: z.string().min(2,{
    message: 'Password es requerido'
  })
});
