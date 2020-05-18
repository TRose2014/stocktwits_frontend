import React from 'react';
import '../index.css';
import { Card, CardContent } from '@material-ui/core';

export default class YesToken extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
        <h1>{this.props.title}</h1>
        <h1>{this.props.symbol}</h1>
        <h1>{this.props.exchange}</h1>
        </CardContent>
      </Card>
    )
  }
}