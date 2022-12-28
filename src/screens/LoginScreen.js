import React, {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';

import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


import {PostLoginAction} from '../store/actions/PostLoginAction';
import Colors from '../constants/colors';
import Spinner from '../components/UI/Spinner';
import MyInput from '../components/UI/MyInput';
import MyButton from '../components/UI/MyButton';

const {width} = Dimensions.get('window');
const aspectRatio = 183 / 275;
const height = width * aspectRatio;

const validationShema = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {error, loading} = useSelector(state => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const ShowPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const SubmitHandle = values => {
    dispatch(PostLoginAction(values));
  };

  return (
    <React.Fragment>
      <StatusBar hidden />
      <View style={styles.screenContainer}>
        <View style={[styles.imageContainer, {borderBottomLeftRadius: 80}]}>
          <Image
            style={{width, height}}
            source={require('../assets/image.jpg')}
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
            onSubmit={(values, actions) => {
              SubmitHandle(values);
              actions.resetForm();
            }}>
            {({
              errors,
              touched,
              values,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <ImageBackground
                style={styles.imageBg}
                source={require('../assets/image.jpg')}>
                <View style={styles.container}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.hint}>
                      Use your credentials below and login to view articles
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <MyInput
                      placeholder="username"
                      name="user-circle"
                      color={Colors.blue2}
                      Icon={Icon}
                      value={values.username}
                      onBlur={handleBlur('username')}
                      onChangeText={handleChange('username')}
                      touched={touched.username}
                      errors={errors.username}
                    />
                    <MyInput
                      placeholder="password"
                      secureTextEntry={showPassword ? false : true}
                      name="key"
                      color={Colors.blue2}
                      Icon={Feather}
                      value={values.password}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      touched={touched.password}
                      errors={errors.password}
                      >
                      <TouchableNativeFeedback onPress={ShowPasswordHandler}>
                        {!showPassword ? (
                          <Feather
                            name="eye-off"
                            color={Colors.blue2}
                            style={{marginVertical: 12}}
                            size={25}
                          />
                        ) : (
                          <Feather
                            name="eye"
                            color={Colors.blue2}
                            style={{marginVertical: 12}}
                            size={25}
                          />
                        )}
                      </TouchableNativeFeedback>
                    </MyInput>
                  </View>
                  <MyButton
                    viewStyle={[
                      styles.button,
                      {
                        backgroundColor:
                          !values.username || !values.password || loading
                            ? Colors.grey
                            : Colors.blue2,
                      },
                    ]}
                    text="Login"
                    disable={!values.username || !values.password || loading}
                    onPress={handleSubmit}
                    textStyle={styles.buttonText}
                  />
                  {loading && <Spinner color={Colors.blue} />}
                  {error && (
                    <Text style={[styles.errors, {marginTop: 10}]}>
                      {error}
                    </Text>
                  )}
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
    color: Colors.black,
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
  button: {
    marginVertical: 5,
    borderRadius: 80,
    width: '35%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 2,
  },
  errors: {
    fontSize: 13,
    color: Colors.red,
    fontWeight: 'bold',
    marginBottom: 7,
    textAlign: 'center',
  },
});

export default LoginScreen;
