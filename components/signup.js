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
    <section className="text-gray-600 body-font">
      <form onSubmit={onSubmit} action="#">
      <div className="w-full h-full bg-white rounded-xl p-2 sm:p-4 flex flex-col">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 className="text-gray-900 text-lg font-medium title-font">Sign Up</h2>
          <button onClick={()=>{router.push('')}} className='cursor-pointer'><GrClose /></button>
        </div>
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Full Name</label>
          <input required onChange={onChange} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input minLength={6} onChange={onChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input minLength={6} onChange={onChange} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
          <input minLength={6} onChange={(e)=>{setCpassword(e.target.value)}} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button type='submit' className="text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Sign Up</button>
        <p className="text-base mt-3">Already have an account? <a onClick={()=>{router.push(`/?modal=login`)}} className='text-blue-500 cursor-pointer underline-offset-4 hover:underline'>Log in</a></p>
      </div>
      </form>
    </section>
  )
}

export default Signup