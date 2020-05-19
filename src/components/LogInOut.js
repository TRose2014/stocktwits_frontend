import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default class LogInOut extends React.Component {

  render() {
    const auth = this.props.token.split('#');

    return(
      <div>
        {auth.length > 1 ?
        <Typography>
          <Link href='/'>
            Sign Out
          </Link>
        </Typography> :
        <a href={this.props.uri + '/login'}>{'Sign in'}</a>
      }
      </div>
    )
  }
}