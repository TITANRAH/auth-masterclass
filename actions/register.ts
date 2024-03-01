'use server'

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log("values desde actioon register >>>", values);

  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Campos invalidos!" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email: email },
  });

  if(existingUser) {
    return {error: 'Email ya existe !'}
  }

  await db.user.create({
    data: {
        name:name,
        email:email,
        password: hashedPassword
    }
  })

//   TODO enviar token en email de verificacion

  return { success: "Usuario Creado" };
};
