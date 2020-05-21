import React from 'react';

export default class Greeting extends React.Component {
  render() {
    const auth = this.props.token.split('#');

    return (
      <div>
        {auth.length > 1 ? <span>Welcome!</span> : <span>Please log in</span>}
      </div>
    );
  }
}
