import React from 'react';
import './Submit.css';

class Submit extends React.Component {
  render() {
    return (
      <div className='inputForm'>
        <input placeholder='Title' className='title-in submit-in' />
        <br />
        <textarea className='body-in submit-in' placeholder='Body'></textarea>
        <br />
        <button>Submit</button>
      </div>
    );
  }
}

export default Submit;
