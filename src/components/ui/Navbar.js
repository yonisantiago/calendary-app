import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

  const dispatch = useDispatch();
  const {name} = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch(startLogout());
  }

  return (
    <nav className='navbar navbar-dark bg-dark mb-4'>
        <a className='navbar-brand mx-2' href='/'>Calendary</a>
        <span className="navbar-text"> {name} </span>
        <button className='btn btn-outline-danger mx-2' onClick={handleLogout}> 
          <i className='fa-solid fa-arrow-right-from-bracket mx-1'> </i>
          <span>Logout</span>
        </button>
    </nav>
  )
}
