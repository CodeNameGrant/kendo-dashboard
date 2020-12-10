import React, { useEffect, useState } from 'react'
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import { provinces } from "./OperationalAreas";

export default function DropDownCell({ dataItem, editField, onChange, expandRow }) {
  const [data, setData] = useState([]);
  const inEdit = dataItem[editField];
  const initialValue = !dataItem.province ? [] : dataItem.province;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const data = dataItem.country ? provinces[dataItem.country.id] : [];

    setData(data)
  }, [dataItem.country]);

  const onChangeHandler = (e) => {
    onChange({
      dataItem,
      field: 'province',
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
          ? <ComboBox
            footer={<Button onClick={() => setValue(provinces[dataItem.country.id])}>Select All</Button>}
            data={data}
            dataItemKey='id'
            textField='name'
            value={value}
            disabled={!dataItem.country}
            onChange={onChangeHandler}
            placeholder="Select Provinces..."
          />
          : dataItem.province.name
      }
    </td>
  )
}
