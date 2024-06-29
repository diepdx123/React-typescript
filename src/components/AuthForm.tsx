import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { User } from '../interfaces/user'
import AuthSchema from '../schema/AuthSchema'
import instance from '../axios/instance'
import { useNavigate } from 'react-router-dom'

type Props = {
  isRegister?: boolean
}

function AuthForm({ isRegister }: Props) {
  const nav = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<User>({ resolver: zodResolver(AuthSchema) })

  const onSubmit: SubmitHandler<User> = (data) => {
    ;(async () => {
      try {
        if (isRegister) {
          console.log(data)
          await instance.post(`/register`, data)
          if (confirm('Successfully, redirect login page?')) {
            nav('/')
          }
        } else {
          const result = await instance.post(`/login`, data)
          localStorage.setItem('user', JSON.stringify(result.data))
          if (confirm('Successfully, redirect home page?')) {
            nav('/')
          }
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          email
        </label>

        <input type='email' className='form-control' id='email' {...register('email', { required: true })} />
        {errors.email?.message && <p className='text-danger'>{errors.email?.message}</p>}
      </div>

      {isRegister && (
        <div className='mb-3'>
          <label htmlFor='userName' className='form-label'>
            userName
          </label>
          <input
            type='text'
            step='0.01'
            className='form-control'
            id='userName'
            {...register('userName', { required: true })}
          />
          {errors.userName?.message && <p className='text-danger'>{errors.userName?.message}</p>}
        </div>
      )}

      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          password
        </label>
        <input type='text' className='form-control' id='password' {...register('password', { required: true })} />
        {errors.password?.message && <p className='text-danger'>{errors.password?.message}</p>}
      </div>
      <button type='submit' className='btn btn-primary'>
        {isRegister ? 'Dang ki' : 'Dang nhap'}
      </button>
    </form>
  )
}

export default AuthForm
