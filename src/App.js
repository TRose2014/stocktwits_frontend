import React from 'react';
import Greeting from './components/Greeting';
import LogInOut from './components/LogInOut';
import SearchResults from './components/SearchResults';
import './index.css';
import { AppBar, Toolbar } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {},
      heroku_url: 'https://stockwits-backend.herokuapp.com',
      token: window.location.href,
    };
  }

  render() {
    return (
      <div id="App">
        <AppBar>
          <Toolbar className='mainHeader'>
          <Greeting token={this.state.token} />
          <LogInOut body={this.state.body} uri={this.state.heroku_url}
          token={this.state.token}
           />
          </Toolbar>
        </AppBar>
          <SearchResults token={this.state.token} />
      </div>
    );
  }
}

export default App;