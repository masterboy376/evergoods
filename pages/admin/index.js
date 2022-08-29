import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext'
import Head from 'next/head'
// components
import CardLineChart from "../../components/Cards/CardLineChart.js";
import CardBarChart from "../../components/Cards/CardBarChart.js";
import CardPageVisits from "../../components/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import HeaderStats from "../../components/Headers/HeaderStats.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";


export default function Dashboard() {

  const { checkAdmin, isLoggedin } = useContext(AdminContext)

  const init = async ()=>{
    await checkAdmin();
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <>
      <Head>
        <title>evergoods-admin</title>
        <meta name="description" content="get your goods ever where" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <AdminNavbar active="Admin Console"/>
      {/* Header */}
      <HeaderStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">

        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardLineChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart />
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div>
        </div>

        <FooterAdmin />
      </div>


    </>

  );
}

