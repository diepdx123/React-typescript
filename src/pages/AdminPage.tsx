import { Link } from 'react-router-dom'
import { Product } from '../interfaces/product'

type Props = {
  products: Product[]
  onDelete: (id: string) => void
}

const Admin = ({ products, onDelete }: Props) => {
  const remove = (id: string) => {
    onDelete(id)
  }
  return (
    <div>
      <Link to='/admin/product-add' type='button' className='btn btn-success' style={{ margin: '5px' }}>
        Add
      </Link>
      <table className='table table-bordered'>
        <thead className='table-light'>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <Link to={`/admin/product-edit/${item.id}`} type='button' className='btn btn-warning'>
                  Edit
                </Link>{' '}
                <Link to='#' onClick={() => remove(item.id!)} className='btn btn-danger' style={{ margin: '5px' }}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
