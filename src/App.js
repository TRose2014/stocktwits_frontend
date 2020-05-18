import React from 'react';
import Greeting from './components/Greeting';
import LogInOut from './components/LogInOut';
import SearchResults from './components/SearchResults';
import './index.css';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {}, // this is the body from /user
      heroku_url: 'https://stockwits-backend.herokuapp.com',
      token: window.location.href,
    };
  }

  componentDidMount() {
    console.log('token', this.state.token)
    fetch(`${this.state.heroku_url}/user`, {
      credentials: 'include', // fetch won't send cookies unless you set credentials
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => console.log('response', response))
      .then((response) => response.json())
      .then((response) => this.setState(
        {
          body: response,
        },
      ))
      .then(console.log('test2', this.state.body))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div id="App">
        <AppBar>
          <Toolbar className='mainHeader'>
            <Typography>
              <Link href='/'>
                StockTwits
                {/* <h1>StockTwits</h1> */}
              </Link>
            </Typography>
          <Greeting token={this.state.token} />
          <LogInOut body={this.state.body} uri={this.state.heroku_url} />
          </Toolbar>
        </AppBar>
          <SearchResults token={this.state.token} />
      </div>
    );
  }
}

export default App;