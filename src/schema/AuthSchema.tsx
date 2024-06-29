import * as z from 'zod'

const AuthSchema = z.object({
  email: z.string(),
  userName: z.string().min(3, { message: 'ten co it nhat 3 ki tu' }),
  password: z.string().min(6, { message: 'mat khau co it nhat 6 ki tu' })
})

export default AuthSchema
