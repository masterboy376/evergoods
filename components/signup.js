import React from 'react'
import { GrClose } from 'react-icons/gr'
import {useRouter} from 'next/router'

const Signup = () => {
  const router = useRouter()

  return (
    <section class="text-gray-600 body-font">
      <div class="w-full h-full bg-white rounded-xl p-2 sm:p-4 flex flex-col">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 class="text-gray-900 text-lg font-medium title-font">Sign Up</h2>
          <button onClick={()=>{router.push('')}} className='cursor-pointer'><GrClose /></button>
        </div>
        <div class="relative mb-4">
          <label for="name" class="leading-7 text-sm text-gray-600">Full Name</label>
          <input type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
          <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div class="relative mb-4">
          <label for="cpassword" class="leading-7 text-sm text-gray-600">Confirm Password</label>
          <input type="password" id="cpassword" name="cpassword" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button onClick={()=>{router.push('')}} class="text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded-xl text-lg">Log In</button>
        <p class="text-base text-gray-500 mt-3">Already have an account? <a onClick={()=>{router.push(`/?modal=login`)}} className='text-yellow-500 cursor-pointer hover:underline'>Log in</a></p>
      </div>
    </section>
  )
}

export default Signup