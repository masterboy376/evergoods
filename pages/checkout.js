import React from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'



const Checkout = () => {
  return (
    <>
      <div className="w-11/12 mx-auto sm:w-3/4 h-auto my-2 px-4 shadow-md max-w-5xl rounded">
        <p className="w-full text-center text-3xl font-bold my-4">Place Order</p>
        <div className="w-full flex flex-col h-full">
        <p className="w-full text-left text-2xl mb-4">1. Delivert Details</p>

          <div className="flex w-full flex-col sm:flex-row justify-between">
            <div class="mb-4 w-full sm:mx-2">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input placeholder='eg: Sam Muller' type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div class="mb-4 w-full sm:mx-2">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input placeholder='eg: abc@xzy.mnp' type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

          <div class="mb-4 w-full">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address Line</label>
            <textarea placeholder='eg: Hno.:123, Ram Nagar, Agra, Uttarpradesh, India' name="address" id="address" cols="10" rows="4" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
          </div>

          <div className="w-full flex flex-col h-full">
            <div className="flex w-full flex-col sm:flex-row justify-between">
              <div class="mb-4 w-full sm:mx-2">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                <input placeholder='eg: +91-3252300403' type="number" id="phone" name="phone" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <div class="mb-4 w-full sm:mx-2">
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                <input placeholder='eg: 123456' type="number" id="pincode" name="pincode" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

        <p className="w-full text-left text-2xl mb-4">2. Your Cart Items</p>

        <div className="flex flex-col w-full mb-4 px-2">
        <div className="flex justify-content border-b p-2">
              <div className="flex flex-1">
                fsjdgkdsgsdg
              </div>
              <div className="flex items-center">
                <button><AiOutlineMinus /></button>
                <span className="px-1 border rounded">1</span>
                <button><AiOutlinePlus /></button>
              </div>
            </div>
        <div className="flex justify-content border-b p-2">
              <div className="flex flex-1">
                fsjdgkdsgsdg
              </div>
              <div className="flex items-center">
                <button><AiOutlineMinus /></button>
                <span className="px-1 border rounded">1</span>
                <button><AiOutlinePlus /></button>
              </div>
            </div>
        <div className="flex justify-content border-b p-2">
              <div className="flex flex-1">
                fsjdgkdsgsdg
              </div>
              <div className="flex items-center">
                <button><AiOutlineMinus /></button>
                <span className="px-1 border rounded">1</span>
                <button><AiOutlinePlus /></button>
              </div>
            </div>
        </div>

        <p className="w-full text-left text-2xl mb-4">3. Sub Total</p>
        <div className="flex flex-col w-full mb-4 px-2">
          <div className="flex justify-between mb-2 items-center">
            <span className="text-base font-semibold">Total value</span>
            <span className="text-base">$ 450.00</span>
          </div>
          <div className="flex justify-between mb-2 items-center">
            <span className="text-base font-semibold">GST</span>
            <span className="text-base">$ 0.00</span>
          </div>
          <div className="flex justify-between mb-2 items-center">
            <span className="text-base font-semibold">Delivery charges</span>
            <span className="text-base">$ 10.00</span>
          </div>
          <hr className='text-black' />
          <div className="flex justify-between mb-2 items-center">
            <span className="text-base font-semibold">Total payable amount</span>
            <span className="text-base">$ 460.00</span>
          </div>
        </div>

        <div className="flex flex-col w-full mb-4 px-2">
        <Link href={'/checkout'}><button className='w-11/12 flex justify-center mx-auto my-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-base sm:text-lg border border-gray-400 hover:bg-gray-800'><BsFillBagCheckFill className='mr-2' size={24} /> Cash in</button></Link>
        </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout