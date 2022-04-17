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
    <section class="text-gray-600 body-font">
      <form action="#" onSubmit={onSubmit}>
      <div class="w-full h-full bg-white rounded-xl p-2 sm:p-4 flex flex-col">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 class="text-gray-900 text-lg font-medium title-font">Log in</h2>
          <button onClick={() => { router.push('') }} className='cursor-pointer'><GrClose /></button>
        </div>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input onChange={onChange} minLength={6} type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
          <input onChange={onChange} minLength={6} type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          <div class="flex items-center justify-end">
            <div class="text-sm">
                <a class="font-medium text-yellow-500 cursor-pointer hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
        <button type='submit' onClick={()=>{}} class="text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded-xl text-lg">Log In</button>
        <p class="text-base text-gray-500 mt-3">Dont't have an account? <a onClick={() => { router.push(`/?modal=signup`) }} className='text-yellow-500 cursor-pointer hover:underline'>Sign Up</a></p>
      </div>
      </form>
    </section>
  )
}

export default Login