import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');
const aspectRatio = 183 / 275;
const height = width * aspectRatio;

const validationShema = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const ShowPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <StatusBar hidden />
      <View style={styles.screenContainer}>
        <View style={[styles.imageContainer, {borderBottomLeftRadius: 80}]}>
          <Image
            style={{width, height}}
            source={require('../assets/download.jpg')}
          />
        </View>

        <View style={{borderTopLeftRadius: 80, flex: 1}}>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validateOnMount={true}
            validationSchema={validationShema}
            onSubmit={values => console.log(values)}>
            {({
              errors,
              status,
              touched,
              isValid,
              values,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <ImageBackground
                style={styles.imageBg}
                source={require('../assets/download.jpg')}>
                <View style={styles.container}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.hint}>
                      Use your credentials below and login to view articles
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputContainerOne}>
                      <View style={styles.iconContainer}>
                        <Icon name="user-circle" size={25} color="rgb(66, 47, 148)"/>
                      </View>
                      <View style={styles.inputContainerTwo}>
                        <TextInput
                          style={styles.input}
                          placeholder="username"
                          value={values.username}
                          onBlur={handleBlur('username')}
                          onChangeText={handleChange('username')}
                        />
                      </View>
                    </View>
                    {errors.username && touched.username ? (
                      <Text style={styles.errors}>{errors.username}</Text>
                    ) : null}
                    <View style={styles.inputContainerOne}>
                      <View style={styles.iconContainer}>
                        <Feather name="key" size={25} color="rgb(66, 47, 148)" />
                      </View>
                      <View style={styles.inputContainerTwo}>
                        <TextInput
                          style={styles.input}
                          placeholder="password"
                          value={values.password}
                          onBlur={handleBlur('password')}
                          secureTextEntry={showPassword ? false : true}
                          onChangeText={handleChange('password')}
                        />
                      </View>
                      <View style={styles.iconContainer}>
                         <TouchableNativeFeedback onPress={ShowPasswordHandler}>
                        {!showPassword ? (
                          <Feather name="eye-off" color="rgb(66, 47, 148)" size={25} />
                        ) : (
                          <Feather name="eye" color="rgb(66, 47, 148)" size={25} />
                        )}
                      </TouchableNativeFeedback>
                      </View>
                     
                    </View>
                    {errors.password && touched.password ? (
                      <Text style={styles.errors}>{errors.password}</Text>
                    ) : null}
                  </View>
                  <View
                    style={[
                      styles.button,
                      {
                        backgroundColor: isValid ? 'rgb(66, 47, 148)' : 'grey',
                      },
                    ]}>
                    <TouchableOpacity
                      disabled={!isValid}
                      onPress={handleSubmit}>
                      <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            )}
          </Formik>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: width,
    height: height * 0.65,
    overflow: 'hidden',
  },
  imageBg: {
    flex: 1,
    width: width,
    height: height,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  container: {
    borderTopRightRadius: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 45,
  },
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  hint: {
    textAlign: 'center',
    marginVertical: 8,
  },
  inputContainer: {
    marginVertical: 20,
    padding: 10,
  },
  inputContainerOne: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    width: '10%',
  },
  inputContainerTwo: {
    width: '75%',
  },
  input: {
    margin: 10,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRightColor: '#ccc',
    borderRightWidth: 2,
    borderBottomRightRadius: 80,
    textAlign: 'center',
  },
  button: {
    marginVertical: 5,
    borderRadius: 80,
    width: '35%',
    borderColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 2,
  },
  errors: {
    fontSize: 13,
    color: 'rgb(212, 37, 37)',
    fontWeight: 'bold',
    marginBottom: 7,
    textAlign: 'center',
  },
});

export default LoginScreen;
