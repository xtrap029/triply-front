// bug fix, change rate, add, change rate, add, remove
// save toll profile
// load recommendations on location change
// loading component
// mobile: toll total sticky bottom

import { useState, useEffect } from "react";
import Button from "../components/ui/Button/Button";
import Card from "../components/ui/Card/Card";
import Title from "../components/ui/Text/Title";
import CountUp from "react-countup";
import { PlusIcon } from "@heroicons/react/24/solid";

import Location from "../components/Locations/Location";
import TollItem from "../components/Tolls/TollItem";
import VehicleClass from "../components/VehicleClasses/VehicleClass";

import { useVehicleClassesData } from "../hooks/useVehicleClassesData";
import { useTollsData } from "../hooks/useTollsData";
import { useTollRatesData } from "../hooks/useTollRatesData";

const initialFetchRates = {
  vehicleClass: "",
  fromStation: "",
  toStation: "",
  index: 0,
  total: 0,
};

const initialFormFields = {
  from: "",
  fromStation: "",
  fromStationOptions: [],
  toStation: "",
  fare: 0,
};

const TollCalculator = () => {
  const [fetchRates, setFetchRates] = useState({ ...initialFetchRates });
  const [formFields, setFormFields] = useState([{ ...initialFormFields }]);
  const [vehicleClass, setVehicleClass] = useState("");

  const { data: vehicleClassesData, isLoading: vehicleClassesIsLoading } =
    useVehicleClassesData();
  const { data: tollsData, isLoading: tollsIsLoading } = useTollsData();
  const { data: tollRatesData, refetch: tollRatesRefetch } = useTollRatesData(
    fetchRates.vehicleClass,
    fetchRates.fromStation,
    fetchRates.toStation
  );

  const vehicleClassChangeHandler = (event) => {
    setVehicleClass(event.target.value);
    setFetchRates({ ...initialFetchRates });
    setFormFields([{ ...initialFormFields }]);
  };

  const formChangeHandler = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);

    if (event.target.name === "from") {
      if (event.target.value !== "") {
        data[index]["fromStationOptions"] = tollsData.filter((item) => {
          return item.id === parseInt(event.target.value);
        })[0].attributes.expressway_tolls.data;
      } else {
        data[index]["fromStationOptions"] = [];
      }
      data[index]["fromStation"] = "";
      data[index]["toStation"] = "";
      data[index]["fare"] = 0;
    } else {
      if (vehicleClass === "") {
        setVehicleClass(vehicleClassesData[0].id);
      }
      setFetchRates((prev) => ({
        ...prev,
        vehicleClass: vehicleClass,
        fromStation: data[index]["fromStation"],
        toStation: data[index]["toStation"],
        index: index,
      }));
    }
  };

  useEffect(() => {
    if (
      fetchRates.fromStation &&
      fetchRates.toStation &&
      fetchRates.vehicleClass
    ) {
      tollRatesRefetch(
        fetchRates.vehicleClass,
        fetchRates.fromStation,
        fetchRates.toStation
      );
    }
  }, [fetchRates, tollRatesRefetch]);

  useEffect(() => {
    if (tollRatesData !== "undefined") {
      let data = [...formFields];
      data[fetchRates.index]["fare"] = tollRatesData;

      let totalRate = 0;
      let ratesArray = formFields.map((item) => item.fare);
      ratesArray.map((x) => (totalRate += x));
      setFetchRates((prev) => ({
        ...prev,
        total: totalRate,
      }));
    }
  }, [tollRatesData, formFields, fetchRates.index]);

  const addFieldsHandler = () => {
    setFormFields((prev) => [...prev, { ...initialFormFields }]);
  };

  const removeFieldsHandler = (event, index) => {
    let data = [...formFields];
    let totalFareReduction = data[index].fare;

    data.splice(index, 1);
    setFormFields(data);

    setFetchRates((prev) => ({
      ...initialFetchRates,
      vehicleClass: prev.vehicleClass,
      total: prev.total - totalFareReduction,
    }));
  };

  if (tollsIsLoading || vehicleClassesIsLoading) return <>Loading...</>;

  return (
    <>
      <Title>Location</Title>
      <Card>
        <Location />
      </Card>
      <Title className="mt-10">Vehicle Class</Title>
      <Card>
        <VehicleClass
          vehicleClassChange={vehicleClassChangeHandler}
          vehicleClasses={vehicleClassesData}
        />
      </Card>
      <Title className="mt-10">Tolls</Title>
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-3">
          <Button variant="outline" onClick={addFieldsHandler} className="mb-3">
            <PlusIcon className="h-5 w-5 mr-3" /> Add
          </Button>
        </div>
        {formFields.map((form, index) => (
          <TollItem
            key={index}
            id={index}
            formChange={formChangeHandler}
            removeField={removeFieldsHandler}
            form={form}
            tolls={tollsData}
          />
        ))}
      </Card>
      <div className="text-end">
        <span className="text-3xl">Total</span>
        <CountUp
          className="text-yellow-500 font-semibold text-9xl"
          end={fetchRates.total}
          duration={1}
        />
      </div>
    </>
  );
};

export default TollCalculator;
