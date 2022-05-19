import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {


    // -----states----- 
    const router = useRouter()
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [displayCart, setDisplayCart] = useState(false)
    const [displayProfile, setDisplayProfile] = useState(false)
    const [displayCategory, setDisplayCategory] = useState(false)
    const [displayMenu, setDisplayMenu] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [cartValue, setCartValue] = useState(0)
    const [allProducts, setAllProducts] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [displaySmCategory, setDisplaySmCategory] = useState(false)
    const [displaySmProfile, setDisplaySmProfile] = useState(false)

    // -----effects-----
    // trigger loading 
    useEffect(() => {
        let authToken = localStorage.getItem('authToken')
        if (authToken) {
            setIsLoggedin(true)
        }
        else {
            setIsLoggedin(false)
        }
    }, [isLoggedin])

    //get the cart ready
    useEffect(() => {
        initiateCart()
        initiateWishlist()
    }, [, isLoggedin])

    useEffect(() => {
        getProducts()
    }, [])
      

    // -----funstions-----
    //get all products
    const getProducts = async () => {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/getProducts`)
            const parsedData = await rawData.json()
            if(parsedData.success){
                setAllProducts(parsedData.products)
                console.log(allProducts)
            }
    }

    //function to login a user
    const userLogin = async (credentials) => {
        const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/authUser`, {
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
            localStorage.setItem('authToken', parsedData.authToken)
            alertSuccess('Logged in successfully!')
        }
        else {
            setIsLoggedin(false)
            localStorage.removeItem('authToken')
            alertFailure('Invalid credentials!')
        }
        return parsedData
    }

    //function to create a user
    const userSignup = async (credentials) => {
        const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/createUser`, {
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
            localStorage.setItem('authToken', parsedData.authToken)
            alertSuccess('Signed up successfully!')
        }
        else {
            setIsLoggedin(false)
            localStorage.removeItem('authToken')
            alertFailure('Invalid credentials!')
        }
        return parsedData
    }

    //function to logout a user
    const userLogout = () => {
        localStorage.removeItem('authToken')
        setIsLoggedin(false)
        setCartItems([])
        setCartItems(0)
        alertSuccess('Logged out successfully!')
    }

    // function to add item to cart 
    const addToCart = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/addItem`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product: details.productId, quantity: details.quantity, authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                initiateCart()
                alertSuccess('Item added to cart!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact with the cart!')
        }
    }

    // function to remove all items to cart 
    const clearCart = async () => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/removeItem`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                initiateCart()
                alertSuccess('Cleared cart!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact with the cart!')
        }
    }

    // function to plus item to cart 
    const deleteFromCart = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/deleteItem`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product: details.productId, authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                initiateCart()
                alertSuccess('Item removed to cart!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact with the cart!')
        }
    }

    // function to plus item to cart 
    const plusToCart = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/plusItem`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product: details.productId, authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                initiateCart()
                alertSuccess('Raised the quantity!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact with the cart!')
        }
    }

    // function to plus item to cart 
    const minusToCart = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/minusItem`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product: details.productId, authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                initiateCart()
                alertSuccess('Decreased the quantity!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact with the cart!')
        }
    }

    //get the cart ready
    const initiateCart = async () => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/getItems`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            setCartItems(parsedData.items)
            let totalValue = 0
            parsedData.items.map((item)=>{
                totalValue = totalValue + parseInt(item.productDetails.price*item.quantity)
            })
            setCartValue(totalValue)
            return parsedData
        }
    }

    // function place order 
    const placeOrder = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/placeOrder`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ productId: details.productId, address: details.address, quantity: details.quantity, authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('ordered placed successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to place order!')
        }
    }

    // function cancel order 
    const cancelOrder = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/cancelOrder`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ orderId: details.orderId, authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                alertSuccess('ordered cancelled successfully!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to place order!')
        }
    }

    // function to add item to wislist 
    const addToWishlist = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/wishlist/addItem`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ productId: details.productId, authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                initiateWishlist()
                alertSuccess('Item added to wishlist!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact with the wishlist!')
        }
    }

    // function to delete item from wishlist
    const deleteFromWishlist = async (details) => {
        if (isLoggedin) {
            const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/wishlist/deleteItem`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ productId: details.productId, authToken: localStorage.getItem('authToken') })
            })
            const parsedData = await rawData.json()
            if(parsedData.success){
                initiateWishlist()
                alertSuccess('Item removed to wishlist!')
            }
            else{
                alertFailure(parsedData.error)
            }
            return parsedData
        }
        else {
            alertFailure('Please login to interact with the wishlist!')
        }
    }

    //initiate wishlist
    const initiateWishlist = async () => {
        const rawData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/wishlist/getItems`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ authToken: localStorage.getItem('authToken') })
        })
        const parsedData = await rawData.json()
        if (parsedData.success) {
          setWishlist(parsedData.items)
        }
      }


    // toggle hamburger menu 
    const toggleMenu = () => {
        displayMenu ?
            setDisplayMenu(false)
            :
            setDisplayMenu(true)
    }

    // toggle category
    const toggleCategory = () => {
        displayCategory ?
            setDisplayCategory(false)
            :
            setDisplayCategory(true)
    }

    // toggle hamburger menu 
    const toggleProfile = () => {
        displayProfile ?
            setDisplayProfile(false)
            :
            setDisplayProfile(true)
    }

    // toggle hamburger Cart 
    const toggleCart = () => {
        displayCart ?
            setDisplayCart(false)
            :
            setDisplayCart(true)
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



    return (
        <Context.Provider value={{ isLoggedin, userLogin, userSignup, userLogout, addToCart, clearCart, plusToCart, minusToCart, deleteFromCart, displayMenu, setDisplayProfile, setDisplayCategory, toggleMenu, displayCart, toggleCart, displayCategory, toggleCategory, displayProfile, toggleProfile, alertFailure, alertSuccess, cartItems, setCartItems, cartValue, cancelOrder, placeOrder, addToWishlist, deleteFromWishlist, wishlist,setWishlist, initiateWishlist, isSearch, setIsSearch, allProducts, displaySmCategory, displaySmProfile, setDisplaySmCategory, setDisplaySmProfile }}>
            {children}
        </Context.Provider>
    )
}
