import React, { useState } from 'react'
import { Button } from '@progress/kendo-react-buttons';
import TradeChannelTree from './TradeChannelTree'
import masterTradeChannels from './TradeChannelTree/trade-channels.json';

export default function TradeChannelTreeDemo() {
  const [selectedNode, setSelectedNode] = useState({ id: 12, text: 'test' });

  const onSelectHandler = (node) => {
    console.log('onSelectHandler', node);
    setSelectedNode(node)
  }

  return (
    <React.Fragment>
      <TradeChannelTree
        tradeChannels={masterTradeChannels}
        selectedNode={selectedNode}
        onSelect={onSelectHandler}
        style={{ width: '200px' }}
      />
      <br />
      <fieldset>
        <legend>Change selected node from outside Component</legend>
        <Button onClick={() => setSelectedNode({ id: 1 })}>Select Furniture</Button>
        <Button onClick={() => setSelectedNode({ id: 12 })}>Select Furniture/Sofas</Button>
        <Button onClick={() => setSelectedNode({ id: 231 })}>Select Decor/Carpets/Pursian</Button>
      </fieldset>
    </React.Fragment>
  )
}
