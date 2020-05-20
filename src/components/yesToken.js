import React from 'react';
import '../index.css';
import { Card, CardContent, Button } from '@material-ui/core';
import SavedStocks from './SavedStocks';
import { v4 as uuidv4 } from 'uuid';

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
    const proxyurl = "https://tia-cors-anywhere.herokuapp.com/";
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${this.state.saved[0]}.json`

    if(!this.state.saved || !this.state.saved.length){
      console.log('No stocks searched')
      this.setState({
        tweets: []
      })
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
    this.state.saved.pop();
    this.getTweets();
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
              <h3 className="tweetLength">Displaying {this.state.tweets.length} Tweets</h3> 
            {this.state.tweets.map((item, index) => {
                return ( 
                  <>
                  <br />
                  <Card key={uuidv4()} className='tweetCard'>
                    <CardContent>
                      <h4 className='tweetResults'>{item.user.username}</h4>
                      <img src={item.user.avatar_url} alt={item.user.username} photo />
                      <p>{item.body}</p>
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