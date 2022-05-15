import React,{useContext, useState} from 'react'
import { GrClose } from 'react-icons/gr'
import { useRouter } from 'next/router'
import { Context } from '../context/context'

const Login = () => {
  const {userLogin} = useContext(Context)
  const router = useRouter()
  const [credentials, setCredentials] = useState({email:'',password:''})

   const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    const onSubmit = (e)=>{
     e.preventDefault()
     userLogin(credentials)
   }


  return (
    <section className="text-gray-600 body-font">
      <form action="#" onSubmit={onSubmit}>
      <div className="w-full h-full bg-white rounded-xl p-2 sm:p-4 flex flex-col">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 className="text-gray-900 text-lg font-medium title-font">Log in</h2>
          <button onClick={() => { router.push('') }} className='cursor-pointer'><GrClose /></button>
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input onChange={onChange} minLength={6} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input onChange={onChange} minLength={6} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          <div className="flex items-center justify-end">
            <div className="text-sm">
                <a className="font-medium text-yellow-500 cursor-pointer hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
        <button type='submit' onClick={()=>{}} className="text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded-xl text-lg">Log In</button>
        <p className="text-base text-gray-500 mt-3">Do not have an account? <a onClick={() => { router.push(`/?modal=signup`) }} className='text-yellow-500 cursor-pointer hover:underline'>Sign Up</a></p>
      </div>
      </form>
    </section>
  )
}

export default Login