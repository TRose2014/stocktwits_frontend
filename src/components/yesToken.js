import React from 'react';
import '../index.css';
import { Card, CardContent, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

export default class YesToken extends React.Component {
  constructor(props) {
    super(props);
      this.addStock = this.addStock.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.getTweets = this.getTweets.bind(this);
      this.timeout= this.timeout.bind(this);
      this.state = {
        saved: [],
        savedStock: {},
        tweets: [],
      }
  }

  /**
   * @function timeout
   * @description calls getTweets() every 5 seconds to get new tweets without refreshing
   */

  timeout() {
    setTimeout(this.getTweets, 5000);
  }

  componentDidMount() {
    this.timeout();
  }

  /**
   * @function getTweets
   * @description Uses name passed in by user in the input field to search stocktwits api symbol streams
   */

  getTweets() {
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${this.state.saved[0]}.json`

    if(!this.state.saved || !this.state.saved.length){
      console.log('No stocks searched')
      this.setState({
        tweets: []
      })
    }else{
      fetch(url)
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

  /**
   * @function addStock
   * @description save symbol and pushes into the saved array
   */

  addStock() {
    const symbol = this.props.symbol;
    this.state.saved.push(symbol);
    this.getTweets();
  }

  removeItem(index) {
    const stocks = this.state.saved.filter((stock, stockIndex) => stockIndex !== index);
    this.setState({ saved: stocks });
  }

  render() {
    return (
      <>
      <div>
      {this.state.tweets === undefined ?
            <div>
              <h3>Please search using a vaild stock symbol</h3>
            </div>
            :
            <>
              <Card className='searchCard'>
                <CardContent>
                <h1>{this.props.title}</h1>
                <h1>{this.props.symbol}</h1>
                <h1>{this.props.exchange}</h1>
                <Button disabled={!this.props.symbol} onClick={this.addStock}>Add Stock</Button>
                </CardContent>
              </Card>
            <div>
              {this.state.saved.map((item, index) => (
            <Card className='searchCard' key={index}>
              <CardContent>
                <h1>{item}</h1>
                <Button onClick={(e) => { this.removeItem(index); }} key={item}>Remove Stock</Button>
              </CardContent>
            </Card>
          ))}
              <h3>Displaying {this.state.tweets.length} Tweets</h3> 
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