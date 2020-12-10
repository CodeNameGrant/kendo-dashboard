import React from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Sparkline } from '@progress/kendo-react-charts';
import { products } from '../store/app-data';

const mockPriceHistory = (data) => {
  data.forEach((item) => {
    item.PriceHistory = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    return item;
  })
  return data;
}

const SparkLineChartCell = (props) => <td><Sparkline data={props.dataItem.PriceHistory}/></td>

const ProductsGrid = () => {

  return (
    <Grid style={{ height: '300px' }} data={mockPriceHistory(products)}>
      <GridColumn field='ProductID' title='ID' width="40px" />
      <GridColumn field='ProductName' title='Name' />
      <GridColumn field='Category.CategoryName' width="150px" title='Category Name' />
      <GridColumn field='UnitPrice' title='Price' width="100px" format='{0:c}'/>
      <GridColumn field='UnitsInStock' title='Stock' width="90px" />
      <GridColumn field="PriceHistory" width="130px" cell={SparkLineChartCell} title="Price history" />
      <GridColumn field='Discontinued' width="130px" cell={renderDiscontinuedCell}/>
    </Grid>
  )
}

const renderDiscontinuedCell = ( props ) => {
  return (
    <td>
      <input type="checkbox" checked={props.dataItem[props.field]} disabled="disabled" />
    </td>
  );
}

export default ProductsGrid;
