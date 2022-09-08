import React, { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Context } from '../context/context'

export default function Home() {
  const { allCategories, allProducts } = useContext(Context)

  const [mostPopular, setMostPopular] = useState([])
  const [latestCollection, setLatestCollection] = useState([])

  useEffect(() => {
    if (allProducts.length > 0) {
      let a1 = []
      let a2 = []
      for (let i = 0; i < 8; i++) {
        let n1 = Math.ceil(Math.random() * 31)
        let n2 = Math.ceil(Math.random() * 31)
        a1.push(allProducts[n1])
        a2.push(allProducts[n2])
      }
      setMostPopular(a1)
      setLatestCollection(a2)
    }
  }, [allProducts])


  return (
    <div className='min-h-screen '>

      <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className='sm:px-0 px-2'>
        <div className="my-4 rounded bg-blue-500 h-auto flex sm:flex-row flex-col items-center justify-between container mx-auto">
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
      </div>

      <div className="container mx-auto">
        <p className="sm:text-5xl text-3xl text-gray-500 font-thin pb-6 pt-6 sm:px-0 px-2">Categories</p>
        <div className="mx-auto w-auto max-w-8xl sm:px-0 px-2 pb-4 flex overflow-x-auto scroll-hidden">

          {
            allCategories.map((item) => {
              return <Link key={item._id} href={`/${item.title}`}>
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

      <div className="container mx-auto">
        <p className="sm:text-5xl text-3xl text-gray-500 font-thin pb-8 pt-6 sm:px-0 px-2">Most Popular</p>
        <div className="mx-auto w-auto max-w-8xl sm:px-0 px-2 pb-4 flex overflow-x-auto scroll-hidden">

          {mostPopular[0] && mostPopular.map((item, index) => {
            return <Link key={index} href={`/product/${item.slug}`}>
              <div className='flex flex-col items-center'>
                <div style={{ 'minWidth': "100px", 'maxWidth': "250px" }} className="p-2 border-2 w-96 hover:shadow rounded bg-white transition-all duration-200 mx-2 flex flex-col items-center">
                  {/* image container  */}
                  <a className="block relative h-auto rounded overflow-hidden">
                    <img alt={"ecommerce"} className="p-5 sm:p-2 object-center w-auto mx-auto sm:h-44 h-36 block" src={item.img} />
                  </a>
                  {/* details container  */}
                  <div className="p-4 h-24">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{`${item.title.slice(0, 30)}...`}</h2>
                  </div>
                </div>
              </div>
            </Link>
          })
          }
        </div>
      </div>

      <div className="container mx-auto">
        <p className="sm:text-5xl text-3xl text-gray-500 font-thin pb-6 pt-6 sm:px-0 px-2">Latest Collection</p>
        <div className="mx-auto w-auto max-w-8xl sm:px-0 px-2 pb-4 flex overflow-x-auto scroll-hidden">

          {latestCollection[0] && latestCollection.map((item, index) => {
            return <Link key={index} href={`/product/${item.slug}`}>
            <div className='flex flex-col items-center'>
              <div style={{ 'minWidth': "100px", 'maxWidth': "250px" }} className="p-2 border-2 w-96 hover:shadow rounded bg-white transition-all duration-200 mx-2 flex flex-col items-center">
                {/* image container  */}
                <a className="block relative h-auto rounded overflow-hidden">
                  <img alt={"ecommerce"} className="p-5 sm:p-2 object-center w-auto mx-auto sm:h-44 h-36 block" src={item.img} />
                </a>
                {/* details container  */}
                <div className="p-4 h-24">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{`${item.title.slice(0, 30)}...`}</h2>
                </div>
              </div>
            </div>
          </Link>
          })
          }
        </div>
      </div>

    </div >
  )
}
