import React from 'react';
import Greeting from './components/Greeting';
import LogInOut from './components/LogInOut';
import SearchResults from './components/SearchResults';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {}, // this is the body from /user
      heroku_url: 'https://stockwits-backend.herokuapp.com'
    };
  }

  componentDidMount() {
    fetch(`${this.state.heroku_url}/user`, {
      credentials: 'include', // fetch won't send cookies unless you set credentials
    })
      .then((response) => response.json())
      .then((response) => this.setState(
        {
          body: response,
        },
      ));
  }

  render() {
    return (
      <div id="App">
        <header>
          <h1>StockWits</h1>
          <Greeting body={this.state.body} />
          <LogInOut body={this.state.body} uri={this.state.heroku_url} />
          <SearchResults />
        </header>
      </div>
    );
  }
}

export default App;