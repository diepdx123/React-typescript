import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getProducts = async () => {
  try {
    const { data } = await instance.get('/products')
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
export default instance
