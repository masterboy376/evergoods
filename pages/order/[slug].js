import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Head from 'next/head'
import Link from 'next/link'
import {Context} from '../../context/context'


const Slug = () => {
  const {cancelOrder} = useContext(Context)
  const router = useRouter()
  const [order, setOrder] = useState()
  const initiate = async () => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/getOrderById`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ orderId: router.query.slug, authToken: localStorage.getItem('authToken') })
    })
    const parsedData = await rawData.json()
    setOrder(parsedData.order)
  }
  
  const handleCancel = async ()=>{
    await cancelOrder({orderId:router.query.slug})
    initiate()
  }
  useEffect(() => {
    if (router.query.slug) {
      initiate()
    }
  }, [router])

  return (
    <>
    <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>

    <section className="text-gray-600 body-font overflow-hidden">
      {order && <div className="container px-5 py-6 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">EVERGOODS Order Summary</h2>
            <Link href={`/product/${order.productDetails.slug}`} ><h1 className="text-gray-900 text-3xl title-font font-medium mb-4 cursor-pointer">{order.productDetails.title}</h1></Link>
            <p className='mb-4 font-semibold'>Order ID: {router.query.slug}</p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Sub total</span>
              <span className="ml-auto font-semibold text-blue-500">₹ {order.productDetails.price*order.basicOrder.quantity}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Quantity</span>
              <span className="ml-auto text-gray-900">{order.basicOrder.quantity}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Date of order</span>
              <span className="ml-auto text-gray-900">{new Date(order.basicOrder.createdAt).toLocaleString('en-US', {
                timeZone: 'IST',
                hour12: true,
                timeStyle: 'short',
                dateStyle: 'long',
              })}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className={`font-bold text-lg rounded p-2 ${order.basicOrder.status == 'ordered' ? 'text-blue-500 border-2 border-blue-500' : 'hidden'}`}>Ordered</span>
              <span className={`font-bold text-lg rounded p-2 ${order.basicOrder.status == 'cancelled' ? 'text-blue-500 border-2 border-blue-500' : 'hidden'}`}>Cancelled</span>
              <span className={`font-bold text-lg rounded p-2 ${order.basicOrder.status == 'delivered' ? 'text-blue-500 border-2 border-blue-500' : 'hidden'}`}>Delivered</span>
              <button onClick={()=>{
                handleCancel()
              }} className={`rounded-full w-10 h-10 hover:bg-gray-200 bg-gray-100 p-0 border-0 inline-flex items-center justify-center text-black ml-4 ${order.basicOrder.status!='ordered'?'hidden':''}`}>
                <RiDeleteBin6Line size={24} className='' />
              </button>
            </div>
          </div>
          <div className="flex items-start justify-center sm:w-1/2 py-10 w-full rounded">
            <img alt="ecommerce" className=" h-auto max-h-64 sm:max-h-96 w-auto rounded" src={order.productDetails.img} />
          </div>
        </div>
      </div>
      }
    </section>
    </>
  )
}


export default Slug