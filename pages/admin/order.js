import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/adminContext'
import Head from 'next/head'
import Order from '../../models/Order'
import connectDb from '../../middleware/connect'
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Modal from 'react-modal'
import UpdateOrder from "../../components/ModalComponents/UpdateOrder"


export default function AdminOrder({ propOrders }) {

  const customStyles = {
    content: {
      zIndex: 50,
      padding: '4px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '90%',
      maxWidth: '700px',
      maxHeight: '95vh',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: '2px solid gray',
      padding: 0,
      borderRadius: '5px',
    },
    overlay: {
      zIndex: 40,
      backgroundColor: 'rgba(10, 11, 13, 0.50)',
    },
  }

  //search
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (searchValue.length != 0) {
      let newArray = [...propOrders]
      for (let i = propOrders.length - 1; i >= 0; i--) {
        if (propOrders[i]._id.toLowerCase().includes(searchValue.toLowerCase()) || propOrders[i].userId.toLowerCase().includes(searchValue.toLowerCase()) || propOrders[i].productId.toLowerCase().includes(searchValue.toLowerCase()) || propOrders[i].status.toLowerCase().includes(searchValue.toLowerCase()) ||
          new Date(propOrders[i].createdAt).toLocaleString('en-US', {
            timeZone: 'IST',
            hour12: true,
            timeStyle: 'short',
            dateStyle: 'long',
          }).includes(searchValue.toLowerCase()) ||
          new Date(propOrders[i].updatedAt).toLocaleString('en-US', {
            timeZone: 'IST',
            hour12: true,
            timeStyle: 'short',
            dateStyle: 'long',
          }).includes(searchValue.toLowerCase())) {
          continue
        }
        else {
          newArray.splice(i, 1)
          continue
        }
      }
      setOrders(newArray)
    }

    else {
      setOrders(propOrders)
    }
  }, [searchValue])

  //action
  const { checkAdmin, isLoggedin, deleteOrder, orders, setOrders, updateOrderModal, setUpdateOrderModal } = useContext(AdminContext)

  const init = async () => {
    await checkAdmin();
    setOrders(propOrders)
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <>
      <Head>
        <title>evergoods-admin</title>
        <meta name="description" content="get your goods ever where" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <AdminNavbar active="Orders" />

      <div className="px-4 md:px-10 mx-auto w-full mb-6 pt-20">

        <div className="flex items-center w-full mb-4">
          <input onChange={onChangeSearch} type="text" placeholder='search order by userId, productId, orderId, etc.' name="search" id="search" className='flex-1 rounded-lg p-2 border-2 focus:shadow outline-none' />
        </div>

        {
          orders && orders.map((item, index) => {
            return <div key={item._id} className="w-full flex sm:flex-row flex-col border rounded-lg p-2 mb-2">

                <div className="flex-1 m-2">
                  <p className="sm:text-base text-sm "> <span className='font-bold'>OrderId: </span>{item._id}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>UserId: </span>{item.userId}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>ProductId: </span>{item.productId}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Address: </span>{item.address}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Status: </span>{item.status}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Track: </span>{item.track}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Quantity: </span>{item.quantity}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>CreatedAt: </span>{
                    new Date(item.createdAt).toLocaleString('en-US', {
                      timeZone: 'IST',
                      hour12: true,
                      timeStyle: 'short',
                      dateStyle: 'long',
                    })
                  }</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>UpdatedAt: </span>{
                    new Date(item.updatedAt).toLocaleString('en-US', {
                      timeZone: 'IST',
                      hour12: true,
                      timeStyle: 'short',
                      dateStyle: 'long',
                    })
                  }</p>

                  <div className="flex justify-end">
                    <button onClick={() => { setUpdateOrderModal({ state: true, details: { userId: item.userId, productId: item.productId, address: item.address, status: item.status, track: item.track, quantity: item.quantity }, id: item._id }) }} className='px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Edit</button>
                    <button onClick={() => {
                      deleteOrder(item._id)
                      let tempOrders = [...orders]
                      tempOrders.splice(index, 1);
                      setOrders(tempOrders)
                    }} className='px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Delete</button>
                  </div>

                </div>

              </div>
          })

        }
      </div>

      <Modal onRequestClose={() => { setUpdateOrderModal({ state: false, details: {}, id: '' }) }} ariaHideApp={false} isOpen={updateOrderModal.state} style={customStyles}>
        <UpdateOrder />
      </Modal>

    </>

  );
}

export async function getServerSideProps(context) {
  connectDb()

  let orders = await Order.find()

  return {
    props: { propOrders: JSON.parse(JSON.stringify(orders)) }
  }
}
