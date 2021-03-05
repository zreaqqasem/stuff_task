import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../../../styles';

const Post = ({ post }) => {
  return (
      <View style={styles.textContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.likesContainer}>
          <Text style={styles.likes}>&hearts; {post.likes}</Text>
        </View>
      </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
