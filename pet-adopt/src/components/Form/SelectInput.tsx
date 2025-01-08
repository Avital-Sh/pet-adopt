import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type Width = "small" | "medium" | "large" | "fill";

interface props {
  items: string[] | number[] | undefined;
  label: string;
  width: Width;
  height?: string;
  name: string;
  value: any
  disabled?: boolean;
  handleChange?: any;
  error?: boolean
}
const getWidth = (width: Width): string => {
  switch (width) {
    case "small": return "5rem"
    case "medium": return "10rem"
    case "large": return "15rem"
    case "fill": return "-webkit-fill-available"
  }
  return "10rem";
}


const SelectInput = ({ items, label, width, name, value, handleChange, error, disabled = false, height }: props) => {

  return (<FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select
      disabled={disabled}
      error={error}
      name={name}
      style={{ width: getWidth(width), ...(height && { height: height }) }}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label={label}
      onChange={(e) => {
        console.log(e);
        handleChange(e);
      }}
    >
      {items?.map((item) =>
        <MenuItem value={item}>{item}</MenuItem>)}

    </Select>
  </FormControl>)
}
export default SelectInput;