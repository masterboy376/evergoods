import React,{useContext, useState} from 'react'
import { GrClose } from 'react-icons/gr'
import { useRouter } from 'next/router'
import { Context } from '../context/context'
import emailjs from "@emailjs/browser"

const ForgetPassword = () => {
  const {resetPassword, alertFailure, alertSuccess} = useContext(Context)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [credentials, setCredentials] = useState({otp:'',password:''})

   const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const onSend = async () => {

    const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/generateOtp`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    const parsedData = await rawData.json()
    if (parsedData.success) {
      await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, {email: email, name: 'user', link: parsedData.otp}, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
        .then(function (response) {
            alertSuccess('Successfully sent the link. In case you did not get the Email, please try again.')
            return 
        }, function (error) {
            alertFailure('unable to send email!')
        });
    }
    else{
      alertFailure('invalid email!')
    }

  }


  return (
    <section className="text-gray-600 body-font">
      <form action="#" onSubmit={
        (e)=>{
          e.preventDefault()
          if(!sent){
            onSend()
            setSent(true)
          }
          else{
            console.log(credentials)
            resetPassword(credentials)
          }
        }
      }>
      <div className="w-full h-full bg-white rounded p-2 sm:p-4 flex flex-col">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 className="text-gray-900 text-lg font-medium title-font">{!sent?'Send OTP':'Reset Password'}</h2>
          <button onClick={() => { router.push('') }} className='cursor-pointer'><GrClose /></button>
        </div>

{
    !sent?
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input required onChange={(e)=>{setEmail(e.target.value)}} minLength={6} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
    :
    <>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input required onChange={onChange} minLength={6} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="otp" className="leading-7 text-sm text-gray-600">OTP</label>
          <input required onChange={onChange} minLength={6} type="text" id="otp" name="otp" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          <div className="flex items-center justify-end">
            <div className="text-sm">
                <a onClick={onSend} className="font-medium text-blue-500 cursor-pointer underline-offset-4 hover:underline">
                Resend OTP
              </a>
            </div>
          </div>
        </div>
    </>
}


        <button type='submit' className="text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">{!sent?'Send OTP':'Reset Password'}</button>

        <p className="text-base mt-3">Remember password? <a onClick={() => { router.push(`/?modal=login`) }} className='text-blue-500 underline-offset-4 cursor-pointer hover:underline'>Log In</a></p>
      </div>
      </form>
    </section>
  )
}

export default ForgetPassword