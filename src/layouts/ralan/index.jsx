import React, { useContext, useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO, format } from "date-fns";
import Sidebar from "../../components/Sidebar";
import BarChart from "../../components/BarChart";
import axios from "axios";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";

const Ralan = () => {
  const [categories, setCategories] = useState([]);
  const [seriesData, setseriesData] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const getDataRalan = async () => {
    try {
      const savedAuth = Cookies.get("auth");
      const { data } = JSON.parse(savedAuth);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ralan`,
        { headers: { Authorization: `Bearer ${data}` } }
      );
      const checkDate = (dateString) => {
        const tgl_registrasi = parseISO(dateString);
        const localDate = parseISO(currentDate);
        return (
          formatInTimeZone(localDate, "Asia/Makassar", "yyyy-MM-dd") ==
          formatInTimeZone(tgl_registrasi, "Asia/Makassar", "yyyy-MM-dd")
        );
      };

      const filteredData = await response.data.filter(
        (item) =>
          checkDate(item.tgl_registrasi) && item.nm_poli !== "-" && item.stts
      );
      const groupedData = filteredData.reduce((acc, item) => {
        const poliName = item.nm_poli.replace(/^POLIKLINIK\s*/, ""); // Remove "POLIKLINIK " from the beginning
        if (!acc[poliName]) {
          acc[poliName] = 0;
        }
        acc[poliName]++;
        return acc;
      }, {});
      setseriesData(Object.values(groupedData));
      setCategories(Object.keys(groupedData));
    } catch (e) {
      throw console.error(e);
    }
  };

  const totalRalan = () => {
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
            className="border-gray-300 text-gray-600"
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
              total={`${totalRalan()} Pasien`}
              nameData1="Rawat Jalan"
              title="Grafik Ralan Harian"
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default Ralan;
