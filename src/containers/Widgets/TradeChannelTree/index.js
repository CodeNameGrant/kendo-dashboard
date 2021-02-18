import React, { useState, useEffect } from 'react'
import { TreeView } from '@progress/kendo-react-treeview'
import { Button } from '@progress/kendo-react-buttons'

import classes from './TradeChannelTree.module.css';

export default function TradeChannelTree({
  tradeChannels: masterTradeChannels,
  selectedNode,
  onSelect,
  style,
}) {
  const [tradeChannels, setTradeChannels] = useState([...masterTradeChannels])

  useEffect(() => {
    const currentlySelectedNode = findNode(tradeChannels, 'selected', true)

    if (selectedNode && (!currentlySelectedNode || currentlySelectedNode.id !== selectedNode.id)) {
      const pathToNode = getPathToNode(tradeChannels, selectedNode);
      const breadcrumbs = pathToNode.splice(0, pathToNode.length - 1)

      setTradeChannels(prevState => mofityTreeNodes(prevState, (item) => {
        item.expanded = breadcrumbs.includes(item.id);
        item.selected = item.id === selectedNode.id
      }));

    }

  }, [selectedNode, tradeChannels])


  const onItemClickHandler = ({ item: itemSelected }) => {
    setTradeChannels(prevState => mofityTreeNodes(prevState, (item) => item.selected = item.id === itemSelected.id));

    if (onSelect) {
      onSelect(itemSelected);
    }
  }

  const onExpandChangeHandler = ({ item: itemExpanded }) => {
    setTradeChannels(prevState => mofityTreeNodes(prevState, (item) => {
      if (item.id === itemExpanded.id) {
        item.expanded = !item.expanded;
      }
    }));
  }


  const toggleExpandAllHandler = (expandAll) => {
    setTradeChannels(prevState => mofityTreeNodes(prevState, (item) => item.expanded = expandAll))
  }

  const clearSelectionHandler = () => {
    setTradeChannels(prevState => mofityTreeNodes(prevState, (item) => item.selected = false))

    if (onSelect) {
      onSelect(null);
    }
  }

  return (
    <div className={classes.Container} style={style}>
      <div className={classes.ActionBar}>
        <Button look={'flat'} icon={'plus-outline'} title={'Expand All'} onClick={() => toggleExpandAllHandler(true)}></Button>
        <Button look={'flat'} icon={'minus-outline'} title={'Collapse All'} onClick={() => toggleExpandAllHandler(false)}></Button>
        <Button look={'flat'} icon={'filter-clear'} title={'Clear Selection'} onClick={clearSelectionHandler}></Button>
      </div>
      <TreeView
        data={tradeChannels}
        textField='text'
        expandIcons={true}
        onExpandChange={onExpandChangeHandler}
        onItemClick={onItemClickHandler} />
    </div>
  )
}



// UTILS

const mofityTreeNodes = (treeNodes, modify) => {
  const nodeArray = [...treeNodes];

  for (let i = 0; i < nodeArray.length; i++) {
    modify(nodeArray[i]);

    if (nodeArray[i].items) {
      mofityTreeNodes(nodeArray[i].items, modify);
    }
  }

  return nodeArray;
};

const getPathToNode = (treeNodes, findNode) => {
  let path = [];

  for (const node of treeNodes) {
    path = [node.id];
    if (node.id === findNode.id) {
      return path;
    }

    if (node.items) {
      const nestedPath = getPathToNode(node.items, findNode);
      if (nestedPath.includes(findNode.id)) {
        return path.concat(nestedPath)
      }
    }
  }

  return path;
}

export const findNode = (array, field, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][field] && array[i][field] === value) {
      return array[i];
    }
    if (array[i].items) {
      let result = findNode(array[i].items, field, value);
      if (result) {
        return result;
      }
    }
  }

  return null;
};
