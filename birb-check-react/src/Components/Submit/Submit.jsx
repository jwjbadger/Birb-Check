import React from 'react';
import './Submit.css';
import { connect } from 'react-redux';
import { postPost } from '../../Store/postActions';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };

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
      <div className='inputForm'>
        <input
          value={this.state.title}
          name='title'
          onChange={this.handleInputChange}
          placeholder='Title'
          className='title-in submit-in'
        />
        <br />
        <textarea
          value={this.state.body}
          name='body'
          onChange={this.handleInputChange}
          className='body-in submit-in'
          placeholder='Body'
        ></textarea>
        <br />
        <button
          onMouseUp={() => {
            this.props.submit({
              title: this.state.title ? this.state.title : 'Some Lazy Title',
              description: this.state.body
                ? this.state.body
                : 'Some Super Lazy Description',
            });
            return this.props.history.push('/');
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: (post) => dispatch(postPost(post)),
});

export default connect(null, mapDispatchToProps)(Submit);
