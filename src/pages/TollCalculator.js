// load recommendations on location change
// loading component
// mobile: toll total sticky bottom

import { useState, useEffect } from "react";
import Button from "../components/ui/Button/Button";
import Card from "../components/ui/Card/Card";
import Title from "../components/ui/Text/Title";
import CountUp from "react-countup";
import {
  BeakerIcon,
  RectangleStackIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";

import Location from "../components/Locations/Location";
import TollItem from "../components/Tolls/TollItem";
import VehicleClass from "../components/VehicleClasses/VehicleClass";

import { useVehicleClassesData } from "../hooks/useVehicleClassesData";
import { useTollsData } from "../hooks/useTollsData";
import { useTollRatesData } from "../hooks/useTollRatesData";

const initialFormFields = {
  from: "",
  fromLogo: "",
  fromStation: "",
  toStation: "",
  options: [],
  color: "",
  distance: 0,
  fare: 0,
};

const initialCurrentFormFields = {
  vehicleClass: "",
  fromStation: "",
  toStation: "",
  index: 0,
};

const initialFetchRates = {
  vehicleClass: "",
  fromStation: "",
  toStation: "",
  index: 0,
  totalDistance: 0,
  total: 0,
};

const TollCalculator = () => {
  const [tollMode, setTollMode] = useState(null);

  const [formFields, setFormFields] = useState([{ ...initialFormFields }]);

  const [fetchRates, setFetchRates] = useState({ ...initialFetchRates });
  const [currentFormField, setCurrentFormField] = useState({
    ...initialCurrentFormFields,
  });
  const [vehicleClass, setVehicleClass] = useState("");

  const { data: vehicleClassesData, isLoading: vehicleClassesIsLoading } =
    useVehicleClassesData();
  const { data: tollsData, isLoading: tollsIsLoading } = useTollsData();
  const { data: tollRatesData, refetch: tollRatesRefetch } = useTollRatesData(
    currentFormField.vehicleClass,
    currentFormField.fromStation,
    currentFormField.toStation
  );

  const vehicleClassChangeHandler = (event) => {
    setVehicleClass(event.target.value);
    setFormFields([{ ...initialFormFields }]);
  };

  const tollChangeHandler = (event, index) => {
    let data = [...formFields];
    data[index]["from"] = event.target.value;

    if (event.target.value !== "") {
      let filteredTollData = tollsData.filter((item) => {
        return item.id === parseInt(event.target.value);
      })[0];

      data[index]["options"] =
        filteredTollData.attributes.expressway_tolls.data;

      data[index]["color"] = filteredTollData.attributes.color;
      data[index]["fromLogo"] =
        process.env.REACT_APP_STRAPI_URL_NOSLASH +
        filteredTollData.attributes.rfid.data.attributes.logo.data.attributes
          .url;
    } else {
      data[index]["fromStationOptions"] = [];
    }

    data[index]["fromStation"] = "";
    data[index]["toStation"] = "";
    data[index]["distance"] = 0;
    data[index]["fare"] = 0;
    setFormFields(data);
  };

  const stationChangeHandler = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);

    if (vehicleClass === "") {
      setVehicleClass(vehicleClassesData[0].id);
    }

    setCurrentFormField((prev) => ({
      ...initialCurrentFormFields,
      vehicleClass: vehicleClass,
      fromStation: data[index]["fromStation"],
      toStation: data[index]["toStation"],
      index: index,
    }));
  };

  const addFieldHandler = () => {
    setFormFields((prev) => [...prev, { ...initialFormFields }]);
  };

  const removeFieldHandler = (event, index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const calculateTotalRateHandler = () => {
    let totalRate = 0;
    let ratesArray = formFields.map((item) => item.fare);
    ratesArray.map((x) => (totalRate += x ? x : 0));

    let totalDistance = 0;
    let distancesArray = formFields.map((item) => item.distance);
    distancesArray.map((x) => (totalDistance += x ? x : 0));

    setFetchRates((prev) => ({
      ...prev,
      totalDistance: totalDistance,
      total: totalRate,
    }));
  };

  // refetch rate if from/to is changed
  useEffect(() => {
    tollRatesRefetch();
  }, [currentFormField, tollRatesRefetch]);

  // add rate to current field index if tollratesdata is done fetching
  useEffect(() => {
    if (tollRatesData !== undefined) {
      let data = [...formFields];
      data[currentFormField.index]["distance"] = tollRatesData.distance;
      data[currentFormField.index]["fare"] = tollRatesData.rate;
      setFormFields(data);
    }
  }, [tollRatesData]);

  // recalculate total if formfields are changed
  useEffect(() => {
    calculateTotalRateHandler();
  }, [formFields]);

  if (tollsIsLoading || vehicleClassesIsLoading) return <>Loading...</>;
  return (
    <>
      <Title>Toll Calculator</Title>
      <Card className="mb-10">
        <div className="grid lg:grid-cols-2 gap-4">
          <Button
            variant="gray"
            size="lg"
            className={`w-full ${tollMode === 0 && "active"}`}
            onClick={() => setTollMode(0)}
          >
            <BeakerIcon className="h-5 w-5 mr-3" /> Do it yourself
          </Button>
          <Button
            variant="gray"
            size="lg"
            className={`w-full ${tollMode === 1 && "active"}`}
            onClick={() => setTollMode(1)}
          >
            <RectangleStackIcon className="h-5 w-5 mr-3" /> Use community guides
          </Button>
        </div>
      </Card>
      {tollMode === 0 && (
        <Card className="relative">
          <VehicleClass
            vehicleClassChange={vehicleClassChangeHandler}
            vehicleClasses={vehicleClassesData}
          />
          <div className="mt-5">
            {formFields.map((form, index) => (
              <TollItem
                key={index}
                id={index}
                addField={addFieldHandler}
                tollChange={tollChangeHandler}
                stationChange={stationChangeHandler}
                removeField={removeFieldHandler}
                form={form}
                tolls={tollsData}
              />
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="flex items-end">
              {fetchRates.totalDistance > 0 && (
                <Button variant="gray" size="lg" className="mr-3">
                  <ShareIcon className="h-5 w-5 mr-3" /> Share template
                </Button>
              )}
            </div>
            <div className="text-end">
              <CountUp
                className="font-semibold text-5xl lg:text-7xl text-stone-400"
                end={fetchRates.totalDistance}
                duration={1}
              />
              <span className="text-3xl text-stone-400 mr-3">km</span>
              <CountUp
                className="font-semibold text-6xl lg:text-8xl"
                end={fetchRates.total}
                duration={1}
              />
              <span className="text-3xl">fee</span>
            </div>
            <div className="flex w-full position-absolute absolute bottom-0 left-0">
              {formFields.map((form, index) => (
                <div
                  key={index}
                  className={`py-1 bg-${form.color}-500 border-2 border-stone-900 transition-all duration-1000`}
                  style={{
                    width: form.distance
                      ? `${form.distance / (fetchRates.totalDistance * 0.01)}%`
                      : `0%`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </Card>
      )}
      {tollMode === 1 && (
        <Card>
          <Location />
        </Card>
      )}
    </>
  );
};

export default TollCalculator;
