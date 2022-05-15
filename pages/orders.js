import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'



const Orders = () => {
  const [orders, setOrders] = useState([])
  const initiate = async () => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/getUserOrders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ authToken: localStorage.getItem('authToken') })
    })
    const parsedData = await rawData.json()
    if(parsedData.success){
      setOrders(parsedData.orders)
    }
  }
  useEffect(() => {
    initiate()
  }, [])

  return (
    <>
      <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="text-gray-600 body-font overflow-hidden">
      <p className="w-full text-center text-black text-3xl font-bold my-4">Orders</p>

        <div className="container px-5 py-10 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {
              orders==null || orders==undefined || orders.length==0  ?
              <p className="text-xl mt-10 mx-auto text-center">No orders so far! 🤷‍♂️</p>
              :
                orders.map((item) => {
                  return <Link key={item.basicOrder._id} href={`/order/${item.basicOrder._id}`} >
                    <div className="py-8 my-2 px-8 flex flex-wrap md:flex-nowrap hover:shadow-2xl transition-all duration-300 ease-in-out bg-white rounded-2xl cursor-pointer hover:shadow-yellow-300">
                      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <span className="font-semibold title-font text-gray-700">Order ID: {item.basicOrder._id}</span>
                        <span className="mt-1 text-gray-500 text-sm">{new Date(item.basicOrder.createdAt).toLocaleString('en-US', {
                          timeZone: 'IST',
                          hour12: true,
                          timeStyle: 'short',
                          dateStyle: 'long',
                        })}</span>
                      </div>
                      <div className="md:flex-grow">
                        <div className="flex flex-col md:flex-row md:items-start items-center w-full">
                          <img alt="ecommerce" className="p-4 w-64 h-full object-cover object-center rounded" src={item.productDetails.img} />
                          <div className="flex-1">
                            <h2 className="text-2xl font-medium text-gray-900 title-font mb-4">{item.productDetails.title}</h2>
                            <p className="leading-relaxed mb-4">{item.productDetails.description.slice(0,200)}...</p>
                            <span className={`font-bold text-lg rounded-full p-2 ${item.basicOrder.status == 'ordered' ? 'text-yellow-400' : 'hidden'}`}>Ordered</span>
                            <span className={`font-bold text-lg rounded-full p-2 ${item.basicOrder.status == 'cancelled' ? 'text-red-600' : 'hidden'}`}>Cancelled</span>
                            <span className={`font-bold text-lg rounded-full p-2 ${item.basicOrder.status == 'delivered' ? 'text-green-600' : 'hidden'}`}>Delivered</span>
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



export default Orders