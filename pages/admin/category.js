import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/adminContext'
import Head from 'next/head'
import Category from '../../models/Category'
import connectDb from '../../middleware/connect'
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Modal from 'react-modal'
import AddCategory from "../../components/ModalComponents/AddCategory"
import UpdateCategory from '../../components/ModalComponents/UpdateCategory'


export default function AdminCategory({ propCategories }) {

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
      let newArray = [...propCategories]
      for (let i = propCategories.length - 1; i >= 0; i--) {
        if (propCategories[i]._id.toLowerCase().includes(searchValue.toLowerCase()) || propCategories[i].title.toLowerCase().includes(searchValue.toLowerCase()) ||
          new Date(propCategories[i].createdAt).toLocaleString('en-US', {
            timeZone: 'IST',
            hour12: true,
            timeStyle: 'short',
            dateStyle: 'long',
          }).includes(searchValue.toLowerCase()) ||
          new Date(propCategories[i].updatedAt).toLocaleString('en-US', {
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
      setCategories(newArray)
    }

    else {
      setCategories(propCategories)
    }
  }, [searchValue])

  //action
  const { checkAdmin, isLoggedin, removeCategory, addCategoryModal, setAddCategoryModal, updateCategoryModal, setUpdateCategoryModal, categories, setCategories } = useContext(AdminContext)

  const init = async () => {
    await checkAdmin();
    setCategories(propCategories)
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
          <input onChange={onChangeSearch} type="text" placeholder='search category by categoryId, title, etc.' name="search" id="search" className='flex-1 rounded-lg p-2 border-2 focus:shadow outline-none' />
          <button onClick={() => { setAddCategoryModal(true) }} className='p-2 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Add Item</button>
        </div>

        {
          categories && categories.map((item, index) => {
            return <div key={item._id} className="w-full flex sm:flex-row flex-col border rounded-lg p-2 mb-2">
                <img width={100} src={item.img} alt="" className='rounded sm:m-2 m-auto h-full ' />

                <div className="flex-1 m-2">
                  <p className="sm:text-xl text-lg font-bold"> {item.title}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>CategoryId: </span>{item._id}</p>

                  <div className="flex justify-end">
                    <button onClick={() => { setUpdateCategoryModal({ state: true, details: { title: item.title, img: item.img }, id: item._id }) }} className='px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Edit</button>
                    <button onClick={() => {
                      removeCategory(item._id)
                      let tempCategories = [...categories]
                      tempCategories.splice(index, 1);
                      setCategories(tempCategories)
                    }} className='px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Delete</button>
                  </div>

                </div>

              </div>

          })

        }
      </div>

      <Modal onRequestClose={() => { setAddCategoryModal(false) }} ariaHideApp={false} isOpen={addCategoryModal} style={customStyles}>
        <AddCategory />
      </Modal>

      <Modal onRequestClose={() => { setUpdateCategoryModal({ state: false, details: {}, id: '' }) }} ariaHideApp={false} isOpen={updateCategoryModal.state} style={customStyles}>
        <UpdateCategory />
      </Modal>

    </>

  );
}

export async function getServerSideProps(context) {
  connectDb()
  let categories = await Category.find()

  return {
    props: { propCategories: JSON.parse(JSON.stringify(categories)) }
  }
}