import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import '../styles/custom.css'
import {ContextProvider} from '../context/context'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
    <>
      <Navbar />
      <div className="mt-20">
      <Component {...pageProps} />
      </div>
      <Footer/>
    </>
    </ContextProvider>
  )
}

export default MyApp
