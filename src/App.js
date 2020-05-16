import React from 'react';
import Greeting from './components/Greeting';
import LogInOut from './components/LogInOut';
import SearchResults from './components/SearchResults';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.test = this.test.bind(this)
    this.state = {
      body: {}, // this is the body from /user
      heroku_url: 'https://stockwits-backend.herokuapp.com',
    };
  }

  // test() {
  //   fetch(`${this.state.heroku_url}/user`, {
      
  //   })
  //   .then((response) => console.log('response', response))
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }

  componentDidMount() {
    fetch(`${this.state.heroku_url}/user`)
      .then((response) => console.log('response', response))
      .then((response) => response.json())
      .then((response) => this.setState(
        {
          body: response,
        },
      ))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log('response2', this.state.body)
    return (
      <div id="App">
        <header>
          <h1>StockWits</h1>
          <Greeting body={this.state.body} />
          <LogInOut body={this.state.body} uri={this.state.heroku_url} />
        </header>
          <SearchResults />
          {/* <button onClick={this.test}>Test</button> */}
      </div>
    );
  }
}

export default App;