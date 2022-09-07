import React, { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import connectDb from '../middleware/connect'
import Product from '../models/Product'
import { Context } from '../context/context'

const Bagpack = (props) => {
    const [products, setProducts] = useState(props.products)
    const [wishlistId, setWishlistId] = useState([])
    const { addToWishlist, deleteFromWishlist, wishlist } = useContext(Context)
    useEffect(() => {
        let idArray = []
        for (let i = 0; i < wishlist.length; i++) {
            idArray.push(wishlist[i].productDetails._id)
        }
        setWishlistId(idArray)
    }, [, wishlist])

    return (
        <>
            <div className='min-h-screen '>

                <Head>
                    <title>evergoods</title>
                    <meta name="description" content="get your goods ever where" />
                    <link rel="icon" href="/favicon.png" />
                </Head>

                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-6 mx-auto">
                    <p className="sm:text-7xl text-5xl text-gray-500 pb-10 font-thin">Bagpacks</p>
                        <div className="flex flex-wrap -m-4">
                            {
                            products.map((product) => {
                                return <div key={product.slug} className="lg:w-1/4 md:w-1/2 w-full p-4">
                                    <Link href={`/product/${product.slug}`}>
                                        <div className="bg-white flex flex-col transition-all duration-300 ease-in-out justify-between border-2 rounded cursor-pointer w-full hover:shadow h-full">
                                            {/* wishlist button  */}
                                            <button onClick={(e) => {
                                                    e.stopPropagation()
                                                    wishlistId.includes(product._id) ? deleteFromWishlist({ productId: product._id }) : addToWishlist({ productId: product._id })
                                                }} className={`rounded-full border-2 absolute z-10 bg-gray-100 bg-opacity-60 ${wishlistId.includes(product._id) ? 'text-blue-500' : 'hover:text-blue-300 text-blue-200'} w-10 h-10 p-0 border-0 inline-flex items-center justify-center m-1`}>
                                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                    </svg>
                                                </button>
                                                {/* image container  */}
                                                <a className="block relative h-auto bg-gray-100 rounded overflow-hidden">
                                                    <img alt={"ecommerce"} className="p-5 sm:p-2 object-center w-auto mx-auto sm:h-64 h-44 block" src={product.img} />
                                                </a>
                                                {/* details container  */}
                                            <div className="p-4">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                                                <h2 className="text-gray-900 title-font text-lg font-medium">{`${product.title.slice(0,30)} (${product.color}${product.size?` / ${product.size}`:''}${product.storage?` / ${product.storage}`:''})`}</h2>
                                                {product.availableQty>0?
                                                    <p className="mt-1 text-right text-blue-500 text-lg font-semibold">₹ {product.price}</p>
                                                    :
                                                    <div className='w-full px-1 font-semibold border border-red-500 py-1 text-center text-red-500'>Out of Stock</div>
                                                    }
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                    })
                            }


                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    connectDb()
    let products = await Product.find({ category: 'bagpack' })
    let sortedProducts = {}
    for (let item of products) {
        if (item.title in sortedProducts) {
            if (!(sortedProducts[item.title].color).includes(item.color) && item.availableQty > 0) {
                sortedProducts[item.title].color.push(item.color)
                sortedProducts[item.title].img.push(item.img)
                sortedProducts[item.title].slug.push(item.slug)
            }
            if (!(sortedProducts[item.title].size).includes(item.size) && item.availableQty > 0) {
                sortedProducts[item.title].size.push(item.size)
            }
        }
        else {
            if (item.availableQty > 0) {
                sortedProducts[item.title] = await JSON.parse(JSON.stringify(item))
                sortedProducts[item.title].color = [item.color]
                sortedProducts[item.title].size = [item.size]
                sortedProducts[item.title].img = [item.img]
                sortedProducts[item.title].slug = [item.slug]
            }
        }
    }

    return {
        props: { products: JSON.parse(JSON.stringify(products)) }
    }
}

export default Bagpack

