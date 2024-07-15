import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [user, setUser] = useState(true)
  const accessToken = localStorage.getItem('user')
  console.log(accessToken)
  let userInfo

  if (accessToken) {
    userInfo = JSON.parse(atob(accessToken.split('.')[1]))
    console.log('User email:', userInfo.email)
  }

  const handleLogout = () => {
    console.log(localStorage.removeItem('user'))
    localStorage.removeItem('user')
    setUser(false)
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <h2>Hello Admin</h2>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <a className='nav-link' href='#'>
                Product
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                User
              </a>
            </li>
          </ul>
        </div>

        {userInfo ? (
          <>
            `${userInfo.email}`<button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <div className='d-flex align-items-center'>
            <Link to='/login' className='btn btn-outline-primary my-2 my-sm-0 search-btn' type='button'>
              Login
            </Link>
            <Link
              to='/register'
              className='btn btn-outline-primary my-2 my-sm-0'
              type='button'
              style={{ margin: '5px' }}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Header
