import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useVehicleClassesData = () => {
  return useQuery(
    ["vehicleClasses"],
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_STRAPI_URL}api/vehicle-classes`
      );
      return data;
    },
    {
      select: (data) => {
        return data?.data.map((item) => item);
      },
    }
  );
};
