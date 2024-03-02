"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log("values desde actioon login >>>", values);

  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Campos invalidos!" };
  }

  const { email, password } = validateFields.data;

  try {
    console.log("entro al try del login");

   await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    console.log("entro al error del try en login", error);
    if (error instanceof AuthError) {
      console.log("errror type", error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Ocurrió un error" };
      }
    }

    throw error;
  }
};
