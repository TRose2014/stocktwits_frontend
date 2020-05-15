import React from 'react';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'symbol',
      id: 686,
      title: "Apple Inc.",
      symbol: "AAPL",
      exchange: "NASDAQ"

    }
  }

  render(){
    return(
      <div>
        <h1>{this.state.type}</h1>
        <h1>{this.state.id}</h1>
        <h1>{this.state.title}</h1>
        <h1>{this.state.symbol}</h1>
        <h1>{this.state.exchange}</h1>
      </div>
    )
  }

}