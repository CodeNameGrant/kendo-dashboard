import React from 'react'
import { Button } from '@progress/kendo-react-buttons'

export default function CommandCell({ dataItem, editField, edit, cancel, update, save, discard, remove }) {
  const inEdit = dataItem[editField];
  const isNew = dataItem.id === undefined;

  return (
    <td className='k-command-cell'>
      {!inEdit && (
        <React.Fragment>
          <Button primary={true} onClick={() => edit(dataItem)}>Edit</Button>
          <Button primary={true} onClick={() => remove(dataItem)}>Delete</Button>
        </React.Fragment>
      )}

      {
        inEdit &&
        (isNew
          ? <Button primary={true} onClick={() => save(dataItem)} disabled={!dataItem.country || !dataItem.province || dataItem.cities.length === 0}>Save</Button>
          : <Button primary={true} onClick={() => update(dataItem)}>Update</Button>)
      }

      {
        inEdit &&
        (isNew
          ? <Button onClick={() => discard()}>Discard</Button>
          : <Button onClick={() => cancel(dataItem)}>Cancel</Button>)
      }
    </td>
  )
}
