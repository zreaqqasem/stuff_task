import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {connect} from 'react-redux';
import Login from './src/screens/Login';
import Post from './src/screens/Post';
import {styles} from './styles';
import {loginUser, logoutUser} from './src/actions/auth';
import {add, fetchs} from './src/actions/s';


class App extends Component {
  constructor() {
    super();
    this.ref = firestore().collection('s');
    this.firestoreUnsubscriber = null;
    this.authUnsubscriber = null;
    this.state = {
      emailValue: '',
      passwordValue: '',
    };
  }
  componentDidMount() {
    this.authUnsubscriber = auth().onAuthStateChanged((user) => {
      console.log(user);
    });
    this.firestoreUnsubscriber = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    if (this.authUnsubscriber) {
      this.authUnsubscriber();
    }
    if (this.firestoreUnsubscriber) {
      this.firestoreUnsubscriber();
    }
  }

  onCollectionUpdate = async (querySnapshot) => {
    await this.props.fetchs(querySnapshot);
  };

  addRandom = () => {
    this.props.add(this.ref);
  };

  onLogin = async () => {
    try {
      const response = await this.props.loginUser(
        this.state.emailValue,
        this.state.passwordValue,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  onLogout = async () => {
    try {
      await this.props.logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  onChangeLogin = (e, type) => {
    this.setState({[`${type}Value`]: e});
  };

  render() {
    if (this.props.auth.isFetching) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {this.props.auth.loggedIn && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={this.onLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
        {this.props.auth.loggedIn ? (
          <FlatList
            data={this.props.s.data}
            renderItem={({item}) => < ={item} />}
            ListFooterComponent={
              <Button title="Add random " onPress={this.addRandom} />
            }
          />
        ) : (
          <Login
            emailValue={this.state.emailValue}
            passwordValue={this.state.passwordValue}
            onChange={(e, type) => this.onChangeLogin(e, type)}
            loggingIn={this.props.auth.isFetching}
            hasError={this.props.auth.hasError}
            errorMessage={this.props.auth.errorMessage}
            onPress={this.onLogin}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  s: state.s,
});

const mapDispatchToProps = {
  loginUser,
  logoutUser,
  add,
  fetchs,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
