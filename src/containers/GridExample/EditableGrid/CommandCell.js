import React from 'react'
import { Button } from '@progress/kendo-react-buttons'

export default function CommandCell({ dataItem, editField, edit, cancel, update, save, discard }) {
  const inEdit = dataItem[editField];
  const isNew = dataItem.ProductID === undefined;

  return (
    <td className='k-command-cell'>
      {!inEdit && <Button primary={true} onClick={() => edit(dataItem)}>Edit</Button>}

      {
        inEdit &&
        (isNew
          ? <Button primary={true} onClick={() => save(dataItem)}>Save</Button>
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
