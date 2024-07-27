import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import BarChart from "../../components/BarChart";
import { eachDayOfInterval, format } from "date-fns";
import axios from "axios";
import Header from "../../components/Header";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [seriesDataRalan, setseriesDataRalan] = useState([]);
  const [seriesDataRanap, setseriesDataRanap] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  const isWithinDateRange = (dateString, startDateString, endDateString) => {
    const date = new Date(dateString);
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    return date >= startDate && date <= endDate;
  };

  const sortedData = (data) => {
    const sortedData = Object.keys(data)
      .map((date) => ({ date, value: data[date] }))
      .sort(
        (a, b) =>
          new Date(a.date.split("/").reverse().join("-")) -
          new Date(b.date.split("/").reverse().join("-"))
      )
      .reduce((acc, { date, value }) => {
        acc[date] = value;
        return acc;
      }, {});

    return sortedData;
  };

  const getAllDatesInRange = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    return eachDayOfInterval({ start: startDate, end: endDate }).map((date) =>
      format(date, "d/M/yyyy")
    );
  };

  const prepareData = (groupedData, allDates) => {
    const preparedData = {};
    allDates.forEach((date) => {
      preparedData[date] = groupedData[date] || 0;
    });
    return preparedData;
  };

  const getDataRalan = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ralan`);
      const filteredData = response.data.filter(
        (item) =>
          isWithinDateRange(item.tgl_registrasi, startDate, endDate) &&
          item.nm_poli !== "-" &&
          item.stts
      );
      const groupedData = filteredData.reduce((acc, item) => {
        const date = new Date(item.tgl_registrasi)
          .toLocaleDateString()
          .split("T")[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      console.log(sortedData(groupedData));

      const allDates = getAllDatesInRange(startDate, endDate);
      const preparedData = prepareData(sortedData(groupedData), allDates);

      console.log(sortedData(preparedData));

      setseriesDataRalan(Object.values(sortedData(preparedData)));
      setCategories(Object.keys(sortedData(preparedData)));
    } catch (e) {
      throw console.error(e);
    }
  };

  const getDataRanap = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ranap`);
      const filteredData = response.data.filter((item) =>
        isWithinDateRange(item.tgl_masuk, startDate, endDate)
      );
      const groupedData = filteredData.reduce((acc, item) => {
        const date = new Date(item.tgl_masuk)
          .toLocaleDateString()
          .split("T")[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      console.log(sortedData(groupedData));

      const allDates = getAllDatesInRange(startDate, endDate);
      const preparedData = prepareData(sortedData(groupedData), allDates);

      console.log(sortedData(preparedData));

      setseriesDataRanap(Object.values(sortedData(preparedData)));
      setCategories(Object.keys(sortedData(preparedData)));
    } catch (e) {
      throw console.error(e);
    }
  };

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
    getDataRalan();
  }, [startDate, endDate]);

  useEffect(() => {
    getDataRanap();
  }, [startDate, endDate]);
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Header />
        <div className="sm:flex">
          <div className="sm:flex items-center mb-2">
            <p className="mr-5">Pilih Tanggal:</p>
            <input
              type="date"
              name="dateRalan"
              id="dateRalan"
              defaultValue={startDate}
              onChange={(e) => {
                setseriesDataRalan([]);
                setseriesDataRanap([]);
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div className="sm:flex items-center mb-2">
            <p className="mr-5 sm:ml-5">sd</p>
            <input
              type="date"
              name="dateRalan"
              id="dateRalan"
              defaultValue={endDate}
              onChange={(e) => {
                setseriesDataRalan([]);
                setseriesDataRanap([]);
                setEndDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="p-5 mb-4 rounded bg-gray-50 h-[500px] dark:bg-gray-800">
          {seriesDataRalan.length &&
          seriesDataRanap.length > 0 &&
          categories.length > 0 ? (
            <BarChart
              data1={seriesDataRalan}
              data2={seriesDataRanap}
              categories={categories}
              total={`${total()} Pasien`}
              nameData1="Rawat Jalan"
              nameData2="Rawat Inap"
              title="Grafik Pasien Ranap dan Ralan"
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
        {/* <div className="grid grid-cols-2 gap-4 mb-4">
          <div className=" p-5 rounded bg-gray-50 dark:bg-gray-800">
            <PieChart data="pie-chart-penunjang" title="Farmasi" />
          </div>
          <div className=" p-5 rounded bg-gray-50 dark:bg-gray-800">
            <PieChart data="pie-chart-bor" title="BOR" />
          </div>
        </div> */}
        {/* <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
