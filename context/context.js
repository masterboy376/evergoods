import React, { useState, useEffect } from "react"
import {useRouter} from 'next/router'

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {


    // -----states----- 
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    // -----effects-----
    // trigger loading 
    useEffect(() => {
        if (isLoading) {
        } else {
        }
    }, [isLoading])

    // -----funstions-----


    return (
        <Context.Provider value={{ isLoading }}>
            {children}
        </Context.Provider>
    )
}
