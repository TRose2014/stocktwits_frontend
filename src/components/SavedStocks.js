import React from 'react';
import { Card, CardContent } from '@material-ui/core';

export default class SavedStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedStock: this.props.saved
    }
  }

  componentDidMount() {
    this.setState({
      savedStock: this.props.saved
    })
  }


  render() {
    return (
      <Card>
        <CardContent>
          <h1>Saved Stocks</h1>
          {this.state.savedStock.map((item, index) => {
            return(
              <Card key={index}>
                <CardContent>
                  <h1>{item}</h1>
                </CardContent>
              </Card>
            )
          })}
        </CardContent>
      </Card>
    )
  }
}