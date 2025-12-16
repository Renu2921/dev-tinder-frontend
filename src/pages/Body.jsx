import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-500 via-red-500 to-orange-500 opacity-90'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Body
