import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProvincesData = () => {
  return useQuery(
    ["provinces"],
    async () => {
      const { data } = await axios.get("https://psgc.gitlab.io/api/provinces/");
      return data;
    },
    {
      refetchOnMount: false,
    }
  );
};
