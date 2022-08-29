import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
            <p className="text-gray-900 text-sm text-center sm:text-left">© 2022 Evergoods —
              <a href="https://sambhav-kaushik.vercel.app" rel="noopener noreferrer" className="text-gray-900 font-bold ml-1" target="_blank">@sambhavkaushik</a>
            </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
