import React, { useEffect } from 'react'
import { TreeView } from '@progress/kendo-react-treeview'
import { Button } from '@progress/kendo-react-buttons'

import classes from './TradeChannelTree.module.css';

export default function TradeChannelTree({
  tradeChannels,
  setTradeChannels,
  onSelect,
  style,
  selectedNode
}) {

  useEffect(() => {
    selectedNode && setTradeChannels(prevState => mofityTreeNodes(prevState, (item) => {
      if (selectedNode === item.id) {
        item.selected = true;
      }
    }))
  }, [selectedNode, setTradeChannels]);

  const onExpandChangeHandler = ({ item }) => {
    const node = findNodeById(tradeChannels, item.id);
    if (node) {
      node.expanded = !node.expanded;
    }
  }

  const onItemClickHandler = ({ item }) => {
    deselectAllNodes(tradeChannels);

    const node = findNodeById(tradeChannels, item.id);
    if (node) {
      node.selected = true;
    }

    if (onSelect) {
      onSelect(item);
    }
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

export const findNodeById = (array, id) => {
  return findNode(array, "id", id);
};

export const deselectAllNodes = (tree) => {
  for (let i = 0; i < tree.length; i++) {
    tree[i].selected = false;
    if (tree[i].items) {
      deselectAllNodes(tree[i].items);
    }
  }

  return tree;
};