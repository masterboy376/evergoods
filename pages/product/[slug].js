import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MdVerified, MdError } from 'react-icons/md'
import connectDb from '../../middleware/connect'
import Product from '../../models/Product'
import Link from 'next/link'
import Head from 'next/head'
import { Context } from '../../context/context'

const Slug = ({ product, variants }) => {
  const { addToCart, cartItems, toggleCart, addToWishlist, deleteFromWishlist, wishlist } = useContext(Context)
  const router = useRouter()
  const { slug } = router.query

  const [cartProductId, setCartProductId] = useState([])
  const [wishlistId, setWishlistId] = useState([])

  const [pin, setPin] = useState()
  const [service, setService] = useState()

  const checkService = async () => {
    let rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinCode`)
    let parsedData = await rawData.json()
    let pinsArray = parsedData.pins
    pinsArray.includes(pin) ? setService(true) : setService(false)
  }

  const onChange = (e) => {
    setPin(parseInt(e.target.value))
  }

  useEffect(() => {
    let idArray = []
    for (let i = 0; i < cartItems.length; i++) {
      idArray.push(cartItems[i].productDetails._id)
    }
    setCartProductId(idArray)
    idArray=[]
    for (let i = 0; i < wishlist.length; i++) {
      idArray.push(wishlist[i].productDetails._id)
    }
    setWishlistId(idArray)
  }, [, cartItems, wishlist])


  return (
    <div>


      <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="flex items-start justify-center sm:w-1/2 py-10 w-full rounded">
            <img alt="ecommerce" className=" h-auto max-h-64 sm:max-h-96 w-auto rounded" src={product.img} />
          </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{`${product.title} (${product.color}${product.size ? ` / ${product.size}` : ''}${product.storage ? ` / ${product.storage}` : ''})`}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <Link href={'https://facebook.com'}>
                  <a target='_blank' className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                    </Link>
                    <Link href={'https://twitter.com'}>
                  <a target='_blank' className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                    </Link>
                  <Link href={'https://instagram.com'}>
                  <a target='_blank' className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                  </Link>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex sm:flex-row flex-col mt-6 am:items-center items-start pb-5 border-b-2 border-gray-100 mb-5">

{/* colors  */}
                <div className={`flex ${product.color ? '' : 'hidden'} sm:ml-0 ml-2 sm:mb-0 mb-4 items-center`}>
                  <span className="mr-3">Colors</span>
                  <div className="relative">
                    <select onChange={(e) => {
                      router.push(`/product/${variants[e.target.value][Object.keys(variants[e.target.value])[0]]['slug']}`)
                    }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:blue-yellow-200 focus:blue-yellow-500 text-base pl-3 pr-10">
                      <option value={product.color}>{product.color}</option>
                      {
                        Object.keys(variants).map((item) => {
                          if (item != product.color) {
                            return <option key={variants[item][Object.keys(variants[item])[0]]['slug']} value={item}>{item}</option>
                          }
                          else {
                            return
                          }
                        })
                      }
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>

{/* varients */}
                <div className={`flex ${product.storage || product.size ? '' : 'hidden'} sm:ml-6 ml-2 sm:mb-0 mb-4 items-center`}>
                  <span className="mr-3">Variants</span>
                  <div className="relative">
                    <select onChange={(e) => {
                      router.push(`/product/${variants[product.color][e.target.value]['slug']}`)
                    }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                      <option value={product.storage}>{product.storage}</option>
                      {
                        Object.keys(variants[product.color]).map((item) => {
                          if (item != product.storage) {
                            return <option key={variants[product.color][item]['slug']} value={item}>{item}</option>
                          }
                          else {
                            return
                          }
                        })
                      }
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-blue-500">₹ {product.price}</span>

                {/* cart button  */}
                  <button onClick={() => { cartProductId.includes(product._id) ? toggleCart():addToCart({ fullProduct: product, productId: product._id, quantity: 1 }) }} className="flex ml-auto text-white bg-gray-900 border-0 p-2 focus:outline-none hover:bg-gray-800 rounded">{cartProductId.includes(product._id) ? 'Go to cart':'Add to cart'}</button>
                  
                {/* wishlist button  */}
                    <button onClick={() => {
                      wishlistId.includes(product._id) ? deleteFromWishlist({ productId: product._id }) : addToWishlist({ productId: product._id })
                    }} className={`rounded-full border-2 bg-gray-100 bg-opacity-60 ${wishlistId.includes(product._id) ?'text-blue-500':'hover:text-blue-300 text-blue-200'} w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4`}>
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
              </div>

              {/* servicability check  */}
              <div className="w-full flex items-center mt-5 bg-gray-100 rounded p-2">
                <label htmlFor="pin" className="leading-7 text-black mr-2">Pincode: </label>
                <input onChange={onChange} placeholder='eg: 122043' type="number" id="pin" name="pin" className="w-full bg-white rounded border flex-1 border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                <button onClick={checkService} className="flex ml-auto text-white bg-gray-900 border-0 p-2 focus:outline-none hover:bg-gray-800 rounded">Check service</button>
              </div>
              {
                (service !== null && service !== undefined) && <>
                  {
                    service ?
                      <p className='flex items-center text-sm text-green-500'><MdVerified /> yay! We deliver to this address.</p>
                      :
                      <p className='flex items-center text-sm text-red-400'><MdError /> Sorry! We do not deliver to this address.</p>
                  }
                </>
              }
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  connectDb()
  let product = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: product.title })
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.storage] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.storage] = { slug: item.slug }
    }
  }

  return {
    props: { variants: JSON.parse(JSON.stringify(colorSizeSlug)), product: JSON.parse(JSON.stringify(product)) }
  }
}


export default Slug