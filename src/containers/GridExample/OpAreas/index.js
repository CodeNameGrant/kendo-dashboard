import React, { useState, useEffect } from 'react'
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { OperationalAreas } from './store/operational-areas';
import CommandCell from './CommandCell';
import CountryCell from './CountryCell';
import ProvinceCell from './ProvinceCell';
import CitiesCell from './CitiesCell';

export default function OperationalAreasPoc() {
  const editField = 'inEdit';

  const [remoteData, setRemoteData] = useState([...OperationalAreas]);
  const [localData, setLocalData] = useState([]);
  const [showConfirmWindow, setShowConfirmWindow] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    setLocalData([...remoteData])
  }, [remoteData])

  const renderOptionsCell = (props) => {
    return <CommandCell
      {...props}
      editField={editField}
      edit={enterEdit}
      update={update}
      save={save}
      cancel={cancel}
      discard={discard}
      remove={confirmRemoval}
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

  // For New Record
  const add = () => {
    setLocalData((prevState) => {
      return [
        { country: null, provinces: [], cities: [], inEdit: true },
        ...localData
      ]
    })
  }

  const save = (dataItem) => {
    setRemoteData((prevState) => {
      return [
        { id: Math.random(), ...dataItem, inEdit: false },
        ...prevState
      ];
    })
  }

  const discard = () => {
    setLocalData((prevState) => prevState.filter(item => item.id !== undefined))
  }

  // For Existing Record
  const enterEdit = (dataItem) => {
    setLocalData((prevState) => {
      return prevState.map(opArea =>
        opArea.id === dataItem.id ? { ...opArea, inEdit: true } : opArea
      )
    })
  }

  const update = (dataItem) => {
    dataItem[editField] = false;
    const index = remoteData.findIndex(item => item.id === dataItem.id)
    const updatedOpAreas = [...remoteData];
    updatedOpAreas[index] = dataItem;

    setRemoteData(updatedOpAreas);
  }

  const cancel = (dataItem) => {
    const origOpArea = remoteData.find(item => item.id === dataItem.id)

    setLocalData((prevState) => {
      return prevState.map(opArea =>
        opArea.id === origOpArea.id ? origOpArea : opArea
      )
    })
  }

  const remove = (dataItem) => {
    setRemoteData((prevState) => prevState.filter(item => item.id !== dataItem.id))
  }

  const onItemChangeHandler = ({ dataItem, field, value }) => {
    setLocalData((prevState) => {
      return prevState.map(opArea =>
        opArea.id === dataItem.id ? { ...opArea, [field]: value } : opArea
      )
    })
  }

  const onExpandChangeHandler = ({ dataItem }) => {
    setLocalData((prevState) => {
      return prevState.map(opArea =>
        opArea.id === dataItem.id ? { ...opArea, expanded: !opArea.expanded } : opArea
      )
    })
  }

  const expandRow = ({ dataItem }) => {
    setLocalData((prevState) => {
      return prevState.map(opArea =>
        opArea.id === dataItem.id ? { ...opArea, expanded: true } : opArea
      )
    })
  }

  const confirmRemoval = (dataItem) => {
    setItemToRemove(dataItem);
    setShowConfirmWindow(true);
  }

  return (
    <div>
      <Grid
        data={localData}
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

      {
        showConfirmWindow &&
        <Dialog title={'Remove Op Area'} onClose={() => setShowConfirmWindow(false)}>
          <p>Are you sure you wish to remove this Op Area?</p>
          <p>TODO</p>
          <DialogActionsBar>
            <Button
              primary={true}
              onClick={() => {
                remove(itemToRemove);
                setShowConfirmWindow(false);
              }}
            >Yes</Button>

            <Button
              look={'flat'}
              onClick={() => {
                setShowConfirmWindow(false);
                setItemToRemove(null);
              }}
            >No</Button>
          </DialogActionsBar>
        </Dialog>
      }
    </div>
  )
}

const DetailTemplate = ({ dataItem }) => (
  <>
    <div><strong>ID:</strong> {dataItem.id}</div>
    <div><strong>Cities:</strong> {dataItem.cities && dataItem.cities.map(item => item.name).join(', ')}</div>
  </>
)