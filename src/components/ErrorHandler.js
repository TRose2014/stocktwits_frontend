import React from 'react';

export default class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

  }

  render() {
    if (this.state.hasError) {

      return <h1>Please go back and search a vaild stock symbol.</h1>;
    }
    return this.props.children;
  }
}