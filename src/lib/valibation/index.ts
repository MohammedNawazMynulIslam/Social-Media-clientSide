import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(3,{message:"Too Short for name"}),
    username: z.string().min(3,{message:"Too Short for user name"}),
    email: z.string().email(),
    password:z.string().min(6,{message:"Too Short for password"})
  })
