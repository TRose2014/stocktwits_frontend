import React from 'react';

export default class DisplayTweets extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.type}</h1>
        <h1>{this.props.title}</h1>
        <h1>{this.props.symbol}</h1>
        <h1>{this.props.exchange}</h1>
        <h1>{this.props.id}</h1>
      </div>
    )
  }
}