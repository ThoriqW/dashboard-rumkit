import { authToken } from "../utils/authToken";
import Cookies from "js-cookie";
import axios from "axios";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const getDataRalan = async (
  currentDate,
  setseriesData,
  setCategories
) => {
  authToken();
  try {
    const savedAuth = Cookies.get("auth");
    const { data } = JSON.parse(savedAuth);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/ralan`, {
      headers: { Authorization: `Bearer ${data}` },
    });
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
      const poliName = item.nm_poli.replace(/^POLIKLINIK\s*/, "");
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
