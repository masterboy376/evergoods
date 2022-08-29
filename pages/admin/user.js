import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/adminContext'
import Head from 'next/head'
import User from '../../models/User'
import connectDb from '../../middleware/connect'
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";


export default function AdminUser({propUsers}) {

  //search
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (searchValue.length != 0) {
      let newArray = [...propUsers]
      for (let i = propUsers.length-1; i >= 0; i--) {
        if (propUsers[i]._id.toLowerCase().includes(searchValue.toLowerCase()) || propUsers[i].name.toLowerCase().includes(searchValue.toLowerCase()) || propUsers[i].email.toLowerCase().includes(searchValue.toLowerCase()) ||
          new Date(propUsers[i].createdAt).toLocaleString('en-US', {
            timeZone: 'IST',
            hour12: true,
            timeStyle: 'short',
            dateStyle: 'long',
          }).includes(searchValue.toLowerCase()) || 
          new Date(propUsers[i].updatedAt).toLocaleString('en-US', {
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
      setUsers(newArray)
    }

    else {
      setUsers(propUsers)
    }
  }, [searchValue])

  //action
  const { checkAdmin, isLoggedin, users, setUsers } = useContext(AdminContext)

  const init = async () => {
    await checkAdmin();
    setUsers(propUsers)
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

      <AdminNavbar active="Users"/>


      <div className="px-4 md:px-10 mx-auto w-full mb-6 pt-20">

      <div className="flex items-center w-full mb-4">
          <input onChange={onChangeSearch} type="text" placeholder='search user by userId, name, email, etc.' name="search" id="search" className='flex-1 rounded-lg p-2 border-2 focus:shadow outline-none' />
        </div>

        {
          users && users.map((item, index) => {
            return <div key={item._id} className="w-full flex sm:flex-row flex-col border rounded-lg p-2 mb-2">

                <div className="flex-1 m-2">
                  <p className="sm:text-base text-sm "> <span className='font-bold'>UserId: </span>{item._id}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Name: </span>{item.name}</p>
                  <p className="sm:text-base text-sm "> <span className='font-bold'>Email: </span>{item.email}</p>
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
                  {/* <p className="sm:text-base text-sm "> <span className='font-bold'>Cart: </span>{item.cart}</p> */}
                  {/* <p className="sm:text-base text-sm "> <span className='font-bold'>Wishlist: </span>{item.wishilist}</p> */}

                  {/* <div className="flex justify-end">
                    <button onClick={() => { setUpdateUserModal({state:true, details:{name:item.name, email:item.email }, id:item._id}) }} className='px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Edit</button>
                    <button onClick={() => {
                      deleteUser(item._id)
                      let tempUsers = [...users]
                      tempUsers.splice(index, 1);
                      setUsers(tempUsers)
                    }} className='px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 ml-2 text-white'>Delete</button>
                  </div> */}

                </div>

              </div>
          })

        }
      </div>

    </>

  );
}

export async function getServerSideProps(context) {
  connectDb()

  let users = await User.find().select("-password")

  return {
    props: { propUsers: JSON.parse(JSON.stringify(users)) }
  }
}