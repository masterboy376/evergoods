import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import connectDb from '../middleware/connect'
import Product from '../models/Product'

const Headphone = (props) => {
    const [products, setProducts] = useState(props.products)

    return (
        <>
            <div className='min-h-screen '>

                <Head>
                    <title>evergoods</title>
                    <meta name="description" content="get your goods ever where" />
                    <link rel="icon" href="/favicon.png" />
                </Head>

                <div className="p-4">
                    <div className="w-full rounded-2xl flex flex-col justify-start items-center py-4 h-96 bg-[url('/headphonebg.jpg')] bg-cover bg-no-repeat bg-bottom">

                    </div>
                </div>

                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {
                                products.map((product) => {
                                    return <div key={product.slug} className="lg:w-1/4 md:w-1/2 w-full p-4">
                                        <Link href={`/product/${product.slug}`}>
                                            <div className="bg-white flex flex-col transition-all duration-300 hover:shadow-yellow-300 ease-in-out justify-between rounded-2xl cursor-pointer w-full hover:shadow-xl h-full">
                                                <a className="block relative h-auto rounded overflow-hidden">
                                                    <img alt={"ecommerce"} className="p-5 sm:p-2 object-center w-full h-64 block" src={product.img} />
                                                </a>
                                                <div className="p-4">
                                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                                                    <h2 className="text-gray-900 title-font text-lg font-medium">{`${product.title.slice(0, 30)} (${product.color}${product.size ? product.size : ''}${product.storage ? product.storage : ''})`}</h2>
                                                    <p className="mt-1">₹ {product.price}</p>
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
    let products = await Product.find({ category: 'headphone' })

    return {
        props: { products: JSON.parse(JSON.stringify(products)) }
    }
}

export default Headphone

