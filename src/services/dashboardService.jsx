import axios from "axios";
import Cookies from "js-cookie";
import { authToken } from "../utils/authToken";
import { eachDayOfInterval, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const getAllDatesInRange = (startDateString, endDateString) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  return eachDayOfInterval({ start: startDate, end: endDate }).map((date) =>
    formatInTimeZone(date, "Asia/Makassar", "dd/MM/yyyy")
  );
};

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

const prepareData = (groupedData, allDates) => {
  const preparedData = {};
  allDates.forEach((date) => {
    preparedData[date] = groupedData[date] || 0;
  });
  return preparedData;
};

export const getDataRalanDashboard = async (
  startDate,
  endDate,
  setPasienRalan,
  setseriesDataRalan,
  setCategories
) => {
  authToken();
  try {
    const savedAuth = Cookies.get("auth");
    const { data } = JSON.parse(savedAuth);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/ralan`, {
      headers: { Authorization: `Bearer ${data}` },
    });
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

export const getDataRanapDashboard = async (
  startDate,
  endDate,
  setPasienRanap,
  setseriesDataRanap,
  setCategories
) => {
  authToken();
  try {
    const savedAuth = Cookies.get("auth");
    const { data } = JSON.parse(savedAuth);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/ranap`, {
      headers: { Authorization: `Bearer ${data}` },
    });
    const filteredData = response.data.filter((item) =>
      isWithinDateRange(item.tgl_masuk, startDate, endDate)
    );
    setPasienRanap(filteredData);
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
