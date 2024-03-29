import React, { useState } from "react"
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

export const AdminContext = React.createContext()

export const AdminContextProvider = ({ children }) => {

    const router = useRouter();
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [addProductModal, setAddProductModal] = useState(false)
    const [updateProductModal, setUpdateProductModal] = useState({state:false, details:{}, id:''})
    const [updateOrderModal, setUpdateOrderModal] = useState({state:false, details:{}, id:''})
    const [addCategoryModal, setAddCategoryModal] = useState(false)
    const [updateCategoryModal, setUpdateCategoryModal] = useState({state:false, details:{}, id:''})

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])


    const checkAdmin = async ()=>{
        const authToken = sessionStorage.getItem("authToken");
        if(authToken){
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/validateUserByAuthToken`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken") })
            })
            const parsedData = await rawData.json()
            if (parsedData.success) {
                setIsLoggedin(true) 
            }
            else {
                setIsLoggedin(false)
                router.push('/')
            }
        }
        else{
            setIsLoggedin(false)
            router.push('/')
        }
    }
    

     //alert functions
     const alertSuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const alertFailure = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

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
            router.push('/admin/')
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

    const adminLogout = () => {
        sessionStorage.removeItem('authToken')
        router.push('/')
        setIsLoggedin(false)
        alertSuccess('Logged out successfully!')
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
                setAddCategoryModal(false)
                getCategories();
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
                setUpdateCategoryModal(false)
                getCategories()
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

    const getCategories = async () => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getCategories`)
            const parsedData = await rawData.json()
            if(parsedData.success){
                setCategories(parsedData.categories)
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
                setAddProductModal(false)
                getProducts()
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
                setUpdateProductModal(false)
                getProducts()
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

    const getProducts = async () => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getProducts`)
            const parsedData = await rawData.json()
            if(parsedData.success){
                setProducts(parsedData.products)
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
                setUpdateOrderModal(false)
                getOrders()
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

    const getOrders = async () => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getOrders`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken:sessionStorage.getItem("authToken") })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                setOrders(parsedData.orders)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact!')
        }
    }

    return (
        <AdminContext.Provider value={{ adminLogout, authAdmin, addCategory, removeCategory, updateCategory, addProduct, removeProduct, updateProduct,deleteOrder, updateOrder, getOrdersByUserId, checkAdmin, isLoggedin, router, addProductModal, setAddProductModal, updateProductModal, setUpdateProductModal, addCategoryModal, setAddCategoryModal, updateCategoryModal, setUpdateCategoryModal, updateOrderModal, setUpdateOrderModal, products, setProducts, categories, setCategories, orders, setOrders, users, setUsers }}>
            {children}
        </AdminContext.Provider>
    )

}