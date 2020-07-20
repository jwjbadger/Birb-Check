import React from 'react';
import { connect } from 'react-redux';

import './Posts.css';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map((value) => (
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

export default connect(mapStateToProps)(Posts);
