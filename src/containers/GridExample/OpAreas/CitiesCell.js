import React, { useEffect, useState } from 'react'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { findCities } from "./store/cities";
import { Button } from '@progress/kendo-react-buttons';
import { getProvinceIds } from './store/provinces';
import { validateCitiesAndProvinces } from './utils';

export default function CitiesCell({ dataItem, editField, onChange, expandRow }) {
  const [data, setData] = useState([])
  const inEdit = dataItem[editField];
  const [value, setValue] = useState([...dataItem.cities]);
  const allSelected = value.length > 0 && value.length === data.length;

  useEffect(() => {
    setData(findCities('province', ...getProvinceIds(dataItem.provinces)))
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
          ? (
            <React.Fragment>
              <MultiSelect
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
              {
                !validateCitiesAndProvinces(dataItem) &&
                <span style={{ color: 'red', fontSize: '0.75rem' }}>At least one city from each province must be selected.</span>
              }
            </React.Fragment>
          )
          : cityCellContent(dataItem, expandRow)
      }
    </td>
  )
}

const cityCellContent = (dataItem, expandRow) => {
  if (!dataItem) {
    return null;
  }

  const totalCityCount = dataItem.provinces.reduce((total, province) => { return total + province.cityCount }, 0);
  const displayAll = totalCityCount === dataItem.cities.length;

  let dataDisplay = dataItem.cities.slice(0, 3).map(item => item.name).join(', ');
  const showSeeMore = dataItem.cities.length > 3;

  return (
    <React.Fragment>
      {displayAll && `All (${dataItem.cities.length})`}

      {!displayAll && dataDisplay}
      {!displayAll && showSeeMore && "..."}
      {!displayAll && showSeeMore && <Button look='flat' onClick={expandRow}>See All</Button>}
    </React.Fragment>
  )
}