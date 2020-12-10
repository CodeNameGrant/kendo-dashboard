import React, { useState, useEffect } from 'react'
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { OperationalAreas as data } from './OperationalAreas';
import CommandCell from './CommandCell';
import CountryCell from './CountryCell';
import ProvinceCell from './ProvinceCell';
import CitiesCell from './CitiesCell';

export default function OperationalAreas() {
  const editField = 'inEdit';

  const [masterData, setMasterData] = useState([...data]);
  const [opAreas, setOpAreas] = useState([]);

  useEffect(() => {
    setOpAreas([...masterData])
  }, [masterData])

  const renderOptionsCell = (props) => {
    return <CommandCell
      {...props}
      editField={editField}
      edit={enterEdit}
      update={update}
      save={save}
      cancel={cancel}
      discard={discard}
      remove={remove}
    />
  }

  const renderCountryCell = (props) => (
    <CountryCell
      {...props}
      editField={editField}
    />
  )

  const renderProvinceCell = (props) => {
    return (
      <ProvinceCell
        {...props}
        editField={editField}
        expandRow={() => expandRow(props)}
      />
    )
  }

  const renderCitiesCell = (props) => {
    return (
      <CitiesCell
        {...props}
        editField={editField}
        expandRow={() => expandRow(props)}
      />
    )
  }

  const enterEdit = (dataItem) => {
    setOpAreas((prevState) => {
      return prevState.map(opArea =>
        opArea.id === dataItem.id ? { ...opArea, inEdit: true } : opArea
      )
    })
  }

  const cancel = (dataItem) => {
    const origOpArea = masterData.find(item => item.id === dataItem.id)

    setOpAreas((prevState) => {
      return prevState.map(opArea =>
        opArea.id === origOpArea.id ? origOpArea : opArea
      )
    })
  }

  const update = (dataItem) => {
    dataItem[editField] = false;
    const index = masterData.findIndex(item => item.id === dataItem.id)
    const updatedOpAreas = [...masterData];
    updatedOpAreas[index] = dataItem;

    setMasterData(updatedOpAreas);
  }

  const add = () => {
    setOpAreas((prevState) => {
      return [
        { inEdit: true, Discontinued: false },
        ...opAreas
      ]
    })
  }

  const save = (dataItem) => {
    setMasterData((prevState) => {
      return [
        { id: Math.random(), ...dataItem, inEdit: false },
        ...prevState
      ];
    })
  }

  const discard = () => {
    setOpAreas((prevState) => prevState.filter(item => item.id !== undefined))
  }

  const remove = (dataItem) => {
    setOpAreas((prevState) => prevState.filter(item => item.id !== dataItem.id))
  }

  const onItemChangeHandler = ({ dataItem, field, value }) => {
    setOpAreas((prevState) => {
      return prevState.map(opArea =>
        opArea.id === dataItem.id ? { ...opArea, [field]: value } : opArea
      )
    })
  }

  const onExpandChangeHandler = ({ dataItem }) => {
    setOpAreas((prevState) => {
      return prevState.map(opArea =>
        opArea.id === dataItem.id ? { ...opArea, expanded: !opArea.expanded } : opArea
      )
    })
  }

  const expandRow = ({ dataItem }) => {
    setOpAreas((prevState) => {
      return prevState.map(opArea =>
        opArea.id === dataItem.id ? { ...opArea, expanded: true } : opArea
      )
    })
  }



  return (
    <div>
      <Grid
        data={opAreas}
        editField={editField}
        onItemChange={onItemChangeHandler}
        expandField='expanded'
        onExpandChange={onExpandChangeHandler}
        detail={DetailTemplate}>
        <GridToolbar>
          <Button primary onClick={() => add()}>Add</Button>
        </GridToolbar>
        <GridColumn field="country.name" title="Country" cell={renderCountryCell} />
        <GridColumn field="provinces" title="Province" cell={renderProvinceCell} />
        <GridColumn field="cities" title="Cities" cell={renderCitiesCell} />
        <GridColumn title="Options" cell={renderOptionsCell} />
      </Grid>
    </div>
  )
}

const DetailTemplate = ({ dataItem }) => (
  <>
    <div><strong>ID:</strong> {dataItem.id}</div>
    <div><strong>Cities:</strong> {dataItem.cities && dataItem.cities.map(item => item.name).join(', ')}</div>
  </>
)