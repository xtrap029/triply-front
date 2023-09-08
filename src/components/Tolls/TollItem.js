import Select from "../ui/Select/Select";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import CountUp from "react-countup";

const TollItem = (props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-3">
      <div className="flex rounded-md shadow-sm">
        {props.id > 0 && (
          <span className="pr-4 inline-flex items-center min-w-fit">
            <TrashIcon
              className="h-6 w-6 cursor-pointer"
              onClick={(event) => props.removeField(event, props.id)}
            />
          </span>
        )}

        {props.id === 0 && (
          <span className="pr-4 inline-flex items-center min-w-fit">
            <PlusIcon
              className="h-6 w-6 cursor-pointer"
              onClick={(event) => props.addField()}
            />
          </span>
        )}

        <Select
          onChange={(event) => props.tollChange(event, props.id)}
          name="from"
          value={props.form.from}
          className="block w-full"
        >
          <option value="">Select Expressway</option>
          {props.tolls.map((item, key) => {
            return (
              <option value={item.id} key={key}>
                {item.attributes.code}
              </option>
            );
          })}
        </Select>
      </div>
      <Select
        onChange={(event) => props.stationChange(event, props.id)}
        name="fromStation"
        value={props.form.fromStation}
      >
        <option value="">Select Toll Entry</option>
        {props.form.options.map((item, key) => {
          return (
            <option value={item.id} key={key}>
              {item.attributes.name}
            </option>
          );
        })}
      </Select>
      <Select
        onChange={(event) => props.stationChange(event, props.id)}
        name="toStation"
        value={props.form.toStation}
      >
        <option value="">Select Toll Exit</option>
        {props.form.options.map((item, key) => {
          return (
            <option value={item.id} key={key}>
              {item.attributes.name}
            </option>
          );
        })}
      </Select>
      <div className="grid grid-cols-2 gap-4">
        <img
          src={props.form.fromLogo}
          className={`rounded-full w-12 p-1 transition-all duration-1000 ${
            props.form.color ? "border-4" : ""
          } border-${props.form.color}-500`}
          alt=""
        />
        <div className="text-4xl text-end">
          <CountUp end={props.form.fare || 0} duration={1} />
        </div>
      </div>
    </div>
  );
};

export default TollItem;
