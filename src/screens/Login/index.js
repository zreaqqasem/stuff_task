import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
var show = false;
import {styles} from '../../../styles';

const Login = ({
  onPress,
  emailValue,
  passwordValue,
  onChange,
  loggingIn,
  hasError,
  errorMessage,
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 0,
        justifyContent: 'center',
      }}>
      <Image
        style={style.tinyLogo}
        source={{
          uri:
            'https://www.freepnglogos.com/uploads/email-png/blue-email-box-circle-png-transparent-icon-2.png',
        }}
      />
      <View style={spacer.container}></View>
      <View style={spacer.container}></View>

      <Text style={styles.headerText}>Your Email Address</Text>

      <View style={spacer.container}></View>
      <TextInput
        autoCapitalize="none"
        style={{borderWidth: 1.0, height: 40}}
        autoCorrect={false}
        autoFocus
        value={emailValue}
        onChangeText={(e) => onChange(e, 'email')}
        keyboardType="email-address"
        placeholder=" Email Address"
      />

      <View style={spacer.container}></View>
      <TextInput
        style={{borderWidth: 1.0, height: 40}}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        value={passwordValue}
        onChangeText={(e) => onChange(e, 'password')}
        placeholder="Password"
      />
      <View style={spacer.container}></View>

      <View style={spacer.container}></View>


      <View style={styless.container}>
        <Button color="#FCFAFA" title="Login" onPress={onPress} />
      </View>
      {loggingIn && <ActivityIndicator size="large" />}
      {hasError && <Text>{errorMessage}</Text>}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#000000',
  },
  tinyLogo: {
    width: 80,
    height: 80,
    alignItems: 'center',
    marginLeft: Dimensions.get('window').width / 4,
  },
});

const styless = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#000000',
    marginBottom: 0, // Set your own custom Color
  },
});
const spacer = StyleSheet.create({
  container: {
    height: 50,
    width: 300,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
