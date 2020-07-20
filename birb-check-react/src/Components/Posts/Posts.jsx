import React from 'react';
import { connect } from 'react-redux';

import './Posts.css';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map((value) => (
          <Link key={value._id} to={`/post/${value._id}`}>
            <div className='Card'>
              <h3>{value.title}</h3>
              <h5 className='Row'>
                <i>By {value.author.name}</i>
              </h5>
              <h5 className='Row'>
                <i>{value.points} Internet Points</i>
              </h5>
              <button className='Row'>Upvote</button>
              <button className='Row'>Downvote</button>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(Posts);
