import React, { useState, useEffect } from "react";
import profilePicture from "../assets/profile.jpg";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {

  }
  return (
    <>
      <div className=" flex p-3 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <div className="relative flex">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
          >
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={profilePicture}
              alt="Bordered avatar"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-[40px] z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Pengaturan
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Keluar
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
