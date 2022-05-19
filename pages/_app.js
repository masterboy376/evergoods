import React,{useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import '../styles/custom.css'
import {ContextProvider} from '../context/context'
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete',()=>{setProgress(100)})
  }, [router.events])
  
  return (
    <ContextProvider>
    <>
    <LoadingBar color='#ff4500' progress={progress} onLoaderFinished={()=> setProgress(0)} waitingTime={0} height={4}/>
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
      <Navbar />
      <div className="pt-16 min-h-screen bg-yellow-50">
      <Component {...pageProps} />
      </div>
      <Footer/>
    </>
    </ContextProvider>
  )
}

export default MyApp
