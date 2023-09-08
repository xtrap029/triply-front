import Select from "../ui/Select/Select";

const LocationItem = (props) => {
  return (
    <>
        <Select
          name={props.provinceName}
          className="block w-full"
          onChange={(event) => props.formLocationChange(event)}
        >
          <option value="">Province</option>
          {props.provinces.map((item, key) => (
            <option value={item.code} key={key}>
              {item.name}
            </option>
          ))}
        </Select>
      <Select
        name={props.cityName}
        className="block w-full"
        onChange={(event) => props.formLocationChange(event)}
      >
        <option value="">City</option>
        {props.cities.map((item, key) => (
          <option value={item.code} key={key}>
            {item.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default LocationItem;
