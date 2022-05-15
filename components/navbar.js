import Link from 'next/link'
import React, { useState, useContext, useEffect } from 'react'
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
import { Context } from '../context/context'

const customStyles = {
  content: {
    zIndex: 50,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '90%',
    maxWidth: '300px',
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
  const { isLoggedin, userLogout, clearCart, deleteFromCart, plusToCart, displayMenu, minusToCart, setDisplayProfile, setDisplayCategory, toggleMenu, displayCart, toggleCart, displayCategory, displayProfile, cartItems, cartValue, isSearch, setIsSearch, allProducts, displaySmCategory, displaySmProfile, setDisplaySmCategory, setDisplaySmProfile } = useContext(Context)

  const router = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState([])

  const onChange = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (searchValue.length != 0) {
      let res = []
      for (let item of allProducts) {
        if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
          res.push(item)
          continue
        }
        else {
          continue
        }
      }
      setResults(res)
      res = []
    }
    else{
      setResults([])
    }
  }, [searchValue])


  return (
    <>
      <div onClick={() => {
        setIsSearch(false)
        setResults([])
        setSearchValue('')
      }} className={`w-full h-screen fixed top-0 left-0 bg-gray-800 z-10 ${isSearch ? 'opacity-60' : 'opacity-0 hidden'} transition-all duration-300 ease-in-out`}></div>
      <nav className="fixed top-0 left-0 border-none z-10">

        {/* navbar  */}
        <div className="flex py-2 justify-between items-center w-screen px-2 sm:px-6 bg-yellow-400 text-white">
          <div className='px-2 flex items-center'>
            <div className='hidden sm:block'>
              <Link href={'/'}><a><Image src={'/logo-md.png'} alt={'Evergoods'} width={100} height={28} /></a></Link>
            </div>
            <div className='sm:hidden block'>
              <Link href={'/'}><a><img src={'/favicon.png'} alt={'Evergoods'} /></a></Link>
            </div>
          </div>

          <div className="flex-1 z-20">
            <div onClick={() => { setIsSearch(true) }} className='px-1 sm:px-2 flex justify-center drop-shadow mx-auto'>
              <input defaultValue={''} onChange={onChange} type="text" placeholder='Search' className={`w-10/12 max-w-4xl text-black border-gray-400 sm:w-full outline-none p-2 rounded-l-2xl text-lg `} />
              <button type='button' className='bg-white border-gray-400 rounded-r-2xl flex justify-center items-center sm:p-2 hover:bg-gray-100'><BiSearch color='black' size={28} /></button>
            </div>
          </div>

          <div className="flex justify-evenly items-center">

            <div onMouseLeave={() => { setDisplayCategory(false) }} onMouseOver={() => { setDisplayCategory(true) }}>
              <a className='cursor-pointer px-2 hidden sm:flex items-center text-black py-1 text-lg hover:underline hover:text-gray-700'><span className=" hidden sm:block">Categories </span><MdExpandMore size={24} /></a>
              {/* category  */}
              {displayCategory && <div onMouseLeave={() => { setDisplayCategory(false) }} onMouseOver={() => { setDisplayCategory(true) }} className={`rounded-2xl border bg-white flex items-center flex-col text-black absolute top-12 right-38`}>
                <Link href={'/laptop'}><button className='text-center w-full p-2 rounded-full hover:bg-gray-50'>Laptop</button></Link>
                <Link href={'/bagpack'}><button className='text-center w-full p-2 rounded-full hover:bg-gray-50'>Bagpack</button></Link>
                <Link href={'/watch'}><button className='text-center w-full p-2 rounded-full hover:bg-gray-50'>Watch</button></Link>
                <Link href={'/headphone'}><button className='text-center w-full p-2 rounded-full hover:bg-gray-50'>Headphone</button></Link>
              </div>}
            </div>

            {
              !(isLoggedin) ?
                <>
                  <a><button onClick={() => { router.push(`/?modal=login`) }} type='button' className='px-4 py-2 bg-gray-800 text-white rounded-xl text-lg hover:bg-gray-700'>Login</button></a>
                  <a onClick={() => { router.push(`/?modal=signup`) }} className='px-2 sm:block hidden cursor-pointer text-black py-2 bg-transparent text-lg hover:underline ml-2'>Signup</a>
                </>
                :
                <>
                  <div onMouseOver={() => { setDisplayProfile(true) }} onMouseLeave={() => { setDisplayProfile(false) }}>
                    <a className='cursor-pointer px-2 hidden sm:flex items-center text-gray-800 py-1 text-lg hover:text-gray-700'><span className=" hidden sm:block"><FaUserCircle className='bg-white rounded-full' size={36} /> </span></a>
                    {/* Profile  */}
                    {displayProfile && <div onMouseLeave={() => { setDisplayProfile(false) }} onMouseOver={() => { setDisplayProfile(true) }} className={`rounded-2xl border bg-white flex items-center flex-col text-black absolute top-12 right-12 w-24`}>
                      <Link href={'/orders'}><button className='text-center rounded-xl mx-auto w-full p-2 hover:bg-gray-50'>Orders</button></Link>
                      <Link href={'/wishlist'}><button className='text-center rounded-xl mx-auto w-full p-2 hover:bg-gray-50'>Wishlist</button></Link>
                      <Link href={'/'}>
                        <button onClick={() => {
                          userLogout()
                        }} className='text-center mx-auto w-full p-2 rounded-xl hover:bg-gray-50'>Log out</button>
                      </Link>
                    </div>}

                  </div>

                  <button type='button' onClick={toggleCart} className='flex items-center p-2 bg-gray-800 rounded-full text-lg 
           hover:bg-gray-700 ml-2'><BsCart4 size={20} /></button>

                </>
            }
            <button type='button' onClick={toggleMenu} className='flex sm:hidden items-center p-2 text-gray-800 rounded-full text-lg 
      hover:text-gray-700 ml-2'>{displayMenu ? <GrClose size={24} /> : <GiHamburgerMenu size={24} />}</button>
          </div>
        </div>

        {/* result box */}
        {isSearch && <div className={`flex flex-col max-w-7xl w-full mx-auto h-auto max-h-96 bg-white overflow-y-scroll rounded-b-2xl`}>
          <p className="w-full py-4 px-10 font-semibold text-center">{results.length} results</p>
          {results.map((item) => {
            return <div onClick={() => {
              router.push(`/product/${item.slug}`)
              setIsSearch(false)
            }} key={item.slug} className="w-full py-2 mx-auto hover:bg-slate-100 px-4 border-b-2 flex flex-col cursor-pointer">
              <p className="font-bold text-lg">{`${item.title} (${item.color}${item.size ? ` / ${item.size}` : ''}${item.storage ? ` / ${item.storage}` : ''})`}</p>
              <p className="text-sm in laptop text-blue-500">in {item.category}s</p>
            </div>
          })
          }
        </div>}

        {/* sidebar for small devices */}
        <div className={`bg-yellow-400 sm:hidden flex flex-col transition-all duration-300 ${displayMenu ? '-translate-x-0' : '-translate-x-full'}`}>
          <button type='button' onClick={() => { setDisplaySmCategory(!displaySmCategory) }} className='px-2 flex items-center text-black py-2 text-lg hover:underline hover:text-gray-700'><span className="block">Categories </span><MdExpandMore size={24} /></button>
          {displaySmCategory && <div onClick={() => {
            setDisplaySmCategory(false)
            toggleMenu()
          }} className='w-full pl-8 pr-2 py-2'>
            <Link href={'/laptop'}><p className='hover:underline cursoe-pointer w-full p-2'>Laptop</p></Link>
            <Link href={'/bagpack'}><p className='hover:underline cursoe-pointer w-full p-2'>Bagpack</p></Link>
            <Link href={'/watch'}><p className='hover:underline cursoe-pointer w-full p-2'>Watch</p></Link>
            <Link href={'/headphone'}><p className='hover:underline cursoe-pointer w-full p-2'>Headphone</p></Link>
          </div>}
          <button type='button' onClick={() => { setDisplaySmProfile(!displaySmProfile) }} className='px-2 flex items-center text-black py-2 text-lg hover:underline hover:text-gray-700'><span className="block">Profile </span><MdExpandMore size={24} /></button>
          {displaySmProfile && <div onClick={() => {
            setDisplaySmProfile(false)
            toggleMenu()
          }} className='w-full pl-8 pr-2 py-2'>
            {isLoggedin?
            <>
              <Link href={'/orders'}><p className='hover:underline cursoe-pointer w-full p-2'>Orders</p></Link>
              <Link href={'/wishlist'}><p className='hover:underline cursoe-pointer w-full p-2'>Wishlist</p></Link>
              <p onClick={() => {
                userLogout()
              }} className='hover:underline cursoe-pointer w-full p-2'>Log out</p>
            </>
            :
            <>
              <p onClick={() => { router.push(`/?modal=login`) }}  className='hover:underline cursoe-pointer w-full p-2'>Log In</p>
              <p onClick={() => { router.push(`/?modal=signup`) }}  className='hover:underline cursoe-pointer w-full p-2'>Sign Up</p>
            </>
            }
          </div>}
        </div>

        {/* cart  */}
        <div className={`${displayCart ? 'translate-x-0' : 'translate-x-full'} flex z-20 flex-col transition-all duration-300 text-black border absolute top-0 right-0 h-screen overflow-y-scroll w-11/12 lg:w-1/4 sm:w-1/2 shadow-xl shadow-yellow-100 bg-white`}>
          <div className="flex items-center justify-between p-4">
            <p className="text-black text-xl">Your cart items</p>
            <button><GrClose size={24} onClick={toggleCart} /></button>
          </div>
          <hr />
          {cartItems.length > 0 ?
            <>
              {cartItems.map((item) => {
                return <div key={item.productDetails._id} className="w-full border-b flex flex-col mb-4">
                  <div className="flex justify-content p-2">
                    <div className="flex flex-1">
                      <img alt={"ecommerce"} className=" w-28 p-2 h-full block" src={item.productDetails.img} />
                      <div className="flex-col flex-1">
                        <Link href={`/product/${item.productDetails.slug}`}><p className='cursor-pointer font-bold'>{item.productDetails.title.slice(0, 30)}</p></Link>
                        <div className="flex items-center mt-4 w-full">
                          <p className="text-sm">{item.productDetails.color? item.productDetails.color:''}{item.productDetails.storage ? ', '+item.productDetails.storage : ''}</p>
                        </div>
                        <div className="mt-4 w-full">
                          <p className="text-sm">₹ {item.productDetails.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => { minusToCart({ productId: item.productDetails._id }) }}><AiOutlineMinus /></button>
                      <span className="px-1 border rounded">{item.quantity}</span>
                      <button onClick={() => { plusToCart({ productId: item.productDetails._id }) }}><AiOutlinePlus /></button>
                    </div>
                  </div>
                  <div className="flex justify-content">
                    <button onClick={() => { deleteFromCart({ productId: item.productDetails._id }) }} type='button' className='w-full p-4 hover:bg-gray-100 border'>Remove</button>
                  </div>
                </div>
              })
              }
              <p className="my-2 text-center font-semibold">Cart value: ₹ {cartValue}</p>
              <Link href={'/checkout'}><button onClick={toggleCart} className='w-11/12 flex justify-center mx-auto my-2 px-4 py-2 bg-gray-800 text-white rounded-xl text-base sm:text-lg border border-gray-400 hover:bg-gray-700'><BsFillBagCheckFill className='mr-2' size={24} /> Checkout with the cart</button></Link>
              <button onClick={() => { clearCart() }} className='w-11/12 flex justify-center mx-auto my-2 px-4 py-2  text-black text-base sm:text-lg hover:underline'>Clean the cart</button>
            </>
            :
            <>
              <p className="items-center my-5 mx-auto text-xl">No, item in the cart</p>
              <button onClick={toggleCart} className='w-11/12 flex justify-center mx-auto my-2 px-4 py-2 bg-gray-800 text-white rounded-xl text-base sm:text-lg border border-gray-400 hover:bg-gray-700'>Continue shopping</button>
            </>

          }
        </div>

      </nav>

      <Modal onRequestClose={() => { router.push('') }} ariaHideApp={false} isOpen={router.query.modal == 'login'} style={customStyles}>
        <Login />
      </Modal>
      <Modal onRequestClose={() => { router.push('') }} ariaHideApp={false} isOpen={router.query.modal == 'signup'} style={customStyles}>
        <Signup />
      </Modal>

    </>
  )
}

export default Navbar