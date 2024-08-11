import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BarChart from "../components/BarChart";
import { format } from "date-fns";
import Header from "../components/Header";
import TablePasien from "../components/TablePasien";
import Loading from "../components/Loading";
import {
  getDataRalanDashboard,
  getDataRanapDashboard,
} from "../services/dashboardService";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [seriesDataRalan, setseriesDataRalan] = useState([]);
  const [seriesDataRanap, setseriesDataRanap] = useState([]);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [pasienRalan, setPasienRalan] = useState([]);
  const [pasienRanap, setPasienRanap] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const total = () => {
    let total = 0;
    for (let i = 0; i < seriesDataRalan.length; i++) {
      total += seriesDataRalan[i];
    }
    for (let i = 0; i < seriesDataRanap.length; i++) {
      total += seriesDataRanap[i];
    }
    return total;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getDataRalanDashboard(
          startDate,
          endDate,
          setPasienRalan,
          setseriesDataRalan,
          setCategories
        );
        await getDataRanapDashboard(
          startDate,
          endDate,
          setPasienRanap,
          setseriesDataRanap,
          setCategories
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
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
                setseriesDataRalan([]);
                setseriesDataRanap([]);
                setPasienRalan([]);
                setPasienRanap([]);
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
                setseriesDataRalan([]);
                setseriesDataRanap([]);
                setPasienRalan([]);
                setPasienRanap([]);
                setEndDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="p-5 mb-4 rounded bg-gray-50 h-[450px] dark:bg-gray-800">
          {isLoading ? (
            <Loading />
          ) : (
            <BarChart
              data1={seriesDataRalan}
              data2={seriesDataRanap}
              categories={categories}
              total={`${total()} Pasien`}
              nameData1="Rawat Jalan"
              nameData2="Rawat Inap"
              title="Grafik Pasien Ranap dan Ralan"
            />
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TablePasien data={pasienRalan} title="Pasien Rawat Jalan" />
          <TablePasien data={pasienRanap} title="Pasien Rawat Inap" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
