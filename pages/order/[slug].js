import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {RiDeleteBin6Line} from 'react-icons/ri'

const Slug = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-10 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">EVERGOODS</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Evergood T-shirt</h1>
        <p className='mb-4'>Order ID: {slug}</p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Sub total</span>
          <span className="ml-auto text-gray-900">$56.00</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Quantity</span>
          <span className="ml-auto text-gray-900">1</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Date of order</span>
          <span className="ml-auto text-gray-900">4 Feb 2022</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Delivey date</span>
          <span className="ml-auto text-gray-900">7 Feb 2022</span>
        </div>
        <div className="flex justify-between border-t pt-4">
          <span className="font-bold text-lg text-green-600 border-2 border-green-600 rounded-full p-2">Ordered</span>
          <button className="rounded-full w-10 h-10 bg-red-400 hover:bg-red-500 p-0 border-0 inline-flex items-center justify-center text-black ml-4">
          <RiDeleteBin6Line size={24} className=''/>
          </button>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
    </div>
  </div>
</section>
  )
}

export default Slug