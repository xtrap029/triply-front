import Select from "../ui/Select/Select";
import { TrashIcon } from "@heroicons/react/24/solid";

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

        <Select
          onChange={(event) => props.formChange(event, props.id)}
          name="from"
          value={props.form.from}
          className="block w-full"
        >
          <option value="">Select Expressway</option>
          {props.tolls.map((item, key) => {
            return (
              <option value={item.id} key={key}>
                {item.attributes.name}
              </option>
            );
          })}
        </Select>
      </div>
      <Select
        onChange={(event) => props.formChange(event, props.id)}
        name="fromStation"
        value={props.form.fromStation}
      >
        <option value="">Select Toll Entry</option>
        {props.form.fromStationOptions.map((item, key) => {
          return (
            <option value={item.id} key={key}>
              {item.attributes.name}
            </option>
          );
        })}
      </Select>
      <Select
        onChange={(event) => props.formChange(event, props.id)}
        name="toStation"
        value={props.form.toStation}
      >
        <option value="">Select Toll Exit</option>
        {props.form.fromStationOptions.map((item, key) => {
          return (
            <option value={item.id} key={key}>
              {item.attributes.name}
            </option>
          );
        })}
      </Select>
      <div className="text-3xl text-end mx-5">{props.form.fare || 0}</div>
    </div>
  );
};

export default TollItem;
