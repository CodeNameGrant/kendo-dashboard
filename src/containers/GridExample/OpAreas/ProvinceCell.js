import React, { useEffect, useState } from 'react'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import { provinces } from "./OperationalAreas";
import { cellDisplay } from './utils';

export default function DropDownCell({ dataItem, editField, onChange, expandRow }) {
  const [data, setData] = useState([]);
  const inEdit = dataItem[editField];
  const initialValue = !dataItem.provinces ? [] : dataItem.provinces;
  const [value, setValue] = useState(initialValue);
  const allSelected = value.length > 0 && value.length === data.length;

  useEffect(() => {
    const data = dataItem.country ? provinces[dataItem.country.id] : [];

    setData(data)
  }, [dataItem.country]);

  const updateProvinces = (e) => {
    onChange({
      dataItem,
      field: 'provinces',
      syntheticEvent: e.syntheticEvent,
      value: e.target.value
    });

    onChange({
      dataItem,
      field: 'cities',
      syntheticEvent: e.syntheticEvent,
      value: []
    });
  }

  return (
    <td>
      {
        inEdit
          ? <MultiSelect
            footer={<Button onClick={() => setValue([...data])}>Select All</Button>}
            data={data}
            dataItemKey='id'
            textField='name'
            value={value}
            disabled={!dataItem.country}
            onClose={updateProvinces}
            onChange={updateProvinces}
            placeholder="Select Provinces..."
            tags={allSelected ?
              [{ text: `All (${value.length})`, data: [...data] }] : undefined
            }
          />
          : cellDisplay(dataItem.provinces)
      }
    </td>
  )
}
