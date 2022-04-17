import React, { useState, useEffect } from "react"
import {useRouter} from 'next/router'

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {


    // -----states----- 
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedin, setIsLoggedin] = useState(false)


    // -----effects-----
    // trigger loading 
    useEffect(() => {
        let authToken = localStorage.getItem('authToken')
        if(authToken){
            setIsLoggedin(true)
        }
        else{
            setIsLoggedin(false)
        }
    }, [isLoggedin])

    // -----funstions-----
    //function to login a user
    const userLogin = async (credentials)=>{
        const rawData = await fetch('http://localhost:3000/api/user/authUser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(credentials)
        })
        const parsedData = await rawData.json()
        if(parsedData.success){
            setIsLoggedin(true)
            router.push('')
            localStorage.setItem('authToken',parsedData.authToken)
        }
        else{
            setIsLoggedin(false)
            localStorage.removeItem('authToken')
        }
        return parsedData
    }

    //function to create a user
    const userSignup = async (credentials)=>{
        const rawData = await fetch('http://localhost:3000/api/user/createUser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(credentials)
        })
        const parsedData = await rawData.json()
        console.log(parsedData)
        if(parsedData.success){
            setIsLoggedin(true)
            router.push('')
            localStorage.setItem('authToken',parsedData.authToken)
        }
        else{
            setIsLoggedin(false)
            localStorage.removeItem('authToken')
        }
        return parsedData
    }

    //function to logout a user
    const userLogout=()=>{
        localStorage.removeItem('authToken')
        setIsLoggedin(false)
    }


    return (
        <Context.Provider value={{ isLoading, isLoggedin, userLogin, userSignup, userLogout }}>
            {children}
        </Context.Provider>
    )
}
