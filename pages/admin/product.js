import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/adminContext'
import Head from 'next/head'
import Image from 'next/image'
import Product from '../../models/Product'
import connectDb from '../../middleware/connect'
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Modal from 'react-modal'
import AddProduct from "../../components/ModalComponents/AddProduct"
import UpdateProduct from "../../components/ModalComponents/UpdateProduct"


export default function AdminProduct({ propProducts }) {
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
      let newArray = [...propProducts]
      for (let i = propProducts.length-1; i >= 0; i--) {
        if (propProducts[i]._id.toLowerCase().includes(searchValue.toLowerCase()) || propProducts[i].title.toLowerCase().includes(searchValue.toLowerCase()) || propProducts[i].category.toLowerCase().includes(searchValue.toLowerCase()) || propProducts[i].availableQty.toLocaleString().includes(searchValue.toLowerCase()) || propProducts[i].slug.toLowerCase().includes(searchValue.toLowerCase()) ||
          new Date(propProducts[i].createdAt).toLocaleString('en-US', {
            timeZone: 'IST',
            hour12: true,
            timeStyle: 'short',
            dateStyle: 'long',
          }).includes(searchValue.toLowerCase()) || 
          new Date(propProducts[i].updatedAt).toLocaleString('en-US', {
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
      setProducts(newArray)
    }

    else {
      setProducts(propProducts)
    }
  }, [searchValue])

  //action
  const { checkAdmin, isLoggedin, removeProduct, addProductModal, setAddProductModal, updateProductModal, setUpdateProductModal, products, setProducts } = useContext(AdminContext)

  const init = async () => {
    await checkAdmin();
    setProducts(propProducts)
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

      <AdminNavbar active="Products" />

      <div className="px-4 md:px-10 mx-auto w-full mb-6 pt-20">

        {/* utilities */}
        <div className="flex items-center w-full mb-4">
          <input onChange={onChangeSearch} type="text" placeholder='search product by productId, title, category, etc.' name="search" id="search" className='flex-1 rounded-lg p-2 border-2 focus:shadow outline-none' />
          <button onClick={() => { setAddProductModal(true) }} className='p-2 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Add Item</button>
        </div>

        {
          products && products.map((item, index) => {
            return <div key={item._id} className="w-full flex sm:flex-row flex-col border rounded-lg p-2 mb-2">
                <img width={200} src={item.img} alt="" className='rounded sm:m-2 m-auto h-full ' />

                <div className="flex-1 m-2">
                  <p className="sm:text-xl text-lg font-bold"> {item.title}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>ProductId: </span>{item._id}</p>
                  <p className="sm:text-base text-sm "> {item.description}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Price: </span>{item.price}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Quantity: </span>{item.availableQty}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Category: </span>{item.category}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Slug: </span>{item.slug}</p>

                  <p className="sm:text-base text-sm "> <span className='font-bold'>Color: </span>{item.color}</p>

                  {item.storage && <p className="sm:text-base text-sm "> <span className='font-bold'>Storage: </span>{item.storage}</p>}

                  <div className="flex justify-end">
                    <button onClick={() => { setUpdateProductModal({state:true, details:{title:item.title, slug:item.slug, description:item.description, img:item.img, category:item.category, storage:item.storage, color:item.color, price:item.price, availableQty:item.availableQty}, id:item._id}) }} className='px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Edit</button>
                    <button onClick={() => {
                      removeProduct(item._id)
                      let tempProducts = [...products]
                      tempProducts.splice(index, 1);
                      setProducts(tempProducts)
                    }} className='px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Delete</button>
                  </div>

                </div>

              </div>

          })

        }
      </div>

      <Modal onRequestClose={() => { setAddProductModal(false) }} ariaHideApp={false} isOpen={addProductModal} style={customStyles}>
        <AddProduct />
      </Modal>

      <Modal onRequestClose={() => { setUpdateProductModal({state:false, details:{}, id:''}) }} ariaHideApp={false} isOpen={updateProductModal.state} style={customStyles}>
        <UpdateProduct />
      </Modal>
    </>

  );
}

export async function getServerSideProps(context) {
  connectDb()
  let products = await Product.find()

  return {
    props: { propProducts: JSON.parse(JSON.stringify(products)) }
  }
}

