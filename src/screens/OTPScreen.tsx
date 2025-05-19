import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  FadeIn,
  FadeInDown,
  ZoomIn,
} from 'react-native-reanimated';
import { MainStackNavigationProp } from '../navigation/types';

interface OTPScreenProps {
  navigation: MainStackNavigationProp<'OTP'>;
  route: {
    params: {
      email: string;
      fullName?: string;
      password?: string;
    };
  };
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const OTPScreen: React.FC<OTPScreenProps> = ({ navigation, route }) => {
  const { email, fullName, password } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<TextInput[]>([]);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const handleOtpChange = (value: string, index: number) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter a complete 6-digit code');
      return;
    }

    try {
      // Here you would typically call your API to verify the OTP
      // For now, we'll simulate a successful verification
      // Example API call:
      // const response = await fetch('https://api.yourapp.com/auth/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, otp: otpCode, fullName, password }),
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Verification Success',
        'Your account has been verified successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('TabNavigator'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP code. Please try again.');
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    Alert.alert('Code Sent', 'A new verification code has been sent to your email');
  };

  const formatEmail = (email: string) => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    
    const username = parts[0];
    const domain = parts[1];
    
    if (username.length <= 3) return email;
    
    const maskedUsername = username.substring(0, 3) + '***';
    return `${maskedUsername}@${domain}`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Animated.View 
          entering={FadeInDown.delay(100)}
          style={styles.headerContainer}
        >
          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to
          </Text>
          <Text style={styles.email}>{formatEmail(email)}</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(200)}
          style={styles.otpContainer}
        >
          {otp.map((digit, index) => (
            <Animated.View
              key={index}
              entering={ZoomIn.delay(300 + index * 100)}
              style={styles.otpInputWrapper}
            >
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref!)}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            </Animated.View>
          ))}
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(400)}
          style={styles.timerContainer}
        >
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in <Text style={styles.timerCount}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend code</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(500)}
          style={styles.buttonContainer}
        >
          <AnimatedTouchableOpacity
            style={[styles.verifyButton, animatedButtonStyle]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleVerify}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </AnimatedTouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(600)}
          style={styles.altMethodContainer}
        >
          <Text style={styles.altMethodText}>Didn't receive a code? </Text>
          <TouchableOpacity>
            <Text style={styles.altMethodLink}>Try a different method</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 32,
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
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  otpInputWrapper: {
    flex: 1,
    marginHorizontal: 6,
  },
  otpInput: {
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
  },
  otpInputFilled: {
    borderColor: '#FF6233',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  timerCount: {
    color: '#FF6233',
    fontWeight: '600',
  },
  resendText: {
    fontSize: 14,
    color: '#FF6233',
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  verifyButton: {
    backgroundColor: '#FF6233',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  altMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  altMethodText: {
    fontSize: 14,
    color: '#6B7280',
  },
  altMethodLink: {
    fontSize: 14,
    color: '#FF6233',
    fontWeight: '600',
  },
});