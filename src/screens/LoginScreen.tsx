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
  TouchableWithoutFeedback,
  Keyboard,
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
} from 'react-native-reanimated';
import { MainStackNavigationProp, TabParamList } from '../navigation';

interface LoginScreenProps {
  navigation: MainStackNavigationProp<'Login'>;
  onLogin?: (email: string, password: string) => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  onForgotPassword?: () => void;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const LoginScreen: React.FC<LoginScreenProps> = ({
  navigation,
  onLogin = (email, password) => {
    Alert.alert(
      'Login Success',
      `Email: ${email}\nPassword: ${password}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TabNavigator', { screen: 'Home' }),
        },
      ],
    );
  },
  onGoogleLogin = () => Alert.alert('Google Login', 'Google login pressed'),
  onAppleLogin = () => Alert.alert('Apple Login', 'Apple login pressed'),
  onForgotPassword = () => navigation.navigate('ForgotPassword'),
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const buttonScale = useSharedValue(1);
  const emailFocus = useSharedValue(0);
  const passwordFocus = useSharedValue(0);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedEmailInputStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(emailFocus.value, [0, 1], [1, 2]),
    borderColor: emailFocus.value === 1 ? '#FF6233' : '#E5E7EB',
  }));

  const animatedPasswordInputStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(passwordFocus.value, [0, 1], [1, 2]),
    borderColor: passwordFocus.value === 1 ? '#FF6233' : '#E5E7EB',
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Get Started With</Text>
            <Text style={styles.title}>your Fitness Journey</Text>
            <Text style={styles.subtitle}>Sign in to your Account</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, styles.activeTab]}
              accessible
              accessibilityLabel="Login Tab"
            >
              <Text style={[styles.tabText, styles.activeTabText]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
            onPress={() => navigation.navigate('Register' as any)}
              accessible
              accessibilityLabel="Register Tab"
            >
              <Text style={styles.tabText}>Register</Text>
            </TouchableOpacity>
          </View>

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
                  <Animated.View style={[styles.inputWrapper, animatedEmailInputStyle]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#9CA3AF"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => {
                        handleBlur('email');
                        emailFocus.value = withTiming(0, { duration: 200 });
                      }}
                      onFocus={() => {
                        emailFocus.value = withTiming(1, { duration: 200 });
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      accessible
                      accessibilityLabel="Email Input"
                    />
                  </Animated.View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Animated.View style={[styles.inputWrapper, animatedPasswordInputStyle]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#9CA3AF"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => {
                        handleBlur('password');
                        passwordFocus.value = withTiming(0, { duration: 200 });
                      }}
                      onFocus={() => {
                        passwordFocus.value = withTiming(1, { duration: 200 });
                      }}
                      secureTextEntry={!showPassword}
                      accessible
                      accessibilityLabel="Password Input"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                      accessible
                      accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
                  accessible
                  accessibilityLabel="Forgot Password"
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <AnimatedTouchableOpacity
                  style={[styles.loginButton, animatedButtonStyle]}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={() => handleSubmit()}
                  accessible
                  accessibilityLabel="Login Button"
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </AnimatedTouchableOpacity>
              </View>
            )}
          </Formik>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={onGoogleLogin}
              accessible
              accessibilityLabel="Login with Google"
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={onAppleLogin}
              accessible
              accessibilityLabel="Login with Apple"
            >
              <Ionicons name="logo-apple" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FF6233',
    borderColor: '#FF6233',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
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
  loginButton: {
    backgroundColor: '#FF6233',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
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
});
