import React, { useEffect, useState } from "react";

const TablePasien = ({ ralan, ranap }) => {
  const [currentPageRalan, setCurrentPageRalan] = useState(1);
  const [currentItemRalan, setCurrentItemRalan] = useState([]);
  const [currentPageRanap, setCurrentPageRanap] = useState(1);
  const [currentItemRanap, setCurrentItemRanap] = useState([]);
  const [searchItemRanap, setSearchItemRanap] = useState("");
  const [searchItemRalan, setSearchItemRalan] = useState("");
  const itemsPerPage = 10;
  const totalPageRalan = Math.ceil(ralan.length / itemsPerPage);
  const totalPageRanap = Math.ceil(ranap.length / itemsPerPage);

  const setItemRanap = () => {
    const indexOfLastItem = currentPageRanap * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItemRanap(ranap.slice(indexOfFirstItem, indexOfLastItem));
  };

  const setItemRalan = () => {
    const indexOfLastItem = currentPageRalan * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItemRalan(ralan.slice(indexOfFirstItem, indexOfLastItem));
  };

  useEffect(() => {
    setItemRalan();
  }, [currentPageRalan]);

  useEffect(() => {
    setItemRanap();
  }, [currentPageRanap]);

  const handleNextPageChange = (currentPage, pasien) => {
    if (currentPage < totalPageRalan && pasien == "ralan") {
      setCurrentPageRalan((prevPage) => prevPage + 1);
    } else if (currentPage < totalPageRanap && pasien == "ranap") {
      setCurrentPageRanap((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPageChange = (currentPage, pasien) => {
    if (currentPage > 1 && pasien == "ralan") {
      setCurrentPageRalan((prevPage) => prevPage - 1);
    } else if (currentPage > 1 && pasien == "ranap") {
      setCurrentPageRanap((prevPage) => prevPage - 1);
    }
  };

  const handleSearchRalan = (value) => {
    setSearchItemRalan(value)
    if(value != ""){
      const filteredRalan = ralan.filter((item) => {
        return Object.values(item).join("").toLowerCase().includes(searchItemRalan.toLowerCase())
      })
      setCurrentItemRalan(filteredRalan);
    } else {
      setItemRalan();
    }
  }

  const handleSearchRanap = (value) => {
    setSearchItemRanap(value)
    if(value != ""){
      const filteredRanap = ranap.filter((item) => {
        return Object.values(item).join("").toLowerCase().includes(searchItemRanap.toLowerCase())
      })
      setCurrentItemRanap(filteredRanap);
    } else {
      setItemRanap();
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded bg-gray-50 p-5 dark:bg-gray-800">
          <p className="text-lg font-medium mb-3">Pasien Rawat Jalan</p>
          <div className="relative overflow-x-auto">
            <div className="pb-4 dark:bg-gray-900">
              <label
                htmlFor="ralan-search"
                className="sr-only"
              >
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="ralan-search"
                  value={searchItemRalan}
                  onChange={(e) => handleSearchRalan(e.target.value)}
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari Pasien Ralan"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.RM
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jenis Bayar
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemRalan.map((item, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.no_rkm_medis}
                    </th>
                    <td className="px-6 py-4">{item.nm_pasien}</td>
                    <td className="px-6 py-4">
                      {item.png_jawab.replace("BAYAR", "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center mt-5">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Page{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentPageRalan}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalPageRalan}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {ralan.length}
              </span>{" "}
              Pasien
            </span>

            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={() => handlePrevPageChange(currentPageRalan, "ralan")}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Prev
              </button>
              <button
                onClick={() => handleNextPageChange(currentPageRalan, "ralan")}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="rounded bg-gray-50 p-5 dark:bg-gray-800">
          <p className="text-lg font-medium mb-3">Pasien Rawat Inap</p>
          <div className="relative overflow-x-auto">
            <div className="pb-4 dark:bg-gray-900">
              <label
                htmlFor="ranap-search"
                value={searchItemRanap}
                className="sr-only"
              >
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="ranap-search"
                  value={searchItemRanap}
                  onChange={(e) => handleSearchRanap(e.target.value)}
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari Pasien"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.RM
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jenis Bayar
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemRanap.length > 0 ? (
                  currentItemRanap.map((item, i) => (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.no_rkm_medis}
                      </th>
                      <td className="px-6 py-4">{item.nm_pasien}</td>
                      <td className="px-6 py-4">
                        {item.png_jawab.replace("BAYAR", "")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th></th>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex flex-col items-center mt-5">
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {currentPageRanap}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {totalPageRanap}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {ranap.length}
                </span>{" "}
                Entries
              </span>

              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={() =>
                    handlePrevPageChange(currentPageRanap, "ranap")
                  }
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    handleNextPageChange(currentPageRanap, "ranap")
                  }
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePasien;
