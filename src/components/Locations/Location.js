import { useState, useEffect } from "react";

import LocationItem from "./LocationItem";

import { useProvincesData } from "../../hooks/useProvincesData";
import { useCitiesData } from "../../hooks/useCitiesData";

const Location = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState({
    from: [],
    to: [],
  });
  const [formLocation, setFormLocation] = useState({
    fromProvince: "",
    fromCity: "",
    toProvince: "",
    toCity: "",
    currentProvince: "",
    currentProvinceDropdown: "",
  });

  const { data: provincesData, isLoading: provincesIsLoading } =
    useProvincesData();
  const { data: citiesData, refetch: citiesRefetch } = useCitiesData(
    formLocation.currentProvince
  );

  useEffect(() => {
    if (!provincesIsLoading) {
      setProvinces(provincesData.sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, [provincesData, provincesIsLoading]);

  useEffect(() => {
    citiesRefetch();
  }, [formLocation.currentProvince, citiesRefetch]);

  useEffect(() => {
    if (citiesData !== undefined) {
      setCities((prev) => ({
        from:
          formLocation.currentProvinceDropdown === "fromProvince"
            ? citiesData
            : prev.from,
        to:
          formLocation.currentProvinceDropdown === "toProvince"
            ? citiesData
            : prev.to,
      }));
    }
  }, [citiesData, formLocation.currentProvinceDropdown]);

  const formLocationChangeHandler = (event) => {
    setFormLocation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      currentProvince:
        (event.target.name === "fromProvince" ||
          event.target.name === "toProvince") &&
        event.target.value,
      currentProvinceDropdown:
        (event.target.name === "fromProvince" ||
          event.target.name === "toProvince") &&
        event.target.name,
    }));
  };

  if (provincesIsLoading) return <>Loading...</>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        From
        <div className="grid grid-cols-2 gap-4 mt-3">
          <LocationItem
            provinceName="fromProvince"
            provinces={provinces}
            cityName="fromCity"
            cities={cities.from}
            formLocation={formLocation.fromProvince}
            formLocationChange={formLocationChangeHandler}
          />
        </div>
      </div>
      <div>
        To
        <div className="grid grid-cols-2 gap-4 mt-3">
          <LocationItem
            provinceName="toProvince"
            provinces={provinces}
            cityName="toCity"
            cities={cities.to}
            formLocation={formLocation.toProvince}
            formLocationChange={formLocationChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
