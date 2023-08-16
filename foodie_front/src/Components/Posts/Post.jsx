import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Post = ({ post }) => {
  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
     
      cover={
        <img
          alt="example"
          src={post.imageUrls && post.imageUrls.length > 0 ? post.imageUrls[0] : ''}
        />
      }
      actions={[
        <span>{post.likes && post.likes.length} Likes</span>,
        <span>{post.comments && post.comments.length} Comments</span>
      ]}
    >
      <Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={post.postedBy}
        description={post.caption}
      />
    </Card>
  );
};

export default Post;
