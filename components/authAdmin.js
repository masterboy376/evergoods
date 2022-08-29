import React,{useContext, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { AdminContext } from '../context/adminContext'

const AuthAdmin = () => {
  const {authAdmin} = useContext(AdminContext)
  const [credentials, setCredentials] = useState({email:'',password:''})

   const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    const onSubmit = (e)=>{
     e.preventDefault()
     authAdmin(credentials)
   }


  return (
    <section className="text-gray-600 body-font">
      <form action="#" onSubmit={onSubmit}>
      <div className="w-full h-full bg-white rounded p-2 sm:p-4 flex flex-col">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 className="text-gray-900 text-lg font-medium title-font">Log in to Admin Console</h2>
          <button onClick={() => { router.push('') }} className='cursor-pointer'><GrClose /></button>
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input onChange={onChange} minLength={6} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input onChange={onChange} minLength={6} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button type='submit' onClick={()=>{}} className="text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Enter to Admin Console</button>
      </div>
      </form>
    </section>
  )
}

export default AuthAdmin