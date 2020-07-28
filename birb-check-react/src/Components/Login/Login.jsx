import React from 'react';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div class='loginCard'>
        <input placeholder='Username' className='logInput' />
        <br />
        <input placeholder='Password' type='password' className='logInput' />
        <br />
        <div className='buttonGroup'>
          <button className='login'>Login</button>
          <button className='register'>Register</button>
        </div>
      </div>
    );
  }
}

export default Login;
