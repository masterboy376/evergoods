import React, { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Context } from '../context/context'

export default function Home() {
  const { allCategories } = useContext(Context)

  return (
    <div className='min-h-screen '>

      <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="my-4 rounded bg-blue-500 h-auto flex sm:flex-row flex-col items-center justify-between container sm:mx-auto mx-2">
        <div className="sm:w-1/2 w-full p-4 flex items-center flex-col justify-center">
          <p className="sm:text-4xl text-2xl text-white text-center font-thin mb-4">Get the best deal at the best platform</p>
          <p className="sm:text-base text-sm text-white text-center font-thin mb-4">Quick delivery | Great deals | Unbaised product ranking</p>
          <Link href={`/laptop`}>
            <a className="p-2 my-2 border-2 border-white text-white bg-transparent sm:text-lg text-base hover:bg-white hover:text-gray-900 rounded">Shop now</a>
          </Link>
        </div>
        <div className="sm:w-1/2 w-full h-full p-6 flex items-center justify-center">
          <img src="/cover.webp" alt="" className='' />
        </div>
      </div>

    <div className="container mx-auto">
      <p className="sm:text-5xl text-3xl text-gray-500 font-thin pb-6 pt-6 sm:px-0 px-2">Categories</p>
      <div className="mx-auto w-auto max-w-8xl sm:px-0 px-2 pb-4 flex overflow-x-auto scroll-hidden">

      {
        allCategories.map((item)=>{
          return <Link href={`/${item.title}`}>
          <div className='flex flex-col items-center'>
            <div style={{ 'minWidth': "100px", 'maxWidth': "300px" }} className="p-2 border-2 w-96 hover:shadow rounded bg-white transition-all duration-200 mx-2 flex flex-col items-center">
              <img className='h-full' src={item.img} alt="" />
            </div>
            <p className="sm:text-2xl text-xl text-center text-gray-500 font-thin py-2">{item.title.replace(item.title[0], item.title[0].toUpperCase())}s</p>
          </div>
        </Link>
        })
      }

      </div>
    </div>

    </div >
  )
}
