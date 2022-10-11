import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import { BsPlusSquare } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
  const [input, setinput] = useState('')

  return (
      <nav className='px-[9vw] py-2 flex justify-between text-3xl '>
        <ul className="flex">
          <li className="nav"><AiFillHome/></li>
          <li className="nav"><IoIosSearch/></li>
          <li className="nav"><BsPlusSquare/></li>
          <li className="nav"><BsHeart/></li>
          <li className="nav"><CgProfile/></li>
        </ul>

        <input 
          className='hidden lg:block bg-gray-200 m-1 rounded mr-64 w-80'
          value={input} 
          onChange={e => setinput(e.target.value)}
        />

        <div className="inline-block">مانیتو</div>
      </nav>
  )
}

export default Navbar