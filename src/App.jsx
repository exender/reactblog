import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const result = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPost.id}`);
      setComments(result.data);
    };

    if (selectedPost.id) {
      fetchComments();
    }
  }, [selectedPost]);

  const handlePostClick = post => {
    setSelectedPost(post);
  };

  return (
    <div>
      <h2>Articles</h2>
      {posts.map(post => (
        <div key={post.id} onClick={() => handlePostClick(post)}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {selectedPost.id && (
        <div>
          <h2>Commentaires</h2>
          {comments.map(comment => (
            <div key={comment.id}>
              <p>{comment.name}</p>
              <p>{comment.email}</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
