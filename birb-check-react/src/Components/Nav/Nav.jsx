import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <h2>Birb Check</h2>
        <div className='LinkHolder'>
          <Link to='/'>
            <button>Posts</button>
          </Link>
          <Link to='/images'>
            <button>Images</button>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Nav;
