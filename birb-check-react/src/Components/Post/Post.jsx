import React from 'react';
import './Post.css';
import { connect } from 'react-redux';
import { upvotePost, unvotePost } from '../../Store/actions';

import { ChevronUp, ChevronDown } from 'react-feather';

const axios = require('axios').default;

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
  }
  fetchPost = () => {
    axios
      .get('http://localhost:4000/posts/' + this.props._id)
      .then((rawData) => {
        return this.setState({ post: rawData.data });
      })
      .catch((err) => {
        return this.setState({ post: { title: err } });
      });
  };

  componentDidMount() {
    this.fetchPost();
  }

  handleUpvote = (index, _id, voter) => {
    if (
      this.state.post.upvotes.indexOf(voter) === -1 &&
      this.state.post.downvotes.indexOf(voter) === -1
    ) {
      this.props.upvote(index, _id, voter).then(() => this.fetchPost());
    } else {
      this.props.unvote(index, _id, voter).then(() => this.fetchPost());

      if (this.props.posts[index].downvotes.indexOf(voter) !== -1) {
        this.props
          .unvote(index, _id, voter)
          .then(() =>
            this.props.upvote(index, _id, voter).then(() => this.fetchPost()),
          );
      } else {
        this.props.unvote(index, _id, voter).then(() => this.fetchPost());
      }
    }
  };

  render() {
    return (
      <div>
        <div className='Card'>
          <h3>{this.state.post.title}</h3>
          <h5 className='Row'>
            <i>By {this.state.post.author?.name}</i>
          </h5>
          <h5 className='Row'>
            <i>
              {this.state.post.upvotes?.length -
                this.state.post.downvotes?.length}{' '}
              Internet Points
            </i>
          </h5>
          <p>{this.state.post.description}</p>
          <button
            className='Row Invisible'
            onClick={() =>
              this.handleUpvote(
                this.props.posts.findIndex(
                  (e) => e._id === this.state.post._id,
                ),
                this.state.post._id,
                'default',
              )
            }
          >
            <ChevronUp
              color={
                this.state.post.upvotes?.indexOf('default') !== -1
                  ? '#4F6F73'
                  : '#2E3E40'
              }
            />
          </button>
          <button className='Row Invisible'>
            <ChevronDown
              color={
                this.state.post.downvotes?.indexOf('default') !== -1
                  ? '#4F6F73'
                  : '#2E3E40'
              }
            />
          </button>
        </div>
        {this.state.post.comments?.map((value) => (
          <div className='Card' key={value._id}>
            <h5 className='Row'>By {value.author.name}</h5>
            <h5 className='Row'>
              {value.upvotes.length - value.downvotes.length} Internet Points
            </h5>
            <p>{value.body}</p>
            <button className='Row'>Upvote</button>
            <button className='Row'>Downvote</button>
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
  unvote: (index, _id, voter) => dispatch(unvotePost(index, _id, voter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
