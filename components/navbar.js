import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { BiSearch } from 'react-icons/bi'
import { BsCart4, BsFillBagCheckFill } from 'react-icons/bs'
import { MdExpandMore } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import Login from './login'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import Signup from './signup'

const customStyles = {
  content: {
    zIndex: 50,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '90%',
    maxWidth:'300px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid black',
    padding: 0,
    borderRadius: '0.75rem',
  },
  overlay: {
    zIndex: 40,
    backgroundColor: 'rgba(10, 11, 13, 0.50)',
  },
}

const Navbar = () => {
  const router = useRouter()

  // toggle hamburger menu 
  const [displayMenu, setDisplayMenu] = useState(false)
  const toggleMenu = () => {
    displayMenu ?
      setDisplayMenu(false)
      :
      setDisplayMenu(true)
  }

  // toggle category
  const [displayCategory, setDisplayCategory] = useState(false)
  const toggleCategory = () => {
    displayCategory ?
      setDisplayCategory(false)
      :
      setDisplayCategory(true)
  }

  // toggle hamburger menu 
  const [displayProfile, setDisplayProfile] = useState(false)
  const toggleProfile = () => {
    displayProfile ?
      setDisplayProfile(false)
      :
      setDisplayProfile(true)
  }

  // toggle hamburger Cart 
  const [displayCart, setDisplayCart] = useState(false)
  const toggleCart = () => {
    displayCart ?
      setDisplayCart(false)
      :
      setDisplayCart(true)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 border-none z-10">

        {/* navbar  */}
        <div className="flex justify-between items-center w-screen px-2 sm:px-6 py-3 bg-yellow-400 text-white">
          <div className='px-2 flex items-center'>
            <Link href={'/'}><a><Image src={'/logo-md.png'} alt={'Evergoods'} width={140} height={42} /></a></Link>
          </div>
          <div className='flex-1 px-2 flex justify-center lg:justify-start mx-5'>
            <input type="text" placeholder='Search' className='w-10/12 max-w-4xl border-t border-l border-b text-black border-gray-400 sm:w-full outline-none p-2 rounded-l-xl text-lg' />
            <button type='button' className='border-t border-r border-b bg-white border-gray-400 rounded-r-xl flex justify-center items-center sm:p-2 hover:bg-gray-100'><BiSearch color='black' size={28} /></button>
          </div>
          <div className="flex justify-evenly items-center">
            {/* <>
          <a><button onClick={()=>{router.push(`/?modal=login`)}} type='button' className='px-4 py-2 bg-gray-800 text-white rounded-xl text-lg hover:bg-gray-700'>Login</button></a>
          <a onClick={()=>{router.push(`/?modal=signup`)}} className='px-2 cursor-pointer text-black py-2 bg-transparent text-lg hover:underline ml-2'>Signup</a>
          </> */}
            <>
            <a onClick={toggleCategory} className='cursor-pointer px-2 hidden sm:flex items-center text-black py-2 text-lg hover:underline hover:text-gray-700'><span className=" hidden sm:block">Categories </span><MdExpandMore size={24} /></a>

            <a onClick={toggleProfile} className='cursor-pointer px-2 hidden sm:flex items-center text-black py-2 text-lg hover:underline hover:text-gray-700'><span className=" hidden sm:block"><FaUserCircle size={28}/> </span><MdExpandMore size={24} /></a>

           <button type='button' onClick={toggleCart} className='flex items-center p-2 bg-gray-800 rounded-full text-lg 
           hover:bg-gray-700 ml-2'><BsCart4 size={24} /></button>

              <button type='button' onClick={toggleMenu} className='flex sm:hidden items-center p-2 text-black rounded-full text-lg 
            hover:text-gray-700 ml-2'>{displayMenu ? <GrClose size={24} /> : <GiHamburgerMenu size={24} />}</button>
            </>
          </div>
        </div>

        {/* sidebar for small devices */}
        <div className={`bg-yellow-400 sm:hidden flex flex-col transition-all duration-300 ${displayMenu ? '-translate-x-0' : '-translate-x-full'}`}>
          <Link href={'/'}><a className='px-2 flex items-center text-black py-2 text-lg hover:underline hover:text-gray-700'><span className="block">Categories </span><MdExpandMore size={24} /></a></Link>
          <Link href={'/'}><a className='px-2 flex items-center text-black py-2 text-lg hover:underline hover:text-gray-700'><span className="block">Profile </span><MdExpandMore size={24} /></a></Link>
        </div>

        {/* category  */}
        <div className={`hidden ${displayCategory ? '-translate-y-0' : '-translate-y-full'} rounded bg-white sm:flex flex-col transition-all duration-300 text-black border border-gray-500 absolute top-0 right-0 h-auto overflow-y-scroll w-3/4 lg:w-1/4 sm:w-1/2 `}>
        <div className="flex items-center justify-between p-4">
            <p className="text-black text-xl">Available categories</p>
            <button><GrClose size={24} onClick={toggleCategory} /></button>
          </div>
          <hr />
          <Link href={'/laptop'}><button onClick={toggleCategory} className='text-left w-full p-4 hover:bg-gray-100 border'>Laptop</button></Link>
          <Link href={'/bagpack'}><button onClick={toggleCategory} className='text-left w-full p-4 hover:bg-gray-100 border'>Bagpack</button></Link>
          <Link href={'/watch'}><button onClick={toggleCategory} className='text-left w-full p-4 hover:bg-gray-100 border'>Watch</button></Link>
          <Link href={'/headphone'}><button onClick={toggleCategory} className='text-left w-full p-4 hover:bg-gray-100 border'>Headphone</button></Link>
        </div>

        {/* Profile  */}
        <div className={` hidden ${displayProfile ? '-translate-y-0' : '-translate-y-full'} rounded bg-white sm:flex flex-col transition-all duration-300 text-black border border-gray-500 absolute top-0 right-0 h-auto overflow-y-scroll w-3/4 lg:w-1/4 sm:w-1/2 `}>
        <div className="flex bg-gray-100 items-center justify-between p-4">
            <p className="text-black text-xl">Profile</p>
            <button><GrClose size={24} onClick={toggleProfile} /></button>
          </div>
          <hr />
          <Link href={'/orders'}><button className='text-left w-full p-4 hover:bg-gray-100 border'>My orders</button></Link>
          <Link href={'/fashion'}><button className='text-left w-full p-4 hover:bg-gray-100 border'>My transactions</button></Link>
          <Link href={'/fashion'}><button className='text-left w-full p-4 hover:bg-gray-100 border'>My cart</button></Link>
          <Link href={'/fashion'}><button className='text-left w-full p-4 hover:bg-gray-100 border'>Wishlist</button></Link>
          <Link href={'/fashion'}><button className='text-left w-full p-4 hover:bg-gray-100 border'>Settings</button></Link>
          <Link href={'/fashion'}><button className='text-left w-full p-4 hover:bg-gray-100 border'>Log out</button></Link>
        </div>


        {/* cart  */}
        <div className={`${displayCart ? 'translate-x-0' : 'translate-x-full'} bg-white flex flex-col transition-all duration-300 text-black border border-gray-500 absolute top-0 right-0 h-screen overflow-y-scroll w-3/4 lg:w-1/4 sm:w-1/2 `}>
          <div className="flex items-center justify-between p-4">
            <p className="text-black text-xl">Your cart items</p>
            <button><GrClose size={24} onClick={toggleCart} /></button>
          </div>
          <hr />

          <div className="w-full border-b flex flex-col mb-4">
            <div className="flex justify-content p-2">
              <div className="flex flex-1">
                fsjdgkdsgsdg

              </div>
              <div className="flex items-center">
                <button><AiOutlineMinus /></button>
                <span className="px-1 border rounded">1</span>
                <button><AiOutlinePlus /></button>
              </div>
            </div>
            <div className="flex justify-content">
              <button type='button' className='w-1/2 p-4 hover:bg-gray-100 border'>Order seperatly</button>
              <button type='button' className='w-1/2 p-4 hover:bg-gray-100 border'>Remove</button>
            </div>
          </div>
          <div className="w-full border-b flex flex-col mb-4">
            <div className="flex justify-content p-2">
              <div className="flex flex-1">
                fsjdgkdsgsdg

              </div>
              <div className="flex items-center">
                <button><AiOutlineMinus /></button>
                <span className="px-1 border rounded">1</span>
                <button><AiOutlinePlus /></button>
              </div>
            </div>
            <div className="flex justify-content">
              <button type='button' className='w-1/2 p-4 hover:bg-gray-100 border'>Order seperatly</button>
              <button type='button' className='w-1/2 p-4 hover:bg-gray-100 border'>Remove</button>
            </div>
          </div>
          <div className="w-full border-b flex flex-col mb-4">
            <div className="flex justify-content p-2">
              <div className="flex flex-1">
                fsjdgkdsgsdg

              </div>
              <div className="flex items-center">
                <button><AiOutlineMinus /></button>
                <span className="px-1 border rounded">1</span>
                <button><AiOutlinePlus /></button>
              </div>
            </div>
            <div className="flex justify-content">
              <button type='button' className='w-1/2 p-4 hover:bg-gray-100 border'>Order seperatly</button>
              <button type='button' className='w-1/2 p-4 hover:bg-gray-100 border'>Remove</button>
            </div>
          </div>

          <Link href={'/checkout'}><button onClick={toggleCart} className='w-11/12 flex justify-center mx-auto my-2 px-4 py-2 bg-gray-800 text-white rounded-xl text-base sm:text-lg border border-gray-400 hover:bg-gray-700'><BsFillBagCheckFill className='mr-2' size={24} /> Checkout with the cart</button></Link>
          <button className='w-11/12 flex justify-center mx-auto my-2 px-4 py-2  text-black text-base sm:text-lg hover:underline'>Clean the cart</button>
        </div>

      </nav>

        <Modal onRequestClose={()=>{router.push('')}} ariaHideApp={false} isOpen={router.query.modal=='login'} style={customStyles}>
            <Login />
          </Modal>
        <Modal onRequestClose={()=>{router.push('')}} ariaHideApp={false} isOpen={router.query.modal=='signup'} style={customStyles}>
            <Signup />
          </Modal>

    </>
  )
}

export default Navbar