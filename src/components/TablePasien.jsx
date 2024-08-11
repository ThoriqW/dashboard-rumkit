import { useEffect, useState } from "react";

const TablePasien = ({ data, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState([]);

  const [searchItem, setSearchItem] = useState("");

  const itemsPerPage = 10;

  const totalPage = Math.ceil(data.length / itemsPerPage);

  const setItem = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItem(data.slice(indexOfFirstItem, indexOfLastItem));
  };

  const handleNextPageChange = (currentPage) => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPageChange = (currentPage) => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (value) => {
    setSearchItem(value);
    if (value != "") {
      const filteredRalan = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchItem.toLowerCase());
      });
      setCurrentItem(filteredRalan);
    } else {
      setItem();
    }
  };

  useEffect(() => {
    setItem();
  }, [currentPage, data]);

  return (
    <>
      <div className="rounded bg-gray-50 p-5 dark:bg-gray-800">
        <p className="text-lg font-medium mb-3">{title}</p>
        <div className="relative overflow-x-auto">
          <div className="pb-4 dark:bg-gray-900">
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
                value={searchItem}
                onChange={(e) => handleSearch(e.target.value)}
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
              {currentItem.length > 0 ? (
                currentItem.map((item, i) => (
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
                <tr className="mt-5">
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center mt-5">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Page{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {data.length}
            </span>{" "}
            Pasien
          </span>

          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={() => handlePrevPageChange(currentPage)}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
            <button
              onClick={() => handleNextPageChange(currentPage)}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePasien;
