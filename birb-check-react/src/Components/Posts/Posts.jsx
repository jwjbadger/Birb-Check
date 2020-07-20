import React from 'react';
import { connect } from 'react-redux';

import './Posts.css';

class Posts extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map((value) => (
          <div key={value._id} className='Post'>
            <h3>{value.title}</h3>
            <div className='Row'>
              <h5>
                <i>By {value.author.name}</i>
              </h5>
              <h5>
                <i>{value.points} Internet Points</i>
              </h5>
              <button>Upvote</button>
              <button>Downvote</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(Posts);
