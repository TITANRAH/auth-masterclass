import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "./data/user"
import bcrypt from 'bcryptjs'




export default {
  // providers: [GitHub],
  providers: [Credentials({
    async authorize(credentials){
      const validateField = LoginSchema.safeParse(credentials)

      if( validateField.success){
        const {email, password} = validateField.data

        const user = await getUserByEmail(email)

        if(!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) return user;

        
      }

      return null;
    }
  })],
} satisfies NextAuthConfig