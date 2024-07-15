import * as z from 'zod'

const AuthSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(6, { message: 'mat khau co it nhat 6 ki tu' })
    .max(25, { message: 'mat khau co toi da 25 ki tu' })
})

export default AuthSchema
