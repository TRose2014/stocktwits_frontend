import React from 'react';
import NoToken from './noToken';
import YesToken from './yesToken';
import '../index.css';
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

  searchStocks(event) {
    event.preventDefault();
    const token = this.state.results[1];

    const proxyurl = "https://tia-cors-anywhere.herokuapp.com/";
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

  timeout() {
    setTimeout(this.getTweets, 5000);
}

  componentDidMount() {
    this.timeout();
}

  getTweets() {

    const proxyurl = "https://tia-cors-anywhere.herokuapp.com/";
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${this.state.name}.json`

    if(this.state.name === ''){
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

  displayStocks() {
    if(this.state.results.length === 2){
      return(
        <YesToken />
      )
    }else{
      return(
        <NoToken />
      )
    }
  }

  handleChange (event) {
    event.preventDefault();
    this.setState({ name: event.target.value })
  }

  render(){
    return(
      <div>
        <div>
        {this.state.results.length > 1 ?
            <div >
              <form className='searchForm'>
              <TextField id="outlined-basic" label="Search Stock Info" variant="outlined" onChange={this.handleChange} />
              <Button onClick={this.searchStocks}>Search Stocks</Button>
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
            <h3 className="tweetLength">Displaying {this.state.tweets.length} Tweets</h3>  
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
                    )
              })}
            </div>
          </div>         
        }
        </div>
      </div>
    )
  }
}