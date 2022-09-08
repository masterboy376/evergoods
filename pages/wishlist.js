import React, { useContext } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Context } from '../context/context'



const Wishlist = () => {
  const { deleteFromWishlist, wishlist, initiateWishlist } = useContext(Context)

  return (
    <>
      <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-6 mx-auto min-h-screen">
          <p className="sm:text-7xl text-5xl text-gray-500 pb-10 font-thin">Your wish list</p>
          <div className="-my-8 divide-y-2 divide-gray-100">
            {
              wishlist == null || wishlist == undefined || wishlist.length == 0 ?
                <p className="text-2xl text-center font-bold opacity-70">No item in wishlist so far!</p>
                :
                wishlist.map((item, index) => {
                  return <Link key={item.productDetails._id} href={`/product/${item.productDetails.slug}`} ><div className="my-2 p-6 flex flex-wrap md:flex-nowrap hover:shadow border-2 transition-all duration-300 ease-in-out bg-white rounded cursor-pointer">
                    <div className="md:flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start items-center w-full h-full">
                        <img alt="ecommerce" className="p-4 w-64 h-auto object-cover object-center rounded" src={item.productDetails.img} />
                        <div className="flex flex-col flex-1 h-full">
                          <h2 className="text-2xl font-medium text-gray-900 title-font mb-4">{item.productDetails.title}</h2>
                          <p className="leading-relaxed">{item.productDetails.description.slice(0, 200)}...</p>
                          {item.productDetails.availableQty > 0 ?
                            <span className="mt-1 text-blue-500 text-xl font-semibold">₹ {item.productDetails.price}</span> :
                            <div className='w-auto px-1 font-semibold border border-red-500 py-1 text-center text-red-500'>Out of Stock</div>
                          }
                          <div className="w-full h-full flex items-end justify-end">
                            <button onClick={(e) => {
                              e.stopPropagation()
                              deleteFromWishlist({ productId: item.productDetails._id })
                              initiateWishlist()
                            }} className='self-end flex justify-center my-2 px-4 py-2 bg-gray-900 text-white rounded text-base sm:text-lg border border-gray-400 hover:bg-gray-800'>Remove from Wishlist</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                })
            }

          </div>
        </div>
      </section>
    </>
  )
}

export default Wishlist