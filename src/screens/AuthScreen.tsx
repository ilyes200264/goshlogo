import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutLeft,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';
import { MainStackNavigationProp } from '../navigation';

interface AuthScreenProps {
  navigation: MainStackNavigationProp<'Login'>;
  onLogin?: (email: string, password: string) => void;
  onRegister?: (fullName: string, email: string, password: string) => void;
  onGoogleAuth?: () => void;
  onAppleAuth?: () => void;
  onForgotPassword?: () => void;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const AuthScreen: React.FC<AuthScreenProps> = ({
  navigation,
  onLogin = (email, password) => {
    Alert.alert(
      'Login Success',
      `Email: ${email}\nPassword: ${password}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TabNavigator'),
        },
      ],
    );
  },
  onRegister = (fullName, email, password) => {
    // Navigate to OTP screen for email verification
    navigation.navigate('OTP', {
      email: email,
      fullName: fullName,
      password: password,
    });
  },
  onGoogleAuth = () => Alert.alert('Google Auth', 'Google authentication pressed'),
  onAppleAuth = () => Alert.alert('Apple Auth', 'Apple authentication pressed'),
  onForgotPassword = () => navigation.navigate('ForgotPassword'),
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const tabPosition = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const inputFocusScale = useSharedValue(0);

  const animatedTabStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabPosition.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedInputStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(inputFocusScale.value, [0, 1], [1, 2]),
    borderColor: inputFocusScale.value === 1 ? '#FF6233' : '#E5E7EB',
  }));

  const switchToTab = (login: boolean) => {
    const windowWidth = 350; // Approximate container width
    tabPosition.value = withSpring(login ? 0 : windowWidth / 2 - 8);
    setIsLogin(login);
  };

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const handleInputFocus = () => {
    inputFocusScale.value = withTiming(1, { duration: 200 });
  };

  const handleInputBlur = () => {
    inputFocusScale.value = withTiming(0, { duration: 200 });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {isLogin ? 'Get Started With' : 'Create an account'}
          </Text>
          {isLogin && <Text style={styles.title}>your Gosholo Journey</Text>}
          <Text style={styles.subtitle}>
            {isLogin ? 'Sign in to your Account' : 'Sign up to get started'}
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <Animated.View style={[styles.tabIndicator, animatedTabStyle]} />
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => switchToTab(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => switchToTab(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {isLogin ? (
          <Animated.View
            entering={SlideInLeft}
            exiting={SlideOutLeft}
            style={styles.formWrapper}
          >
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                onLogin(values.email, values.password);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#9CA3AF"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => {
                          handleBlur('email');
                          handleInputBlur();
                        }}
                        onFocus={handleInputFocus}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </Animated.View>
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => {
                          handleBlur('password');
                          handleInputBlur();
                        }}
                        onFocus={handleInputFocus}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                          size={24}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                    </Animated.View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={onForgotPassword}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <AnimatedTouchableOpacity
                    style={[styles.primaryButton, animatedButtonStyle]}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </AnimatedTouchableOpacity>
                </View>
              )}
            </Formik>
          </Animated.View>
        ) : (
          <Animated.View
            entering={SlideInRight}
            exiting={SlideOutRight}
            style={styles.formWrapper}
          >
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={registerSchema}
              onSubmit={(values) => {
                onRegister(values.fullName, values.email, values.password);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#9CA3AF"
                        value={values.fullName}
                        onChangeText={handleChange('fullName')}
                        onBlur={() => {
                          handleBlur('fullName');
                          handleInputBlur();
                        }}
                        onFocus={handleInputFocus}
                      />
                    </Animated.View>
                    {touched.fullName && errors.fullName && (
                      <Text style={styles.errorText}>{errors.fullName}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#9CA3AF"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => {
                          handleBlur('email');
                          handleInputBlur();
                        }}
                        onFocus={handleInputFocus}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </Animated.View>
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => {
                          handleBlur('password');
                          handleInputBlur();
                        }}
                        onFocus={handleInputFocus}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                          size={24}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                    </Animated.View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#9CA3AF"
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={() => {
                          handleBlur('confirmPassword');
                          handleInputBlur();
                        }}
                        onFocus={handleInputFocus}
                        secureTextEntry={!showConfirmPassword}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <Ionicons
                          name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                          size={24}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                    </Animated.View>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    )}
                  </View>

                  <AnimatedTouchableOpacity
                    style={[styles.primaryButton, animatedButtonStyle]}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Create account</Text>
                  </AnimatedTouchableOpacity>
                </View>
              )}
            </Formik>
          </Animated.View>
        )}

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={onGoogleAuth}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={onAppleAuth}
          >
            <Ionicons name="logo-apple" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <TouchableOpacity onPress={() => switchToTab(!isLogin)}>
            <Text style={styles.bottomLink}>
              {isLogin ? 'Sign Up' : 'Log in'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 4,
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#FF6233',
    borderRadius: 8,
    top: 4,
    left: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  formWrapper: {
    flex: 1,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
  },
  eyeIcon: {
    paddingRight: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#FF6233',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#FF6233',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 12,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: '#6B7280',
    fontSize: 14,
  },
  bottomLink: {
    color: '#FF6233',
    fontSize: 14,
    fontWeight: '600',
  },
});