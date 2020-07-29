import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { login } from '../../Store/userActions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', password: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    return (
      <div className='loginCard'>
        <input
          placeholder='Username'
          className='logInput'
          name='name'
          onChange={this.handleInputChange}
        />
        <br />
        <input
          placeholder='Password'
          type='password'
          className='logInput'
          name='password'
          onChange={this.handleInputChange}
        />
        <br />
        <div className='buttonGroup'>
          <button
            className='login'
            onClick={() =>
              this.props
                .loginLocal(this.state.name, this.state.password)
                .then((data) => {
                  if (data.type === '[Users] Login') {
                    return this.props.history.push('/');
                  }
                })
            }
          >
            Login
          </button>
          <button className='register'>Register</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginLocal: (name, password) => dispatch(login(name, password)),
});

export default connect(null, mapDispatchToProps)(Login);
