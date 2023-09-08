import Select from "../ui/Select/Select";

const VehicleClass = (props) => {
  return (
    <>
      <Select
        name="vehicleClass"
        className="w-full mt-3"
        onChange={(event) => props.vehicleClassChange(event)}
      >
        {props.vehicleClasses.map((item, key) => {
          return (
            <option value={item.id} key={key}>
              {item.attributes.name} - {item.attributes.description}
            </option>
          );
        })}
      </Select>
    </>
  );
};

export default VehicleClass;
