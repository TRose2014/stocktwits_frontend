import React from 'react';
import '../index.css';
import { Card, CardContent, Button } from '@material-ui/core';
import SavedStocks from './SavedStocks';

export default class YesToken extends React.Component {
  constructor(props) {
    super(props);
      this.addStock = this.addStock.bind(this);
      this.removeStock = this.removeStock.bind(this);
      this.getTweets = this.getTweets.bind(this);
      this.timeout= this.timeout.bind(this);
      this.state = {
        saved: [],
        savedStock: {},
        tweets: [],
      }
  }

  timeout() {
    setTimeout(this.getTweets, 5000);
}

  componentDidMount() {
    this.timeout();
}

  getTweets() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const proxyurl = "https://tia-cors-anywhere.herokuapp.com/";
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${this.state.saved[0]}.json`

    if(!this.state.saved || !this.state.saved.length){
      console.log('No stocks searched')
    }else{
      fetch(proxyurl + url)
        .then(response => response.json())
        .then(data => this.setState({
          tweets: data.messages
        }))
        .then(this.timeout())
        .catch(err => {
          console.log(err);
        });
    }
  }

  addStock() {
    console.log('Added stock');
    const symbol = this.props.symbol;
    this.state.saved.push(symbol);
    console.log(this.state.saved);
    this.getTweets();
  }

  removeStock() {
    console.log('Removed stock');
    this.state.saved.pop();
    console.log(this.state.saved.length);
    this.getTweets();
  }
  render() {
    console.log('tweets', this.state.tweets);
    return (
      <>
      <Card>
        <CardContent>
        <h1>{this.props.title}</h1>
        <h1>{this.props.symbol}</h1>
        <h1>{this.props.exchange}</h1>
        </CardContent>
      </Card>
      <Button disabled={!this.props.symbol} onClick={this.addStock}>Add Stock</Button>
      <Button disabled={!this.props.symbol} onClick={this.removeStock}>Remove Stock</Button>
      <div>
      {this.state.tweets === undefined ?
            <div>
              <h3>Please search using a vaild stock symbol</h3>
            </div>
            :
            <>
            <div>
              <SavedStocks saved={this.state.saved} /> 
            {this.state.tweets.map((item, index) => {
                return ( 
                  <>
                  <br />
                  <Card key={index} className='tweetCard'>
                    <CardContent>
                      <h4 className='tweetResults'>{item.user.username}</h4>
                      <img src={item.user.avatar_url} alt={item.user.username} photo />
                      <p>{item.body}</p>
                      {/* if({item.entities.chart.url}){
                        <img src={item.entities.chart.url} alt="" />
                      } */}
                    </CardContent>
                  </Card>
                  <br />
                  </>
                    )
              })}
            </div>
          </>         
        }
        </div>
      </>
    )
  }
}