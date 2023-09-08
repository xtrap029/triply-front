import Select from "../ui/Select/Select";

const VehicleClass = (props) => {
  return (
    <>
      Vehicle Class
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Select
          name="vehicleClass"
          className="w-full mt-3"
          onChange={(event) => props.vehicleClassChange(event)}
        >
          {props.vehicleClasses.map((item, key) => {
            return (
              <option value={item.id} key={key}>
                {item.attributes.name}
              </option>
            );
          })}
        </Select>
      </div>
    </>
  );
};

export default VehicleClass;
