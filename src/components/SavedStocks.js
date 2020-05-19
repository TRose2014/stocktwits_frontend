import React from 'react';
import { Card, CardContent } from '@material-ui/core';

export default class SavedStocks extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <h1>Saved Stocks</h1>
          <h3>{this.props.saved[0]}</h3>
        </CardContent>
      </Card>
    )
  }
}