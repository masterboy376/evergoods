import React from 'react'
import { GrClose } from 'react-icons/gr'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()

  return (
    <section class="text-gray-600 body-font">
      <div class="w-full h-full bg-white rounded-xl p-2 sm:p-4 flex flex-col">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 class="text-gray-900 text-lg font-medium title-font">Log in</h2>
          <button onClick={() => { router.push('') }} className='cursor-pointer'><GrClose /></button>
        </div>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
          <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          <div class="flex items-center justify-between">
            <div class="flex mt-2 items-center">
              <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-yellow-500 focus:ring-yellow-400 border-gray-300 rounded" />
              <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div class="text-sm">
                <a class="font-medium text-yellow-500 cursor-pointer hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
        <button onClick={() => { router.push('') }} class="text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded-xl text-lg">Log In</button>
        <p class="text-base text-gray-500 mt-3">Dont't have an account? <a onClick={() => { router.push(`/?modal=signup`) }} className='text-yellow-500 cursor-pointer hover:underline'>Sign Up</a></p>
      </div>
    </section>

    // <div class="space-y-8 p-4 sm:p-10 bg-white rounded-xl z-10 mx-auto w-full">
    // <div class="text-center">
    // 	<h2 class="mt-6 text-3xl font-bold text-gray-900">
    // 		Welcom Back!
    // 	</h2>
    // 	<p class="mt-2 text-sm text-gray-600">Please sign in to your account</p>
    // </div>

    // <div class="flex items-center justify-center space-x-2">
    // 	<span class="h-px w-16 bg-gray-300"></span>
    // 	<span class="text-gray-500 font-normal">OR</span>
    // 	<span class="h-px w-16 bg-gray-300"></span>
    // </div>
    // <form class="mt-8 space-y-6" action="#" method="POST">
    // 	<input type="hidden" name="remember" value="true"/>
    // 	<div class="relative">
    // 		<div class="absolute right-0 mt-4"><svg xmlns="http://www.w3.org/2000/svg"
    // 				class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    // 					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    // 			</svg>
    //             </div>
    // 		<label class="text-sm font-bold text-gray-700 tracking-wide">Email</label>
    // 		<input class=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="" placeholder="mail@gmail.com" value="mail@gmail.com"/>
    //         </div>
    // 	<div class="mt-8 content-center">
    // 		<label class="text-sm font-bold text-gray-700 tracking-wide">
    // 			Password
    // 		</label>
    // 		<input class="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="" placeholder="Enter your password" value="*****|"/>
    //         </div>
    // 	<div class="flex items-center justify-between">
    // 			<div class="flex items-center">
    // 				<input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"/>
    // 				<label for="remember_me" class="ml-2 block text-sm text-gray-900">
    //                         Remember me
    //                     </label>
    // 			</div>
    // 		<div class="text-sm">
    // 			<a href="#" class="font-medium text-indigo-500 hover:text-indigo-500">
    // 						Forgot password?
    // 			</a>
    // 		</div>
    // 	</div>
    // 	<div>
    // 		<button type="submit" class="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
    //                             font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
    //                 Sign in
    //             </button>
    // 	</div>
    // 	<p class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
    // 		<span>Don't have an account?</span>
    // 		<a href="#" class="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign up</a>
    // 	</p>
    // </form>
    // </div>
  )
}

export default Login