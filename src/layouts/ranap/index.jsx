import React, { useEffect, useState, useContext } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO, format } from "date-fns";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import BarChart from "../../components/BarChart";
import Header from "../../components/Header";
import AuthContext from "../../contexts/AuthContext";

const Ranap = () => {
  const [categories, setCategories] = useState([]);
  const [seriesData, setseriesData] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const { auth } = useContext(AuthContext);

  const getDataRalan = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ranap`,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      const checkDate = (dateString) => {
        const tgl_masuk = parseISO(dateString);
        const localDate = parseISO(currentDate);
        return (
          formatInTimeZone(localDate, "Asia/Makassar", "yyyy-MM-dd") ==
          formatInTimeZone(tgl_masuk, "Asia/Makassar", "yyyy-MM-dd")
        );
      };
      const filteredData = await response.data.filter((item) =>
        checkDate(item.tgl_masuk)
      );
      const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.nm_bangsal]) {
          acc[item.nm_bangsal] = 0;
        }
        acc[item.nm_bangsal]++;
        return acc;
      }, {});
      setseriesData(Object.values(groupedData));
      setCategories(Object.keys(groupedData));
    } catch (e) {
      throw console.error(e);
    }
  };

  const totalRanap = () => {
    let total = 0;
    for (let i = 0; i < seriesData.length; i++) {
      total += seriesData[i];
    }
    return total;
  };

  useEffect(() => {
    getDataRalan();
  }, [currentDate]);
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Header />
        <div className="flex items-center mb-5">
          <p className="mr-5">Pilih Tanggal:</p>
          <input
            type="date"
            name="dateRalan"
            id="dateRalan"
            defaultValue={currentDate}
            onChange={(e) => {
              setseriesData([]);
              setCurrentDate(e.target.value);
            }}
          />
        </div>
        <div className="p-5 mb-4 rounded bg-gray-50 h-[500px] dark:bg-gray-800">
          {seriesData.length > 0 && categories.length > 0 ? (
            <BarChart
              data1={seriesData}
              categories={categories}
              total={`${totalRanap()} Pasien`}
              nameData1="Rawat Inap"
              title="Grafik Ranap Harian"
            />
          ) : (
            <div
              role="status"
              className="w-full h-full flex justify-center items-center"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Ranap;
