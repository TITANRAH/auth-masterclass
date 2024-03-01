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
export const RegisterSchema = z.object({
  email: z.string({
    invalid_type_error: 'tipo inválido'
  }).email({
    message: 'Email es requerido'
  }),
  password: z.string().min(6,{
    message: 'Minimum 6 characters required'
  }),
  name: z.string().min(1, {
    message:'Name is required'
  })

});
