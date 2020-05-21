import React from 'react';
import { Card, CardContent, Button } from '@material-ui/core';

export default class SavedStocks extends React.Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      savedStock: this.props.saved,
    };
  }

  /**
   * @function removeItem
   * @description removes symbol from the saved array
   */


  removeItem(index) {
    const stocks = this.state.savedStock.filter((stock, stockIndex) => stockIndex !== index);
    this.setState({ savedStock: stocks });
  }

  componentDidMount() {
    this.setState({
      savedStock: this.props.saved,
    });
  }


  render() {
    return (
      <Card className='searchContainer'>
        <CardContent>
          <h1>Saved Stocks</h1>
          {this.state.savedStock.map((item, index) => (
            <Card className='searchCard' key={index}>
              <CardContent>
                <h1>{item}</h1>
                <Button onClick={(e) => { this.removeItem(index); }} key={item}>Remove Stock</Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  }
}
