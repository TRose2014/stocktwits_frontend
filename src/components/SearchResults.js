/* eslint-disable max-len */
import React from 'react';
import { Button, TextField, Card, CardContent } from '@material-ui/core';

import YesToken from './yesToken';
import '../index.css';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.searchStocks = this.searchStocks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.state = {
      info: {},
      results: this.props.token.split('#'),
      name: '',
      tweets: [],

    };
  }

  /**
   * @function searchStocks
   * @param {object} event 
   * @description uses access token from App.js to search for specifc stocks using stocktwits api
   */

  searchStocks(event) {
    event.preventDefault();
    const token = this.state.results[1];
    const proxyurl = 'https://tia-cors-anywhere.herokuapp.com/';
    const url = `https://api.stocktwits.com/api/2/search/symbols.json?access_token=${token}&q=${this.state.name}`;

    fetch(proxyurl + url)
      .then((response) => response.json())
      .then((data) => this.setState({
        info: data.results[0],
      }))
      .catch((err) => {
        console.log(err);
      });
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
    const proxyurl = 'https://tia-cors-anywhere.herokuapp.com/';
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${this.state.name}.json`;

    if (this.state.name === '') {
      console.log('No stocks searched');
    } else {
      fetch(proxyurl + url)
        .then((response) => response.json())
        .then((data) => this.setState({
          tweets: data.messages,
        }))
        .then(this.timeout())
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /**
   * @function handleChange
   * @param {object} event 
   * @description gets and saves info passed in by user via input field
   */

  handleChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
        {this.state.results.length > 1 // If user has access token display this
          ? <div>
              <form className='searchForm'>
              <TextField id="outlined-basic" label="Search Stock Info" variant="outlined" onChange={this.handleChange} />
              <Button className='tweetButton' onClick={this.searchStocks}>Search Stocks</Button>
              </form>
                <YesToken
                  id={this.state.info.id}
                  title={this.state.info.title}
                  type={this.state.info.type}
                  symbol={this.state.info.symbol}
                  exchange={this.state.info.exchange}
                />
              </div>
          : 
          <div>
              <form className='searchForm'>
              <TextField id="outlined-basic" label="Search Stock Tweets" variant="outlined" onChange={this.handleChange} />
              <Button className='tweetButton' onClick={this.getTweets}>Get Tweets</Button>
              </form>
            <div>
            <h2>Sign in to save your favorite stocks!</h2>
            <h3>Displaying {this.state.tweets.length} Tweets</h3>  
            {this.state.tweets.map((item, index) => {
              return ( 
                  <>
                  <br />
                  <Card key={index} className='tweetCard'>
                    <CardContent>
                      <h4 className='tweetResults'>{item.user.username}</h4>
                      <img src={item.user.avatar_url} alt={item.user.username} photo />
                      <p>{item.body}</p>
                    </CardContent>
                  </Card>
                  <br />
                  </>
              );
            })}
            </div>
          </div>         
        }
        </div>
      </div>
    );
  }
}
