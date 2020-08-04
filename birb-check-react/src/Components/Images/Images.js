import React from 'react';
import './Images.css';
import { connect } from 'react-redux';

class Images extends React.Component {
  render() {
    return (
      <div class='images'>
        {this.props.images.map((value) => {
          return (
            <div class='image'>
              <img key={value._id} alt='Unknown' src={value.imageUrl} />{' '}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  images: state.images.images,
});

export default connect(mapStateToProps)(Images);
