import React from 'react';

import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Layout from './hoc/Layout';

import Dashboard from './containers/Dashboard';
import GridExample from './containers/GridExample';
import Form from './containers/MyForm';
import TreeExample from './containers/TreeExample';
import Widgets from './containers/Widgets';

import '@progress/kendo-theme-material/dist/all.css'
import 'bootstrap-4-grid/css/grid.min.css';
import './App.css';

const App = () => {

  return (
    <Layout>
      <Switch>
        <Route path="/grids" component={GridExample} />
        <Route path="/forms" component={Form} />
        <Route path="/tree" component={TreeExample} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/widgets" component={Widgets} />
        <Redirect to='/widgets' />
      </Switch>
    </Layout>
  );

}

export default withRouter(App);

