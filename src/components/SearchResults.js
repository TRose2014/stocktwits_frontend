import React from 'react';
import NoToken from './noToken';
import YesToken from './yesToken';
import { Button, TextField, Card, CardContent } from '@material-ui/core';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.searchStocks = this.searchStocks.bind(this);
    this.displayStocks = this.displayStocks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.state = {
      info: {},
      results: this.props.token.split('#'),
      name: '',
      tweets: [],

    }
  }

  componentDidUpdate() {
    // this.getTweets();
    setInterval(console.log('Hello from set interval'), 5000);
    // setInterval(this.getTweets, 5000);

  }

  searchStocks(event) {
    event.preventDefault();
    console.log('name', this.state.name);
    const token = this.state.results[1];
    console.log('token', token);

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://api.stocktwits.com/api/2/search/symbols.json?access_token=${token}&q=${this.state.name}`

    fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => this.setState({
        info: data.results[0]
      }))
      .catch(err => {
        console.log(err);
      });
  }

  getTweets(event) {
    event.preventDefault();

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${this.state.name}.json`

    fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => this.setState({
        tweets: data.messages
      }))
      .catch(err => {
        console.log(err);
      });
  }

  displayStocks() {
    if(this.state.results.length === 2){
      console.log('yes token');
      return(
        <YesToken />
      )
    }else{
      console.log('no token')
      return(
        <NoToken />
      )
    }
  }

  handleChange (event) {
    event.preventDefault();
    this.setState({ name: event.target.value })
    console.log(event.target.value)
  }

  render(){
    console.log('results2', this.state.results)
    console.log('info', this.state.info)
    return(
      <div>
        <div>
        {this.state.results.length > 1 ?
            <>
              <form style={{ marginTop : '20%' }}>
              <TextField id="outlined-basic" label="Search Stock Info" variant="outlined" onChange={this.handleChange} />
              <Button onClick={this.searchStocks}>Search Stocks</Button>
              </form>
                <YesToken
                  key={this.state.info.id}
                  id={this.state.info.id}
                  title={this.state.info.title}
                  type={this.state.info.type}
                  symbol={this.state.info.symbol}
                  exchange={this.state.info.exchange}
                />

              </>
            :
            <>
              <form style={{ marginTop : '20%' }}>
              <TextField id="outlined-basic" label="Search Stock Tweets" variant="outlined" onChange={this.handleChange} />
              <Button onClick={this.getTweets}>Get Tweets</Button>
              </form>
            <div> 
            {this.state.tweets.map((item, index) => {
                return ( 
                  <Card key={index}>
                    <CardContent>
                      <h4>{item.user.username}</h4>
                      <img src={item.user.avatar_url} alt={item.user.username} photo />
                      <p>{item.body}</p>
                    </CardContent>
                  </Card>
                    )
              })}
            </div>
          </>         
        }
        </div>
      </div>
    )
  }
}