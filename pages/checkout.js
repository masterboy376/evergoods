import React, { useContext, useState } from 'react'
import { Context } from '../context/context'
import Link from 'next/link'
import Head from 'next/head'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import {useRouter} from 'next/router'



const Checkout = () => {
  const { cartItems, cartValue, plusToCart, minusToCart, placeOrder, alertFailure } = useContext(Context)
  const router = useRouter()
  const [credentials, setCredentials] = useState({name:'',address:'',email:'', phone:'', pincode:''})

   const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name] : e.target.value})
   }

   const onSubmit= (e)=>{
     alert('This application is not currently in production so we do not charge anything to place order.')
    e.preventDefault()
    for(let i in cartItems){
      if(cartItems[i].productDetails.availableQty > 0){
        placeOrder({productId:cartItems[i].productDetails._id,quantity:cartItems[i].quantity, address:credentials.address, name:credentials.name, email:credentials.email, phone:credentials.phone, pincode:credentials.pincode})
      }
      else{
        alertFailure(`${cartItems[i].productDetails._id} is out of Stock hence this one will not be ordered.`)
      }
    }
    setCredentials({name:'',address:'',email:'', phone:'', pincode:''})
    router.push('/orders')
   }
  return (
    <>
    <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className='py-6'>
      <div className="w-11/12 bg-white mx-auto sm:w-3/4 h-auto p-4 px-4 max-w-5xl rounded border-2">
        <form action="#" onSubmit={onSubmit}>
        <p className="sm:text-7xl text-5xl text-gray-500 pb-10 font-thin">Checkout</p>
        <div className="w-full flex flex-col h-full">
          <p className="w-full text-left text-2xl mb-4">1. Delivery Details</p>

          <div className="flex w-full flex-col sm:flex-row justify-between">
            <div className="mb-4 w-full sm:mx-2">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={onChange} placeholder='eg: Sam Muller' type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
            </div>
            <div className="mb-4 w-full sm:mx-2">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input onChange={onChange} placeholder='eg: abc@xzy.mnp' type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
            </div>
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address Line</label>
            <textarea onChange={onChange} placeholder='eg: Hno.:123, Ram Nagar, Agra, Uttarpradesh, India' name="address" id="address" cols="10" rows="4" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"required></textarea>
          </div>

          <div className="w-full flex flex-col h-full">
            <div className="flex w-full flex-col sm:flex-row justify-between">
              <div className="mb-4 w-full sm:mx-2">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                <input onChange={onChange} placeholder='eg: +91-3252300403' type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
              </div>
              <div className="mb-4 w-full sm:mx-2">
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                <input onChange={onChange} placeholder='eg: 123456' type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
              </div>
            </div>

            <p className="w-full text-left text-2xl mb-4">2. Your Cart Items</p>

            <div className="flex flex-col w-full mb-4 px-2">

              {!cartItems.length>0?
              <p className="text-lg text-center">No item in the cart to order</p>
              :
              cartItems.map((item,index) => {
                if(item.productDetails.availableQty > 0){
                return <div key={index} className="flex justify-content border-b p-2">
                  <div className="flex flex-1">
                    {item.productDetails.title}
                  </div>
                  <div className="flex items-center">
                    <button type='button' onClick={() => { minusToCart({ productId: item.productDetails._id }) }}><AiOutlineMinus /></button>
                    <span className="px-1 border rounded">{item.quantity}</span>
                    <button type='button' onClick={() => { plusToCart({ productId: item.productDetails._id }) }}><AiOutlinePlus /></button>
                  </div>
                </div>
                }
                else{
                  return
                }
              })}
            </div>

            <p className="w-full text-left text-2xl mb-4">3. Sub Total</p>
            <div className="flex flex-col w-full mb-4 px-2">
              <div className="flex justify-between mb-2 items-center">
                <span className="text-base font-semibold">Total value</span>
                <span className="text-base font-semibold text-blue-500">₹ {cartValue}</span>
              </div>
              <div className="flex justify-between mb-2 items-center">
                <span className="text-base font-semibold">GST</span>
                <span className="text-base font-semibold text-blue-500">₹ {0.00}</span>
              </div>
              <div className="flex justify-between mb-2 items-center">
                <span className="text-base font-semibold">Delivery charges</span>
                <span className="text-base font-semibold text-blue-500">₹ {0.00}</span>
              </div>
              <hr className='text-black' />
              <div className="flex justify-between mb-2 items-center">
                <span className="text-base font-semibold">Total payable amount</span>
                <span className="text-base font-semibold text-blue-500">₹ {cartValue}</span>
              </div>
            </div>

            <div className="flex flex-col w-full mb-4 px-2">
              <button type='submit' className='w-full flex justify-center mx-auto my-2 px-4 py-2 bg-gray-900 text-white rounded text-base sm:text-lg border border-gray-400 hover:bg-gray-800'><BsFillBagCheckFill className='mr-2' size={24} /> Cash in</button>
            </div>

          </div>
        </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default Checkout