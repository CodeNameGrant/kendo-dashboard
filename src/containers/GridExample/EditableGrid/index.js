import React, { useState, useEffect } from 'react'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';

import CommandCell from './CommandCell';

import { products as sampleProducts } from '../../../store/app-data/products';
import { Button } from '@progress/kendo-react-buttons';

export default function EditableGrid() {
  const editField = 'inEdit';
  const [masterProducts, setMasterProducts] = useState([...sampleProducts]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([...masterProducts]);
  }, [masterProducts]);

  const enterEdit = (dataItem) => {
    setProducts((prevState) => {
      return prevState.map(product =>
        product.ProductID === dataItem.ProductID ? { ...product, inEdit: true } : product
      )
    })
  }

  const cancel = (dataItem) => {
    const origProduct = masterProducts.find(item => item.ProductID === dataItem.ProductID)

    setProducts((prevState) => {
      return prevState.map(product =>
        product.ProductID === origProduct.ProductID ? origProduct : product
      )
    })
  }

  const update = (dataItem) => {
    dataItem[editField] = false;
    const index = masterProducts.findIndex(item => item.ProductID === dataItem.ProductID)
    const updatedProducts = [...masterProducts];
    updatedProducts[index] = dataItem;

    setMasterProducts(updatedProducts);
  }

  const add = () => {
    setProducts((prevState) => {
      return [
        { inEdit: true, Discontinued: false },
        ...products
      ]
    })
  }

  const save = (dataItem) => {
    setMasterProducts((prevState) => {
      return [
        { ProductID: 112, ...dataItem, inEdit: false },
        ...prevState
      ];
    })
  }

  const discard = (dataItem) => {
    setProducts((prevState) => prevState.filter(item => item.ProductID !== undefined))
  }

  const onExpandChangeHander = ({ dataItem }) => {
    setProducts((prevState) => (
      prevState.map(product =>
        product.ProductID === dataItem.ProductID ? { ...product, Expanded: !product.Expanded } : product
      )
    ));
  }

  const renderOptionsCell = (props) => (
    <CommandCell
      {...props}
      editField={editField}
      edit={enterEdit}
      cancel={cancel}
      update={update}
      save={save}
      discard={discard}
    />
  )

  const onItemChangeHandler = ({ dataItem, field, value }) => {
    setProducts((prevState) => {
      return prevState.map(product =>
        product.ProductID === dataItem.ProductID ? { ...product, [field]: value } : product
      )
    })
  }

  return (
    <Grid
      data={products}
      editField={editField}
      expandField='Expanded'
      detail={DetailTemplate}
      onExpandChange={onExpandChangeHander}
      onItemChange={onItemChangeHandler}>
      <GridToolbar>
        <Button primary onClick={add}>Add</Button>
      </GridToolbar>
      <GridColumn field="ProductID" title="Id" width="80px" editable={false} />
      <GridColumn field="ProductName" title="Name" editor='text' />
      <GridColumn field="FirstOrderedOn" title="First Ordered" format="{0:d}" editor='date' />
      <GridColumn field="UnitsInStock" title="Units" width="150px" editor='numeric' />
      <GridColumn field="Discontinued" title="Discontinued" editor='boolean' />
      <GridColumn title="Options" cell={renderOptionsCell} />
    </Grid>
  );

}

const DetailTemplate = ({ dataItem }) => (
  <pre>{JSON.stringify(dataItem, null, 2)}</pre>
)
