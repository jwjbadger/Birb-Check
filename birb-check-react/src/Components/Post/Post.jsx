import React from 'react';
import './Post.css';
const axios = require('axios').default;

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:4000/posts/' + this.props._id)
      .then((rawData) => {
        return this.setState({ post: rawData.data });
      })
      .catch((err) => {
        return this.setState({ post: { title: err } });
      });
  }

  render() {
    return (
      <div>
        <div className='Card'>
          <h3>{this.state.post.title}</h3>
          <h5 className='Row'>
            <i>By {this.state.post.author?.name}</i>
          </h5>
          <h5 className='Row'>
            <i>{this.state.post.points} Internet Points</i>
          </h5>
          <p>{this.state.post.description}</p>
          <button className='Row'>Upvote</button>
          <button className='Row'>Downvote</button>
        </div>
        {this.state.post.comments?.map((value) => (
          <div className='Card' key={value._id}>
            <h5 className='Row'>By {value.author.name}</h5>
            <h5 className='Row'>{value.points} Internet Points</h5>
            <p>{value.body}</p>
            <button className='Row'>Upvote</button>
            <button className='Row'>Downvote</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Post;
