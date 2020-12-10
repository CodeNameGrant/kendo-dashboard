import React, { useState } from 'react'

import { TreeView } from '@progress/kendo-react-treeview';


export default function TreeExample() {

  const [data, setData] = useState([
    {
      id: 1,
      text: 'Furniture',
      expanded: true,
      items: [
        { text: 'Tables & Chairs' }, { text: 'Sofas' }, { text: 'Occasional Furniture' }
      ]
    },
    {
      id: 2,
      text: 'Decor',
      items: [
        { text: 'Bed Linen' }, { text: 'Curtains & Blinds' }, { text: 'Carpets' }
      ]
    }
  ])

  const onExpandChangeHandler = (e) => {
    const updatedData = [...data];
    const item = updatedData.find(itm => itm.id === e.item.id);
    item.expanded = !item.expanded;

    setData(updatedData);
  }

  return (
    <div>
      <TreeView
        data={data}
        expandIcons={true}
        onExpandChange={onExpandChangeHandler}
      />
    </div>
  )
}
