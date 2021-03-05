import types from './types';
import firebase from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const fetchPostsStart = () => ({
  type: types.FETCH_POSTS_START,
});

const fetchPostsFinished = data => ({
  type: types.FETCH_POSTS_FINISHED,
  data,
});

const fetchPostsError = error => ({
  type: types.FETCH_POSTS_ERROR,
  error,
});

export const fetchPosts = querySnapshot => async (dispatch, getState) => {
  dispatch(fetchPostsStart());
  try {
    const posts = [];
    querySnapshot.forEach(doc => {
      const { uri, likes, title } = doc.data();
      posts.push({
        key: doc.id, // Document ID
        doc, // DocumentSnapshot
        title,
        uri,
        likes,
      });
    });
    dispatch(fetchPostsFinished(posts));
  } catch (error) {
    dispatch(fetchPostsError(error));
  }
};

const addPostStart = () => ({
  type: types.ADD_POST_START,
});

const addPostFinished = () => ({
  type: types.ADD_POST_FINISHED,
});

const addPostError = error => ({
  type: types.ADD_POST_ERROR,
  error,
});

export const addPost = ref => async (dispatch, getState) => {
  dispatch(addPostStart());
  var user = auth().currentUser;
  var email = user.email;
  
  try {
    ref.add({
      email: email,
      date: Math.floor(Math.random() * 10 + 1),
      uri: `https://picsum.photos/200/300?image=${Math.floor(
        Math.random() * 100 + 1
      )}`,
    });
    dispatch(addPostFinished());
  } catch (error) {
    dispatch(addPostError(error));
  }
};
