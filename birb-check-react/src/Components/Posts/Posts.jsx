import React from 'react';
import { connect } from 'react-redux';

import './Posts.css';
import { Link } from 'react-router-dom';
import { upvotePost, downvotePost, unvotePost } from '../../Store/postActions';

import { ChevronDown, ChevronUp } from 'react-feather';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  handleUpvote = (index, _id) => {
    if (
      this.props.posts[index].upvotes.indexOf(this.props.user.name) === -1 &&
      this.props.posts[index].downvotes.indexOf(this.props.user.name) === -1
    ) {
      this.props.upvote(index, _id);
    } else {
      if (
        this.props.posts[index].downvotes.indexOf(this.props.user.name) !== -1
      ) {
        this.props.unvote(index, _id).then(() => this.props.upvote(index, _id));
      } else {
        this.props.unvote(index, _id);
      }
    }
  };

  handleDownvote = (index, _id) => {
    if (
      this.props.posts[index].upvotes.indexOf(this.props.user.name) === -1 &&
      this.props.posts[index].downvotes.indexOf(this.props.user.name) === -1
    ) {
      this.props.downvote(index, _id);
    } else {
      if (
        this.props.posts[index].upvotes.indexOf(this.props.user.name) !== -1
      ) {
        this.props
          .unvote(index, _id)
          .then(() => this.props.downvote(index, _id));
      } else {
        this.props.unvote(index, _id);
      }
    }
  };

  render() {
    return (
      <>
        <Link to='/submit'>
          <div className='StartPost'>
            <input placeholder='Create your post' className='inputLink'></input>
          </div>
        </Link>
        <div>
          {this.props.posts.map((value, index) => (
            <div key={value._id} className='Card'>
              <Link to={`/post/${value._id}`}>
                <div>
                  <h3>{value.title}</h3>
                  <h5 className='Row'>
                    <i>By {value.author.name}</i>
                  </h5>
                  <h5 className='Row'>
                    <i>
                      {value.upvotes.length - value.downvotes.length} Internet
                      Points
                    </i>
                  </h5>
                </div>
              </Link>
              <button
                className='Row Invisible'
                onClick={() => this.handleUpvote(index, value._id)}
              >
                <ChevronUp
                  color={
                    value.upvotes.indexOf(this.props.user.name) !== -1
                      ? '#4F6F73'
                      : '#2E3E40'
                  }
                />
              </button>
              <button
                className='Row Invisible'
                onClick={() => this.handleDownvote(index, value._id)}
              >
                <ChevronDown
                  color={
                    value.downvotes.indexOf(this.props.user.name) !== -1
                      ? '#4F6F73'
                      : '#2E3E40'
                  }
                />
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  upvote: (index, _id, voter) => dispatch(upvotePost(index, _id, voter)),
  downvote: (index, _id, voter) => dispatch(downvotePost(index, _id, voter)),
  unvote: (index, _id, voter) => dispatch(unvotePost(index, _id, voter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
