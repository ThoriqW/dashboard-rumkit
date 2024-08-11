import { useEffect, useState } from "react";
import { format } from "date-fns";
import Sidebar from "../components/Sidebar";
import BarChart from "../components/BarChart";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { getDataRanap } from "../services/ranapService";

const Ranap = () => {
  const [categories, setCategories] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const totalRanap = () => {
    let total = 0;
    for (let i = 0; i < seriesData.length; i++) {
      total += seriesData[i];
    }
    return total;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getDataRanap(currentDate, setSeriesData, setCategories);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
            name="date"
            className="border-gray-300 text-gray-600"
            defaultValue={currentDate}
            onChange={(e) => {
              setSeriesData([]);
              setCurrentDate(e.target.value);
            }}
          />
        </div>
        <div className="p-5 mb-4 rounded bg-gray-50 h-[500px] dark:bg-gray-800">
          {isLoading ? (
            <Loading />
          ) : (
            <BarChart
            data1={seriesData}
            categories={categories}
            total={`${totalRanap()} Pasien`}
            nameData1="Rawat Inap"
            title="Grafik Ranap Harian"
          />
          )}
        </div>
      </div>
    </>
  );
};

export default Ranap;
