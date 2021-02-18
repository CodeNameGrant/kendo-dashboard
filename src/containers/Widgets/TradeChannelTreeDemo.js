import React, { useState } from 'react'
import TradeChannelTree from './TradeChannelTree'
import masterData from './TradeChannelTree/trade-channels.json';

export default function TradeChannelTreeDemo() {
  const [tradeChannels, setTradeChannels] = useState(masterData);

  const onSelectHandler = (item) => {
    console.log('onSelectHandler', item);
  }

  console.log('tradeChannels', tradeChannels);


  return (
    <TradeChannelTree
      tradeChannels={tradeChannels}
      setTradeChannels={setTradeChannels}
      onSelect={onSelectHandler}
      width={'200px'}
      height={'300px'} />
  )
}


// Utils
