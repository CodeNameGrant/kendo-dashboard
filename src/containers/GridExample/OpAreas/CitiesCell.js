import React, { useEffect, useState } from 'react'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { cities } from "./OperationalAreas";
import { Button } from '@progress/kendo-react-buttons';
import { cellDisplay } from './utils';

export default function CitiesCell({ dataItem, editField, onChange, expandRow }) {
  const [data, setData] = useState([])
  const inEdit = dataItem[editField];
  const initialValue = !dataItem.cities ? [] : dataItem.cities;
  const [value, setValue] = useState([...initialValue]);
  const allSelected = value.length > 0 && value.length === data.length;

  useEffect(() => {
    const allCities = dataItem.provinces.reduce((data, province) => {
      return data.concat(cities[province.id]);
    }, [])

    setData(allCities)
  }, [dataItem.provinces])

  const updateCities = (e) => {
    onChange({
      dataItem,
      field: 'cities',
      syntheticEvent: e.syntheticEvent,
      value: e.target.value
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
            disabled={dataItem.provinces.length === 0}
            onClose={updateCities}
            onChange={updateCities}
            placeholder="Select Cities..."
            tags={allSelected ?
              [{ text: `All (${value.length})`, data: [...data] }] : undefined
            }
          />
          : cellDisplay(dataItem.cities, expandRow)
      }
    </td>
  )
}
