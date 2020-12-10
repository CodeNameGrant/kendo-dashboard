import React from 'react'
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { countries } from "./OperationalAreas";
export default function DropDownCell({ dataItem, editField, onChange }) {
  const inEdit = dataItem[editField];
  const initialValue = dataItem.country === null ? null : dataItem.country;

  const onChangeHandler = (e) => {
    onChange({
      dataItem,
      field: 'country',
      syntheticEvent: e.syntheticEvent,
      value: e.target.value
    });

    onChange({
      dataItem,
      field: 'province',
      syntheticEvent: e.syntheticEvent,
      value: null
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
            data={countries}
            dataItemKey='id'
            textField='name'
            placeholder={'Select a Country...'}
            value={initialValue}
            onChange={onChangeHandler}
          />
          : dataItem.country.name
      }
    </td>
  )
}
