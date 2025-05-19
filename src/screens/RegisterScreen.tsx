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
} from 'react-native-reanimated';
import { MainStackNavigationProp } from '../navigation/types';

interface RegisterScreenProps {
  navigation: MainStackNavigationProp<'Register'>;
  onRegister?: (fullName: string, email: string, password: string) => void;
  onGoogleSignup?: () => void;
  onAppleSignup?: () => void;
}

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

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation,
  onRegister = (fullName, email, password) => {
    Alert.alert(
      'Registration Success',
      `Name: ${fullName}\nEmail: ${email}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TabNavigator'),
        },
      ],
    );
  },
  onGoogleSignup = () => Alert.alert('Google Signup', 'Google signup pressed'),
  onAppleSignup = () => Alert.alert('Apple Signup', 'Apple signup pressed'),
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'login' | 'register'>('register');
  
  const buttonScale = useSharedValue(1);
  const inputFocusScale = useSharedValue(0);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedInputStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(inputFocusScale.value, [0, 1], [1, 2]),
    borderColor: inputFocusScale.value === 1 ? '#3B82F6' : '#E5E7EB',
  }));

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
          <Text style={styles.title}>Create an account</Text>
          <View style={styles.subtextContainer}>
            <Text style={styles.subtext}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'login' && styles.activeTab,
            ]}
            onPress={() => {
              setSelectedTab('login');
              navigation.navigate('Login');
            }}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'login' && styles.activeTabText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'register' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('register')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'register' && styles.activeTabText,
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

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
                style={[styles.createButton, animatedButtonStyle]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.createButtonText}>Create account</Text>
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
            onPress={onGoogleSignup}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={onAppleSignup}
          >
            <Ionicons name="logo-apple" size={24} color="#000" />
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
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
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
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
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
  createButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  createButtonText: {
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