import React, { useContext } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Context } from '../context/context'



const Wishlist = () => {
  const { deleteFromWishlist,wishlist, initiateWishlist } = useContext(Context)

  return (
    <>
      <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="text-gray-600 body-font overflow-hidden">
      <p className="w-full text-center text-black text-3xl font-bold my-4">Wishlists</p>
        <div className="container px-5 py-10 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {
              wishlist==null || wishlist==undefined || wishlist.length==0  ?
              <p className="text-xl mt-10 mx-auto text-center">No item in wishlist so far! 🤷‍♂️</p>
              :
              wishlist.map((item,index) => {
                return <div key={item.productDetails._id} className="py-8 my-2 px-8 flex flex-wrap md:flex-nowrap hover:shadow-2xl transition-all duration-300 ease-in-out bg-white rounded-2xl cursor-pointer hover:shadow-yellow-300">
                    <div className="md:flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start items-center w-full h-full">
                        <img alt="ecommerce" className="p-4 w-64 h-full object-cover object-center rounded" src={item.productDetails.img} />
                        <div className="flex flex-col flex-1 h-full">
                        <Link href={`/product/${item.productDetails.slug}`} ><h2 className="text-2xl font-medium text-gray-900 title-font mb-4">{item.productDetails.title}</h2></Link>
                          <p className="leading-relaxed">{item.productDetails.description}</p>
                          <span className="title-font font-medium text-2xl text-gray-900">₹ {item.productDetails.price}</span>
                          <div className="w-full h-full flex items-end justify-end">
                          <button onClick={() => {
                            deleteFromWishlist({ productId: item.productDetails._id })
                            initiateWishlist()
                          }} className='self-end flex justify-center my-2 px-4 py-2 bg-gray-800 text-white rounded-xl text-base sm:text-lg border border-gray-400 hover:bg-gray-700'>Remove from Wishlist</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              })
            }

          </div>
        </div>
      </section>
    </>
  )
}

export default Wishlist