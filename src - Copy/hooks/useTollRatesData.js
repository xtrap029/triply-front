import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTollRatesData = (vehicleClass, tollFrom, tollTo) => {
  return useQuery(
    ["tollRates"],
    async () => {
      if (vehicleClass && tollFrom && tollTo) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}api/expressway-toll-rates?populate[0]=expressway_tolls&populate[1]=vehicle_classes&filters[expressway_tolls][id]=${tollFrom}&filters[vehicle_class][id]=${vehicleClass}`
        );

        let rate = 0;
        let dataIds = [parseInt(tollFrom), parseInt(tollTo)];

        data.data.map((itemRate, index) => {
          let idArray = itemRate.attributes.expressway_tolls.data.map(
            (itemToll) => itemToll.id
          );
          if (
            dataIds.every((elem) => idArray.includes(elem)) &&
            dataIds[0] !== dataIds[1]
          ) {
            rate = itemRate.attributes.rate;
          }

          return itemRate;
        });

        return rate;
      } else {
        return 0;
      }
    },
    {
      enabled: false,
    }
  );
};
