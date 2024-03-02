'use server'

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log("values desde actioon register >>>", values);

  // valido los camnpos
  const validateFields = RegisterSchema.safeParse(values);

  // si la validacion no es correcta retorna un error
  if (!validateFields.success) {
    return { error: "Campos invalidos!" };
  }

  // destructuro los datos que vienene en los campos validados
  const { email, password, name } = validateFields.data;

  // hasheo el pasword
  const hashedPassword = await bcrypt.hash(password, 10);

  // busco si existe el usuario que viene en los campos ingresados 
  const existingUser = await getUserByEmail(email)
  
  // si el correo existe existe el usuario retorno error 
  if(existingUser) {
    return {error: 'Email ya existe !'}
  }

  // si pasa todas las validaciones guardo en bd 
  await db.user.create({
    data: {
        name:name,
        email:email,
        password: hashedPassword
    }
  })

//   TODO enviar token en email de verificacion

//  y retorno un success con usuario creado
  return { success: "Usuario Creado" };
};
