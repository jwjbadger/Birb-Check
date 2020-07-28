import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input placeholder='Username' />
        <br />
        <input placeholder='Password' type='password' />
        <button>Login</button>
        <br />
        <button>Register</button>
      </div>
    );
  }
}

export default Login;
