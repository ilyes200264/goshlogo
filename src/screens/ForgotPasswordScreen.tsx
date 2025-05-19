import React from 'react';
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
  withSequence,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { MainStackNavigationProp } from '../navigation/types';

interface ForgotPasswordScreenProps {
  navigation: MainStackNavigationProp<'ForgotPassword'>;
  onResetPassword?: (email: string) => void;
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
  onResetPassword = (email) => {
    Alert.alert(
      'Reset Link Sent',
      `Password reset link has been sent to ${email}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ],
    );
  },
}) => {
  const buttonScale = useSharedValue(1);
  const inputFocusScale = useSharedValue(0);
  const checkmarkScale = useSharedValue(0);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedInputStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(inputFocusScale.value, [0, 1], [1, 2]),
    borderColor: inputFocusScale.value === 1 ? '#FF6233' : '#E5E7EB',
  }));

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScale.value }],
    opacity: checkmarkScale.value,
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

  const showSuccessAnimation = () => {
    checkmarkScale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Animated.View 
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.headerContainer}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed-outline" size={48} color="#FF6233" />
          </View>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email to reset your password
          </Text>
        </Animated.View>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => {
            showSuccessAnimation();
            onResetPassword(values.email);
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
            <Animated.View 
              entering={FadeInUp.duration(600).delay(300)}
              style={styles.formContainer}
            >
              <View style={styles.inputContainer}>
                <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#9CA3AF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
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

              <AnimatedTouchableOpacity
                style={[styles.resetButton, animatedButtonStyle]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.resetButtonText}>Send Reset Link</Text>
              </AnimatedTouchableOpacity>

              <View style={styles.successContainer}>
                <Animated.View style={checkmarkAnimatedStyle}>
                  <Ionicons name="checkmark-circle" size={60} color="#10B981" />
                </Animated.View>
              </View>
            </Animated.View>
          )}
        </Formik>

        <Animated.View 
          entering={FadeInUp.duration(600).delay(500)}
          style={styles.loginContainer}
        >
          <Text style={styles.loginText}>Remember your password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Back to Login</Text>
          </TouchableOpacity>
        </Animated.View>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
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
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  resetButton: {
    backgroundColor: '#FF6233',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  loginText: {
    color: '#6B7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#FF6233',
    fontSize: 14,
    fontWeight: '600',
  },
});