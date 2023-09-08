import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAuthProvider = (provider, accessToken) => {
  return useQuery(
    ["authProvider"],
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_STRAPI_URL}api/auth/${provider}/callback?access_token=${accessToken}`
      );
      return data;
    },
    {
      enabled: false,
    }
  );
};
