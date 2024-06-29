import * as z from 'zod'

const schemaProduct = z.object({
  title: z.string().min(3, { message: 'Ten phai co it nhat 3 ki tu' }),
  price: z.number().min(1, { message: 'Giá phải lớn hơn 0' }),
  description: z.string().optional()
})

export default schemaProduct
