import React, {useState,useContext} from 'react'
import { GrClose } from 'react-icons/gr'
import {useRouter} from 'next/router'
import { Context } from '../context/context'

const Signup = () => {
  const {userSignup} = useContext(Context)
  const router = useRouter()
  const [credentials, setCredentials] = useState({name:'',email:'',password:''})
  const [cpassword, setCpassword] = useState()

   const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name] : e.target.value})
   }
   const onSubmit = (e)=>{
     e.preventDefault()
     credentials.password===cpassword ? userSignup(credentials) : ""
   }

  return (
    <section class="text-gray-600 body-font">
      <form onSubmit={onSubmit} action="#">
      <div class="w-full h-full bg-white rounded-xl p-2 sm:p-4 flex flex-col">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 class="text-gray-900 text-lg font-medium title-font">Sign Up</h2>
          <button onClick={()=>{router.push('')}} className='cursor-pointer'><GrClose /></button>
        </div>
        <div class="relative mb-4">
          <label for="name" class="leading-7 text-sm text-gray-600">Full Name</label>
          <input required onChange={onChange} type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input minLength={6} onChange={onChange} type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
          <input minLength={6} onChange={onChange} type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div class="relative mb-4">
          <label for="cpassword" class="leading-7 text-sm text-gray-600">Confirm Password</label>
          <input minLength={6} onChange={(e)=>{setCpassword(e.target.value)}} type="password" id="cpassword" name="cpassword" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button type='submit' class="text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded-xl text-lg">Sign Up</button>
        <p class="text-base text-gray-500 mt-3">Already have an account? <a onClick={()=>{router.push(`/?modal=login`)}} className='text-yellow-500 cursor-pointer hover:underline'>Log in</a></p>
      </div>
      </form>
    </section>
  )
}

export default Signup