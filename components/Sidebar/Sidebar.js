import React, { useContext } from 'react'
import { AdminContext } from '../../context/adminContext';
import Link from "next/link";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'

export default function Sidebar() {
  const { adminLogout } = useContext(AdminContext)
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full">

          {/* Brand */}
          <Link href="/admin">
            <a
              className="md:block text-left text-blueGray-600 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
            >
              Evergoods Admin
            </a>
          </Link>

          {/* Toggler */}
          <button
            className="cursor-pointer text-black md:hidden py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white py-3 px-6")}
          >
            <GiHamburgerMenu size={24} />
          </button>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded sm:min-h-full min-h-screen w-full " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pt-2">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/admin">
                    <a
                      className="md:block text-left md:pb-2 text-blueGray-600 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
                    >
                      Evergoods Admin
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <GrClose size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/product">
                  <a
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/product") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Products
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/category">
                  <a
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/category") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tools mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/settings") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Categories
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/order">
                  <a
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/order") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/tables") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Orders
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/user">
                  <a
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/employee") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/tables") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Users
                  </a>
                </Link>
              </li>

            </ul>

            {/* Divider */}
            <hr className="my-2 md:min-w-full" />

            <div className="w-full flex justify-center">
              <button onClick={() => { adminLogout() }} className="p-2 rounded-lg w-1/2 text-white bg-gray-900 hover:bg-gray-800 font-semibold mx-auto">
                Logout
              </button>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}
