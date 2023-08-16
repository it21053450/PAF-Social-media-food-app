import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import Post from './Post';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {posts.map((post) => (
        <Col key={post.id} span={8}>
          <Post post={post} />
        </Col>
      ))}
    </Row>
  );
};

export default PostsList;
