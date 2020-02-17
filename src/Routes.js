import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  NotFound as NotFoundView,

  StockStatusAL,
  StockStatusAS,
  StockStatusSP,
  StockStatusRDT,
  StockStatusAll,

  RRSummary,
  RRFacility,
  RRSubcounty,

  DQConsistency,
  DQConcordance,
  DQCompleteness,
  DQComparison,

  SCSummary,
  SCTrends,

  NatSummary,
  NatIssuesR,
  NatPendingShip,
  NatCommodities
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout component={DashboardView} exact layout={MainLayout} path="/dashboard" />
      <RouteWithLayout component={UserListView} exact layout={MainLayout} path="/users" />    {/* remove this */}

      {/*  Stock status  */}
      <RouteWithLayout component={StockStatusAL} exact layout={MainLayout} path="/ss" /> 
      <RouteWithLayout component={StockStatusAL} exact layout={MainLayout} path="/stockstatus" />
      <RouteWithLayout component={StockStatusAL} exact layout={MainLayout} path="/ss/al" />
      <RouteWithLayout component={StockStatusAS} exact layout={MainLayout} path="/ss/as" />
      <RouteWithLayout component={StockStatusSP} exact layout={MainLayout} path="/ss/sp" />
      <RouteWithLayout component={StockStatusRDT} exact layout={MainLayout} path="/ss/rdt" />
      <RouteWithLayout component={StockStatusAll} exact layout={MainLayout} path="/ss/all" />
      {/*  Stock status  */}

      {/*  Data quality  */}
      <RouteWithLayout component={DQCompleteness} exact layout={MainLayout} path="/dq" />
      <RouteWithLayout component={DQCompleteness} exact layout={MainLayout} path="/dq/completeness" />
      <RouteWithLayout component={DQConcordance} exact layout={MainLayout} path="/dq/concordance" />
      <RouteWithLayout component={DQConsistency} exact layout={MainLayout} path="/dq/consistency" />
      <RouteWithLayout component={DQComparison} exact layout={MainLayout} path="/dq/comparison" />
      {/*  Data quality  */}

      {/*  Reporting rate  */}
      <RouteWithLayout component={RRSummary} exact layout={MainLayout} path="/rr" />
      <RouteWithLayout component={RRSummary} exact layout={MainLayout} path="/rr/summary" />
      <RouteWithLayout component={RRFacility} exact layout={MainLayout} path="/rr/facility" />
      <RouteWithLayout component={RRSubcounty} exact layout={MainLayout} path="/rr/subcounty" />
      {/*  Reporting rate  */}

      {/*  Supply chain perf  */}
      <RouteWithLayout component={SCSummary} exact layout={MainLayout} path="/scp" />
      <RouteWithLayout component={SCSummary} exact layout={MainLayout} path="/scp/summary" />
      <RouteWithLayout component={SCTrends} exact layout={MainLayout} path="/scp/trends" />
      {/*  Supply chain perf  */}

      {/*  National  */}
      <RouteWithLayout component={NatSummary} exact layout={MainLayout} path="/national" />
      <RouteWithLayout component={NatSummary} exact layout={MainLayout} path="/national/summary" />
      <RouteWithLayout component={NatCommodities} exact layout={MainLayout} path="/national/commodities" />
      <RouteWithLayout component={NatPendingShip} exact layout={MainLayout} path="/national/pending-shipments" />
      <RouteWithLayout component={NatIssuesR} exact layout={MainLayout} path="/national/issues-receipts" />
      {/*  National  */}


      {/*  404  */}
      <RouteWithLayout component={NotFoundView} exact layout={MinimalLayout} path="/not-found" />
      {/*  404  */}
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
