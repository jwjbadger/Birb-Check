import React from 'react';
import { connect } from 'react-redux';

import './Posts.css';
import { Link } from 'react-router-dom';
import { upvotePost, downvotePost, unvotePost } from '../../Store/actions';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  handleUpvote = (index, _id, voter) => {
    if (
      this.props.posts[index].upvotes.indexOf(voter) === -1 &&
      this.props.posts[index].downvotes.indexOf(voter) === -1
    ) {
      this.props.upvote(index, _id, voter);
    } else {
      if (this.props.posts[index].downvotes.indexOf(voter) !== -1) {
        this.props
          .unvote(index, _id, voter)
          .then(() => this.props.upvote(index, _id, voter));
      } else {
        this.props.unvote(index, _id, voter);
      }
    }
  };

  handleDownvote = (index, _id, voter) => {
    if (
      this.props.posts[index].upvotes.indexOf(voter) === -1 &&
      this.props.posts[index].downvotes.indexOf(voter) === -1
    ) {
      this.props.downvote(index, _id, voter);
    } else {
      if (this.props.posts[index].upvotes.indexOf(voter) !== -1) {
        this.props
          .unvote(index, _id, voter)
          .then(() => this.props.downvote(index, _id, voter));
      } else {
        this.props.unvote(index, _id, voter);
      }
    }
  };

  render() {
    return (
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
              className='Row'
              onClick={
                () =>
                  this.handleUpvote(
                    index,
                    value._id,
                    'default',
                  ) /* using default as the user always is because there is currently no login/signup page, or login/signup inside to API */
              }
            >
              Upvote
            </button>
            <button
              className='Row'
              onClick={() => this.handleDownvote(index, value._id, 'default')}
            >
              Downvote
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  upvote: (index, _id, voter) => dispatch(upvotePost(index, _id, voter)),
  downvote: (index, _id, voter) => dispatch(downvotePost(index, _id, voter)),
  unvote: (index, _id, voter) => dispatch(unvotePost(index, _id, voter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
