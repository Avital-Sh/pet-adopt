import { FormControl, TextField } from "@mui/material";

type Width = "small" | "medium" | "large" | "auto";

interface props {
  label: string;
  width: Width;
  value: string | number | undefined;
  handleChange?: any;
  disabled?: boolean;

}
const getWidth = (width: Width): string => {
  switch (width) {
    case "small": return "5rem"
    case "medium": return "10rem"
    case "large": return "15rem"
    case "auto": return "auto"
  }
  return "10rem";
}


const TextInput = ({ label, width, value, handleChange, disabled = false }: props) => {

  return (<FormControl fullWidth>
    <TextField
      label={label}
      disabled={disabled}
      style={{ width: getWidth(width), flex: "1" }}
      id="demo-simple-select"
      value={value}

      onChange={(e) => handleChange(e)}
    />

  </FormControl>)
}
export default TextInput;