import React from 'react';
import './Post.css';
import { connect } from 'react-redux';
import {
  upvotePost,
  downvotePost,
  unvotePost,
  postComment,
} from '../../Store/actions';

import { ChevronUp, ChevronDown, Send } from 'react-feather';

const axios = require('axios').default;

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      newComment: '',
      editing: false,
      title: '',
      body: '',
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value,
    });
  }

  fetchPost = () => {
    return axios
      .get('http://localhost:4000/posts/' + this.props._id)
      .then((rawData) => {
        return this.setState({
          post: {
            ...rawData.data,
            comments: rawData.data.comments.sort(
              (a, b) =>
                b.upvotes.length -
                b.downvotes.length -
                (a.upvotes.length - a.downvotes.length),
            ),
          },
        });
      })
      .catch((err) => {
        return this.setState({ post: { title: err } });
      });
  };

  componentDidMount() {
    this.fetchPost().then(() => {
      this.setState({
        title: this.state.post.title,
        body: this.state.post.description,
      });
    });
  }

  createComment = () => {
    return this.props
      .backendCreateComment(this.state.post?._id, {
        body: this.state.newComment,
        author: { name: 'default' },
      })
      .then(() => this.fetchPost());
  };

  handleUpvote = (index, _id, voter) => {
    if (
      this.state.post.upvotes.indexOf(voter) === -1 &&
      this.state.post.downvotes.indexOf(voter) === -1
    ) {
      this.props.upvote(index, _id, voter).then(() => this.fetchPost());
    } else {
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

  handleDownvote = (index, _id, voter) => {
    if (
      this.state.post.upvotes.indexOf(voter) === -1 &&
      this.state.post.downvotes.indexOf(voter) === -1
    ) {
      this.props.downvote(index, _id, voter).then(() => this.fetchPost());
    } else {
      if (this.props.posts[index].upvotes.indexOf(voter) !== -1) {
        this.props
          .unvote(index, _id, voter)
          .then(() =>
            this.props.downvote(index, _id, voter).then(() => this.fetchPost()),
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
          <input
            defaultValue={this.state.post.title}
            disabled={!this.state.editing}
            name='title'
            onChange={this.handleInputChange}
            className='title'
          />

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

          <br />

          <textarea
            defaultValue={this.state.post.description}
            disabled={!this.state.editing}
            name='body'
            onChange={this.handleInputChange}
            className='body'
          />

          <br />

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

          <button
            className='Row Invisible'
            onClick={() =>
              this.handleDownvote(
                this.props.posts.findIndex(
                  (e) => e._id === this.state.post._id,
                ),
                this.state.post._id,
                'default',
              )
            }
          >
            <ChevronDown
              color={
                this.state.post.downvotes?.indexOf('default') !== -1
                  ? '#4F6F73'
                  : '#2E3E40'
              }
            />
          </button>

          <button
            className='Row'
            onClick={() => this.setState({ editing: !this.state.editing })}
          >
            {this.state.editing ? 'Finish' : 'Edit'}
          </button>
        </div>

        <div className='CommentCard'>
          <textarea
            name='newComment'
            onChange={this.handleInputChange}
            className='newComment Row'
            placeholder='Type your comment here'
          />

          <button className='Invisible Row' onClick={this.createComment}>
            <Send />
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
  downvote: (index, _id, voter) => dispatch(downvotePost(index, _id, voter)),
  unvote: (index, _id, voter) => dispatch(unvotePost(index, _id, voter)),
  backendCreateComment: (_id, comment) => dispatch(postComment(_id, comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
