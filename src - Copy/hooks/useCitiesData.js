import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCitiesData = (province) => {
  return useQuery(
    ["cities"],
    async () => {
      if (province) {
        const { data } = await axios.get(
          `https://psgc.gitlab.io/api/provinces/${province}/cities-municipalities/`
        );
        return data;
      } return [];
    },
    {
      enabled: false,
    }
  );
};
