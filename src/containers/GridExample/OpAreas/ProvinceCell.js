import React, { useEffect, useState } from 'react'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import { getProvinceByCountry } from "./store/provinces";

export default function ProvinceCell({ dataItem, editField, onChange, expandRow }) {
  const [data, setData] = useState([]);
  const inEdit = dataItem[editField];
  const [value, setValue] = useState([...dataItem.provinces]);
  const allSelected = value.length > 0 && value.length === data.length;

  useEffect(() => {
    const data = dataItem.country ? getProvinceByCountry(dataItem.country) : [];

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
          : provinceCellContent(dataItem, expandRow)
      }
    </td>
  )
}

const provinceCellContent = (dataItem, expandRow) => {
  if (!dataItem) {
    return null;
  }

  const displayAll = dataItem.country.provinceCount === dataItem.provinces.length;

  let dataDisplay = dataItem.provinces.slice(0, 3).map(item => item.name).join(', ');
  const showSeeMore = dataItem.provinces.length > 3;

  return (
    <React.Fragment>
      {displayAll && `All (${dataItem.provinces.length})`}

      {!displayAll && dataDisplay}
      {!displayAll && showSeeMore && "..."}
      {!displayAll && showSeeMore && <Button look='flat' onClick={expandRow}>See All</Button>}
    </React.Fragment>
  )
}