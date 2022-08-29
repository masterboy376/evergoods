import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

export const AdminContext = React.createContext()

export const AdminContextProvider = ({ children }) => {

    const [isLoggedin, setIsLoggedin] = useState(false)

    const authAdmin = async (credentials) => {
        const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/authAdmin`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const parsedData = await rawData.json()
        if (parsedData.success) {
            setIsLoggedin(true)
            router.push('')
            sessionStorage.setItem('authToken', parsedData.authToken)
            alertSuccess('Logged in successfully!')
        }
        else {
            setIsLoggedin(false)
            sessionStorage.removeItem('authToken')
            alertFailure('Invalid credentials!')
        }
        return parsedData
    }


    // ----------category----------

    const addCategory = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/addCategory`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(details)
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('Category added successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }

    const removeCategory = async (categoryId) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/removeCategory`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken"), categoryId })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('category removed successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }

    const updateCategory = async (categoryId, newData) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/updateCategory`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken"), categoryId, newData })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('category updated successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }


    // ---------product---------

    const addProduct = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(details)
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('Product added successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }

    const removeProduct = async (productId) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/removeProduct`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken"), productId })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('Product removed successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }

    const updateProduct = async (productId, newData) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/updateProduct`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken"), productId, newData })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('product updated successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }


    // -----------order------------

    const deleteOrder = async (orderId) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/deleteOrder`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken"), orderId })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('order removed successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }

    const updateOrder = async (orderId, newData) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/updateOrder`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken"), orderId, newData })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('order updated successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }

    const getOrdersByUserId = async (userId) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getOrdersByUserId`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken"), userId })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                return parsedData.orders
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }

    return (
        <AdminContext.Provider value={{ authAdmin, addCategory, removeCategory, updateCategory, addProduct, removeProduct, updateProduct,deleteOrder, updateOrder, getOrdersByUserId }}>
            {children}
        </AdminContext.Provider>
    )

}