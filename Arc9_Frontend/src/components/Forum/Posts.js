import React, { Component } from 'react';
import './Post.css'

class Posts extends Component {
  handleUpvote = (post, key) => {
    this.props.firebase.ref('posts/' + key).set({
      title: post.title,
      upvote: post.upvote + 1,
      downvote: post.downvote
    });
  }

  handleDownvote = (post, key) => {
    this.props.firebase.ref('posts/' + key).set({
      title: post.title,
      upvote: post.upvote,
      downvote: post.downvote + 1
    });
  }

  render() {
      console.log("hello")
    let posts = this.props.posts;
    let _this = this;

    if (!posts) {
    
      return <h1>False</h1>;
    }

    if (this.props.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div className="Posts">
          
        { Object.keys(posts).map(function(key) {
            console.log("map ran")
            return (
              <div key={key}>
                <div><a href="postbody">Title: { posts[key].title }</a></div>
                <div>Content: { posts[key].content }</div>
                <div>Upvotes: { posts[key].upvote }</div>
                <div>Downvotes: { posts[key].downvote }</div>
                <div>
                  <button 
                    onClick={ _this.handleUpvote.bind(this, posts[key], key) }
                    type="button"
                  >
                    Upvote
                  </button>
                  <button 
                    onClick={ _this.handleDownvote.bind(this, posts[key], key) }
                    type="button"
                  >
                    Downvote
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    );
  }
}

export default Posts;