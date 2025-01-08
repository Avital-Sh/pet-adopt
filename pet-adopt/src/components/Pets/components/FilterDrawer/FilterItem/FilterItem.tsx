import SelectInput from '../../../../Form/SelectInput';
import TextInput from '../../../../Form/TextInput';
import * as S from './FilterItem.style';
import { Checkbox } from '@mui/material';

interface Props {
  isSelect: boolean;
  isActive: boolean;
  items?: string[] | number[];
  label: string;
  value: string | number;
  handleChange: (e: any) => void
  checkedToggle: () => void
}

const FilterItem = ({ isActive, isSelect, items, label, value, handleChange, checkedToggle }: Props) => {

  return <S.FilterItemContainer>
    {isSelect ? <SelectInput disabled={!isActive} handleChange={handleChange} width='medium' name={label} value={value} label={label} items={items} />
      : <TextInput disabled={!isActive} label={label} handleChange={handleChange} value={value} width='medium' />}
    <Checkbox checked={isActive} onChange={() => checkedToggle()} />
  </S.FilterItemContainer>
};

export default FilterItem;

