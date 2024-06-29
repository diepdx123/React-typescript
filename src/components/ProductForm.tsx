import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import instance from '../axios/instance'
import { Product } from '../interfaces/product'
import schemaProduct from '../schema/ProductSchema'

type Props = {
  onProduct: (product: Product) => void
}

function ProductForm({ onProduct }: Props) {
  const { id } = useParams()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<Product>({ resolver: zodResolver(schemaProduct) })

  if (id) {
    useEffect(() => {
      ;(async () => {
        const { data } = await instance.get(`/products/${id}`)
        reset(data)
      })()
    }, [])
  }

  const onSubmit: SubmitHandler<Product> = (data) => {
    if (id) {
      onProduct({ ...data, id })
    } else {
      onProduct(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-3'>
        <label htmlFor='title' className='form-label'>
          Title
        </label>

        <input type='text' className='form-control' id='title' {...register('title', { required: true })} />
        {errors.title?.message && <p className='text-danger'>{errors.title?.message}</p>}
      </div>
      <div className='mb-3'>
        <label htmlFor='price' className='form-label'>
          price
        </label>
        <input
          type='number'
          step='0.01'
          className='form-control'
          id='price'
          {...register('price', { required: true, valueAsNumber: true })}
        />
        {errors.price?.message && <p className='text-danger'>{errors.price?.message}</p>}
      </div>
      <div className='mb-3'>
        <label htmlFor='description' className='form-label'>
          Description
        </label>
        <input type='text' className='form-control' id='description' {...register('description')} />
        {errors.description?.message && <p className='text-danger'>{errors.description?.message}</p>}
      </div>
      <button type='submit' className='btn btn-primary'>
        {id ? 'eidt' : 'add'}
      </button>
    </form>
  )
}
export default ProductForm
