import React from 'react';
import './Images.css';
import { connect } from 'react-redux';
import { uploadImage } from '../../Store/imageActions';

class Images extends React.Component {
  onChangeHandler = (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    this.props.ImageUpload(formData);
  };
  render() {
    return (
      <div className='images'>
        {this.props.images.map((value) => {
          return (
            <div key={value._id} className='image'>
              <img alt='Unknown' src={value.imageUrl} />{' '}
            </div>
          );
        })}
        <input
          type='file'
          name='file'
          onChange={this.onChangeHandler}
          className='plus'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  images: state.images.images,
});
const mapDispatchToProps = (dispatch) => ({
  ImageUpload: (image) => dispatch(uploadImage(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Images);
