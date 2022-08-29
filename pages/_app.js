import React,{useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import '../styles/custom.css'
import {ContextProvider} from '../context/context'
import {AdminContextProvider} from '../context/adminContext'
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from "../components/Sidebar/Sidebar.js";

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete',()=>{setProgress(100)})
  }, [router.events])
  
  return (
    <AdminContextProvider>
    <ContextProvider>
    <>
    <LoadingBar color='#3b82f6' progress={progress} onLoaderFinished={()=> setProgress(0)} waitingTime={0} height={4}/>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {
        router.pathname.includes('admin')?
        <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Component {...pageProps} />
      </div>
    </>
        :
      <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-white">
      <Component {...pageProps} />
      </div>
      <Footer/>
      </>
      }
    </>
    </ContextProvider>
    </AdminContextProvider>
  )
}

export default MyApp
