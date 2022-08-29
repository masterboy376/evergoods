import React, {useContext} from 'react'
import { AdminContext } from '../../context/adminContext';

export default function Navbar({active}) {

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-gray-900 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 mb-2">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <span
            className="text-white text-sm uppercase inline-block font-semibold cursor-pointer"
          >
            {active}
          </span>
        </div>
      </nav>
      {/* End Navbar */}

    </>
  );
}
