import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import instance, { getProducts } from './axios/instance'
import Header from './components/Header'
import ProductForm from './components/ProductForm'
import { Product } from './interfaces/product'
import Admin from './pages/AdminPage'
import AuthForm from './components/AuthForm'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const nav = useNavigate()
  useEffect(() => {
    ;(async () => {
      const { data }: { data: Product[] } = await instance.get('/products')
      setProducts(data)
    })()
  }, [])
  const handleSubmitForm = (data: Product) => {
    ;(async () => {
      try {
        if (data.id) {
          console.log(data.id)

          await instance.patch(`/products/${data.id}`, data)
          const newData = await getProducts()
          setProducts(newData)
        } else {
          const res = await instance.post('/products', data)
          setProducts([...products, res.data])
          console.log('add')
        }
        if (confirm('Thao tac thanh cong, quay lai danhsach')) {
          nav('/')
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }
  const handleRemove = (id: string) => {
    ;(async () => {
      try {
        if (confirm('Ban chac xoa chu?')) {
          await instance.delete(`/products/${id}`)
          const newData = products.filter((item) => item.id !== id)
          setProducts(newData)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Admin products={products} onDelete={handleRemove} />} />
        <Route path='/product-add' element={<ProductForm onProduct={handleSubmitForm} />} />
        <Route path='/product-edit/:id' element={<ProductForm onProduct={handleSubmitForm} />} />
        <Route path='/login' element={<AuthForm />} />
        <Route path='/register' element={<AuthForm isRegister />} />
      </Routes>
    </>
  )
}

export default App
