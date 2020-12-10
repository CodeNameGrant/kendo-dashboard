import React from 'react';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';

import { teammates, salesReports } from '../store/app-data';

const imageUrl = (imageName) => (`img/${imageName}.jpg`);

const MyPanelBar = (props) => (
  <PanelBar>
    <PanelBarItem expanded title='My Teammates'>
      <div>
        {teammates.map((item, idx) => (
          <div className={idx === 0 ? 'teammate k-state-selected' : 'teammate'} id={item.firstName + ' ' + item.lastName} key={idx}>
            {/* <img src={imageUrl(item.firstName)} alt={item.firstName + ' ' + item.lastName} /> */}
            <span className="mate-info">
              <h2>{item.firstName + ' ' + item.lastName}</h2>
              <p>{item.position}</p>
            </span>
          </div>
        ))}
      </div>
    </PanelBarItem>

    <PanelBarItem title={'Projects'} >
      <PanelBarItem title={'Sales Reports'} >
        {salesReports.map((item, idx) => (
          <PanelBarItem title={item.title} key={idx} />
        ))}
      </PanelBarItem>
    </PanelBarItem>

    <PanelBarItem title="Communication" disabled={true} />
  </PanelBar>
)

export default MyPanelBar;