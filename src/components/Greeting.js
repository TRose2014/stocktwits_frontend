import React from 'react';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let auth = this.props.token.split('#');
    console.log('auth', auth);

    return (
      <div>
        {auth.length < 1 ? 
        <span>Please log in</span> : 
        <span>Welcome!</span>}
      </div>
    )
  }
}



// import React from 'react';

// export default class Greeting extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     let message = (this.props.body.token)
//       ? `Hi, ${this.props.body.token.email}!`
//       : "You're not logged in.";

//     return (
//       <span>{message}</span>
//     );
//   }
// }
