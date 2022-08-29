import React, { useContext } from 'react'
import Link from 'next/link'
import { Context } from '../context/context'
import { useRouter } from 'next/router'

const Footer = () => {
  const { allCategories } = useContext(Context)
  const router = useRouter()

  return (
    <>
      <footer className="text-gray-600 body-font border-t">
        <div className="max-w-8xl container px-5 py-20 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
            <div className="w-full flex flex-col items-center">
              <img src={'/logo-lg.png'} alt={'Evergoods'} width={240} height={72} />
              <p className="mt-2 text-sm text-center text-gray-500">Get your goods everywhere</p>
            </div>
          </div>
          <div className="flex-grow flex justify-start flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                {
                  allCategories.map((item) => {
                    return <li key={item._id}><Link href={`/${item.title}`}>
                      <a className="text-gray-600 hover:underline underline-offset-4 hover:text-gray-800">{item.title.replace(item.title[0], item.title[0].toUpperCase())}s</a>
                    </Link></li>
                  })
                }
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">MORE</h2>
              <nav className="list-none mb-10">
                <li><Link href={'/laptop'}>
                  <a className="text-gray-600 hover:underline underline-offset-4 hover:text-gray-800">Privacy policy</a>
                </Link></li>
                <li><Link href={'/bagpack'}>
                  <a className="text-gray-600 hover:underline underline-offset-4 hover:text-gray-800">Terms and conditions</a>
                </Link></li>
              </nav>
            </div>
          </div>
        </div>
        <div className="">
          <div className="max-w-8xl container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-900 text-sm text-center sm:text-left">© 2022 Evergoods —
              <a href="https://sambhav-kaushik.vercel.app" rel="noopener noreferrer" className="text-gray-900 font-bold ml-1" target="_blank">@sambhavkaushik</a>
            </p>
            <a onClick={() => { router.push(`/?modal=authAdmin`) }} className="sm:ml-auto sm:mt-0 mt-2 sm:mx-0 mx-auto text-blue-500 justify-center sm:justify-start hover:underline underline-offset-4 font-bold cursor-pointer">
              Admine console
            </a>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer