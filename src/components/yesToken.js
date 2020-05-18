import React from 'react';
import '../index.css';
import { Card, CardContent, Button } from '@material-ui/core';

export default class YesToken extends React.Component {
  constructor(props) {
    super(props);
      this.addStock = this.addStock.bind(this);
      this.removeStock = this.removeStock.bind(this);
  }

  addStock() {
    console.log('Added stock');
  }

  removeStock() {
    console.log('Removed stock');
  }
  render() {
    return (
      <>
      <Card>
        <CardContent>
        <h1>{this.props.title}</h1>
        <h1>{this.props.symbol}</h1>
        <h1>{this.props.exchange}</h1>
        </CardContent>
      </Card>
      <Button onClick={this.addStock}>Add Stock</Button>
      <Button onClick={this.removeStock}>Remove Stock</Button>
      </>
    )
  }
}