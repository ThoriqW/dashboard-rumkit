import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import BarChart from "../../components/BarChart";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import axios from "axios";
import Header from "../../components/Header";
import AuthContext from "../../contexts/AuthContext";
import TablePasien from "./TablePasien";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [seriesDataRalan, setseriesDataRalan] = useState([]);
  const [seriesDataRanap, setseriesDataRanap] = useState([]);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [pasienRalan, setPasienRalan] = useState([]);
  const [pasienRanap, setPasienRanap] = useState([]);

  const { auth } = useContext(AuthContext);

  const isWithinDateRange = (dateString, startDateString, endDateString) => {
    const date = parseISO(dateString);
    const startDate = parseISO(startDateString);
    const endDate = parseISO(endDateString);
    return (
      formatInTimeZone(date, "Asia/Makassar", "yyyy-MM-dd") >=
        formatInTimeZone(startDate, "Asia/Makassar", "yyyy-MM-dd") &&
      formatInTimeZone(date, "Asia/Makassar", "yyyy-MM-dd") <=
        formatInTimeZone(endDate, "Asia/Makassar", "yyyy-MM-dd")
    );
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
      formatInTimeZone(date, "Asia/Makassar", "dd/MM/yyyy")
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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ralan`,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      const filteredData = response.data.filter(
        (item) =>
          isWithinDateRange(item.tgl_registrasi, startDate, endDate) &&
          item.nm_poli !== "-" &&
          item.stts
      );
      setPasienRalan(filteredData);
      const groupedData = filteredData.reduce((acc, item) => {
        const date = formatInTimeZone(
          item.tgl_registrasi,
          "Asia/Makassar",
          "dd/MM/yyyy"
        );
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      const allDates = getAllDatesInRange(startDate, endDate);
      const preparedData = prepareData(sortedData(groupedData), allDates);

      setseriesDataRalan(Object.values(sortedData(preparedData)));
      setCategories(Object.keys(sortedData(preparedData)));
    } catch (e) {
      throw console.error(e);
    }
  };

  const getDataRanap = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ranap`,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      const filteredData = response.data.filter((item) =>
        isWithinDateRange(item.tgl_masuk, startDate, endDate)
      );
      setPasienRanap(filteredData)
      const groupedData = filteredData.reduce((acc, item) => {
        const date = formatInTimeZone(
          item.tgl_masuk,
          "Asia/Makassar",
          "dd/MM/yyyy"
        );
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      const allDates = getAllDatesInRange(startDate, endDate);
      const preparedData = prepareData(sortedData(groupedData), allDates);

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
        <div className="flex gap-2">
          <div className="sm:flex items-center mb-2">
            <p className="mr-2 mb-2">Pilih Tanggal:</p>
            <input
              type="date"
              name="dateRalan"
              id="dateRalan"
              className="border-gray-300 text-gray-600"
              defaultValue={startDate}
              onChange={(e) => {
                setseriesDataRalan([]);
                setseriesDataRanap([]);
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div className="sm:flex items-center mb-2">
            <p className="mr-2 mb-2">s.d</p>
            <input
              type="date"
              name="dateRalan"
              id="dateRalan"
              className="border-gray-300 text-gray-600"
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
          {seriesDataRalan.length > 0 &&
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
            <Spinner />
          )}
        </div>
        {pasienRalan.length > 0 && pasienRanap.length > 0 ? (
          <TablePasien ralan={pasienRalan} ranap={pasienRanap} />
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Dashboard;
