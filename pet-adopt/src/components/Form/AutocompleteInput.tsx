import { Autocomplete, TextField } from "@mui/material";


interface props {
  items: any[];
  label: string;
  value: any
  setFieldValue?: any;
}


const AutoCompleteInput = ({ items, label, value, setFieldValue }: props) => {

  return (<Autocomplete
    value={{ label: value }}
    disablePortal
    options={items}
    onChange={(_, newInputValue) => {
      console.log(newInputValue)
      setFieldValue("breed", newInputValue?.label || "");
    }}
    renderInput={(params) => <TextField {...params} label={label} />}
  />)
}
export default AutoCompleteInput;