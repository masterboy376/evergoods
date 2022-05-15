import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen '>

      <Head>
        <title>evergoods</title>
        <meta name="description" content="get your goods everywhere, e-commerce, buy, fast delivery." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      
      <div className="p-4">
      <div className="w-full rounded-2xl flex flex-col justify-center items-center py-4 h-96 bg-[url('/coverbg.jpg')] bg-cover bg-no-repeat bg-bottom">
<div className="p-4 flex flex-col items-center m-4 bg-gray-100 opacity-50 rounded-2xl opacity-90 justify-center">
        <p className="text-xl sm:text-4xl text-center font-bold font-sans mt-10">Hi 👏, Welcome to your own store 😊!</p>
        
        <p className="text-xl sm:text-4xl text-center font-bold font-sans mt-10">Get Everything Everywhere with <img src="/logo-lg.png" alt="" className='mx-auto my-1'/></p>
        <p className="text-base sm:text-xl text-center font-sans text-ping-300 mt-10">Get everything everywhere with evergoods. Fast, Secure, Nice and handy.</p>
</div>
      </div>
      </div>

      <p className="text-2xl sm:text-4xl text-center font-bold font-sans mt-10">Categories</p>
      <div className="container grid grid-cols-2 sm:grid-cols-4 gap-10 mx-auto max-w-8xl p-12">
        <Link href={'/laptop'}>  
        <div className="border-2 border-purple-400 hover:shadow-lg hover:shadow-yellow-300 overflow-hidden rounded-full bg-white hover:scale-110 transition-all duration-200 mx-auto my-auto">
          <img src="/laptop.jpg" alt="" />
        </div>
        </Link>
        <Link href={'/bagpack'}>
        <div className="border-2 border-purple-400 hover:shadow-lg hover:shadow-yellow-300 overflow-hidden rounded-full bg-white hover:scale-110 transition-all duration-200 mx-auto my-auto">
          <img src="/bagpack.jpg" alt="" />
        </div>
        </Link>
        <Link href={'/watch'}>
        <div className="border-2 border-purple-400 hover:shadow-lg hover:shadow-yellow-300 overflow-hidden rounded-full bg-white hover:scale-110 transition-all duration-200 mx-auto my-auto">
          <img src="/watch.png" alt="" />
        </div>
        </Link>
        <Link href={'/headphone'}>
        <div className="border-2 border-purple-400 hover:shadow-lg hover:shadow-yellow-300 overflow-hidden rounded-full bg-white hover:scale-110 transition-all duration-200 mx-auto my-auto">
          <img src="/headphone.jpg" alt="" />
        </div>
        </Link>
      </div>

    </div>
  )
}
