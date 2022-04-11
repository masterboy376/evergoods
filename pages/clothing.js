import React, {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import mongoose from 'mongoose'
import Product from '../models/Product'

const Clothing = (props) => {
    const [products, setProducts] = useState(props.products)

    return (
        <>
            <div className='min-h-screen '>

                <Head>
                    <title>evergoods</title>
                    <meta name="description" content="get your goods ever where" />
                    <link rel="icon" href="/favicon.png" />
                </Head>

                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {
                                products.map((product)=>{
                                    return <div className="lg:w-1/4 md:w-1/2 w-full p-4">
                                    <Link href={`/product/${product.slug}`}>
                                        <div className="border rounded-lg cursor-pointer w-full hover:shadow">
                                            <a className="block relative h-auto rounded overflow-hidden">
                                                <img alt={"ecommerce"} className="object-cover object-center w-full h-auto block" src={product.img} />
                                            </a>
                                            <div className="p-4">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                                                <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                                                <p className="mt-1">${product.price}</p>
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

export async function getServerSideProps(context){
    if(!(mongoose.connections[0].readyState)){
        await mongoose.connect(process.env.MONGO_URI, ()=>{console.log('connected')})
    }
    let products = await Product.find()
    return{
      props: {products: JSON.parse(JSON.stringify(products))}
    }
  }

export default Clothing

