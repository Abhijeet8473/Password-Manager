import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800 text-white'>
        <div className='mycontainer flex justify-between items-center px-4 h-20 py-5'>
        <div className="logo font-bold text-2xl">Password Manager</div>
      <ul>
        <li className=' flex gap-4'>
            <a href='#' className=' hover:font-bold'>Home</a>
            <a href='#' className=' hover:font-bold'>About</a>
            <a href='#' className=' hover:font-bold'>Contact</a>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar
