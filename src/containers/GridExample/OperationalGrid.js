import React, { useState, useEffect } from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Window } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';

import { products as productData, categories } from '../../store/app-data';

import '@progress/kendo-theme-material/dist/all.css'

/* Create from: https://www.telerik.com/kendo-react-ui/getting-started/
*/
export default function OperationalGrid() {

  const [products, setProducts] = useState(productData)
  const [category, setCategory] = useState(null);
  const [gridData, setGridData] = useState({
    // Pagination
    skip: 0,
    take: 5,

    sort: [{
      field: 'ProductNane',
      dir: 'asc'
    }]
  });

  useEffect(() => {
    const updatedProducts = [...products];
    updatedProducts.forEach((item) => {
      item.Expanded = false;
      return item;
    });

    setProducts(updatedProducts);
  }, []);

  const [windowData, setWindowData] = useState({
    visible: false,
    data: null
  });

  const onCategoryChangeHandler = (e) => {
    console.log("onCategoryChangeHandler")
    setCategory(e.target.value);
    const categoryId = e.target.value.CategoryID;

    let filter = [];
    if (categoryId !== null) {
      filter = {
        logic: 'and',
        filters: [{ field: 'CategoryID', operator: 'eq', value: categoryId }]
      }
    }

    setGridData({
      ...gridData,
      skip: 0,
      filter
    });
  }

  const onRowClickHandler = (e) => {
    setWindowData({ visible: true, data: e.dataItem })
  }

  const onExpandChangeHander = (e) => {
    console.log('onExpandChangeHander', e);
    const updatedProducts = [...products];
    const product = updatedProducts.find(product => product.ProductID === e.dataItem.ProductID)
    product.Expanded = !product.Expanded;

    setProducts(updatedProducts);
  }

  const closeWindow = (e) => {
    setWindowData({ visible: false, data: null })
  }

  const selectedCategory = category && category.CategoryID
    ? (
      <p>
        Selected Category: <strong>{category.CategoryName} (ID: {category.CategoryID})</strong>
      </p>
    )
    : null;

  return (
    <div>
      <p>
        <DropDownList
          data={categories}
          defaultItem={{ CategoryID: null, CategoryName: "Product categories" }}
          dataItemKey='CategoryID'
          textField='CategoryName'
          onChange={(event) => onCategoryChangeHandler(event)}
        />
      </p>
      {selectedCategory}

      <Grid
        data={process(products, gridData)}
        expandField='Expanded'
        detail={DetailTemplate}
        pageable={true}
        sortable={true}
        {...gridData}
        onDataStateChange={(event) => setGridData(event.data)}
        onRowClick={(event => onRowClickHandler(event))}
        onExpandChange={(event) => onExpandChangeHander(event)}
      >
        <GridColumn field='ProductID' />
        <GridColumn field='Expanded' />
        <GridColumn field='ProductName' title='Product Name' />
        <GridColumn field='UnitPrice' title='Unit Price' format='{0:c}' />
        <GridColumn field='UnitsInStock' title='Units In Stock' />
        <GridColumn field='Discontinued' cell={renderCheckboxCell} />
        <GridColumn title='Options' cell={renderOptionsColumn} />
      </Grid>

      {windowData.visible &&
        <Window
          title='Product Details'
          onClose={closeWindow}
          height={250}
          modal
        >
          <dl style={{ textAlign: 'left' }}>
            <dt>Product Name</dt>
            <dd>{windowData.data.ProductName}</dd>
            <dt>Product Id</dt>
            <dd>{windowData.data.ProductID}</dd>
            <dt>Quantity per Unit</dt>
            <dd>{windowData.data.QuantityPerUnit}</dd>
          </dl>
        </Window>}
    </div>
  );
}

const renderCheckboxCell = (props) => {
  return (
    <td>
      <input type="checkbox" checked={props.dataItem[props.field]} disabled="disabled" />
    </td>
  )
}

const primaryClickHandler = (dataItem) => {
  console.log('primaryClickHandler', dataItem)
}

const renderOptionsColumn = (props) => {
  return (<td>
    <Button primary onClick={() => primaryClickHandler(props)}>Primary Test</Button>
    <Button primary icon='user'></Button>
  </td>)
}

const DetailTemplate = (props) => {
  console.log(props);
  return (<p>This is a Detail</p>)
}