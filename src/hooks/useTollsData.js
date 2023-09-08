import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTollsData = () => {
  return useQuery(
    ["tolls"],
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_STRAPI_URL}api/expressways?populate[0]=expressway_tolls&populate[1]=rfid.logo`
      );
      return data;
    },
    {
      select: (data) => {
        return data?.data.map((item) => item);
      },
      refetchOnMount: false,
    }
  );
};
