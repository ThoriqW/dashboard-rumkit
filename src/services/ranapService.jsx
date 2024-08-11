import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";
import axios from "axios";
import Cookies from "js-cookie";
import { authToken } from "../utils/authToken";

export const getDataRanap = async (
  currentDate,
  setseriesData,
  setCategories
) => {
  authToken();
  try {
    const savedAuth = Cookies.get("auth");
    const { data } = JSON.parse(savedAuth);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/ranap`, {
      headers: { Authorization: `Bearer ${data}` },
    });
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
