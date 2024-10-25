import { authToken } from "../utils/authToken";
import Cookies from "js-cookie";
import axios from "axios";

export const getDataFarmasi = async (
  startDate,
  endDate,
  setseriesData,
  setCategories
) => {
  authToken();
  try {
    const savedAuth = Cookies.get("auth");
    const { data } = JSON.parse(savedAuth);
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/getallfarmasi?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${data}` } }
    );
    console.log(response);
    const groupedData = response.data.reduce((acc, item) => {
      if (!acc[item.nama_brng]) {
        acc[item.nama_brng] = 0;
      }
      acc[item.nama_brng] = item.jml;
      return acc;
    }, {});
    console.log(groupedData);
    setseriesData(Object.values(groupedData));
    setCategories(Object.keys(groupedData));
  } catch (err) {
    console.log(err);
  }
};
