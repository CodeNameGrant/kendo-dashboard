import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { Button } from '@progress/kendo-react-buttons'
import { savePDF } from '@progress/kendo-react-pdf';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';

import DonutChart from '../../components/DonutChart';
import BarChart from '../../components/BarChart';
import ProductsGrid from '../../components/ProductsGrid';
import MyPanelBar from '../../components/MyPanelBar';

import '@progress/kendo-theme-material/dist/all.css'
import 'bootstrap-4-grid/css/grid.min.css';
import './Dashboard.css';

/* Create from: https://www.telerik.com/blogs/lets-build-a-sales-dashboard-with-react
*/
const Dashboard = () => {

  let dashboardContainer = React.createRef();
  const pdfExportHandler = () => {
    savePDF(ReactDOM.findDOMNode(dashboardContainer), { paperSize: 'auto' });
  }

  const [showShareDialog, setShowSharDialog] = useState(false);
  const toggleShareDialog = () => setShowSharDialog(!showShareDialog);

  return (
    <div className="bootstrap-wrapper">
      <div className="app-container container" ref={(el) => dashboardContainer = el}>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <h1>Sales | Q4 2018</h1>
          </div>

          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 buttons-right">
            <Button primary onClick={toggleShareDialog}>Share</Button>
            <Button onClick={pdfExportHandler}>Export to PDF</Button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
            <MyPanelBar />
          </div>

          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                <DonutChart />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                <div className="percentage-container">
                  <span className="percentage-number">94</span>
                  <span className="percentage-sign">%</span>
                  <p>CUSTOMER SATISFACTION</p>
                </div>

                <div className="percentage-container">
                  <span className="percentage-number">89</span>
                  <span className="percentage-sign">%</span>
                  <p>TARGET SALES</p>
                </div>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <BarChart />
              </div>

            </div>

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <ProductsGrid />
              </div>
            </div>

          </div>
        </div>

        {showShareDialog &&
          <Dialog
            title='Share this Report'
            onClose={toggleShareDialog}
          >
            <p>Please enter the email address/es of the recipients of the this report.</p>
            <Input placeholder="test@example.com" />

            <DialogActionsBar>
              <Button primary onClick={toggleShareDialog}>Share</Button>
              <Button onClick={toggleShareDialog}>Cancel</Button>
            </DialogActionsBar>
          </Dialog>
        }
      </div>
    </div>
  );
}

export default Dashboard;