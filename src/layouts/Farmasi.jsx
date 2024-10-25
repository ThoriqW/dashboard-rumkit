import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BarChart from "../components/BarChart";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getDataFarmasi } from "../services/farmasiService";

const Farmasi = () => {
  const [categories, setCategories] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const totalObat = () => {
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
        await getDataFarmasi(startDate, endDate, setSeriesData, setCategories);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Header />
        <div className="flex gap-2">
          <div className="sm:flex items-center mb-2">
            <p className="mr-2 mb-2">Pilih Tanggal:</p>
            <input
              type="date"
              name="date"
              className="border-gray-300 text-gray-600"
              defaultValue={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div className="sm:flex items-center mb-2">
            <p className="mr-2 mb-2">s.d</p>
            <input
              type="date"
              name="date"
              className="border-gray-300 text-gray-600"
              defaultValue={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="p-5 mb-4 rounded bg-gray-50 h-[500px] dark:bg-gray-800">
          {isLoading ? (
            <Loading />
          ) : (
            <BarChart
              nameData1="Nama Obat"
              title="Rekap Penggunaan Obat Poliklinik RS Tk.III dr. Sindhu Trisno"
              data1={seriesData}
              categories={categories}
              total={`${totalObat()} Obat`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Farmasi;
