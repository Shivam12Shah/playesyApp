import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [showOtp, setShowOtp] = React.useState(false);
    const [otpDigits, setOtpDigits] = React.useState(['', '', '', '', '', '']);
    const inputsRef = React.useRef([]);

    const handleGetOtp = () => {
        if (email) setShowOtp(true);
    };

    const handleOtpChange = (text, idx) => {
        if (/^\d?$/.test(text)) {
            const newOtp = [...otpDigits];
            newOtp[idx] = text;
            setOtpDigits(newOtp);
            if (text && idx < 5) {
                inputsRef.current[idx + 1]?.focus();
            }
        }
    };

    const handleVerifyOtp = () => {
        if (otpDigits.join('') === '123456') {
            navigation.navigate('Main');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome Back</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone number or email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                {!showOtp && (
                    <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
                        <Text style={styles.buttonText}>Get Otp</Text>
                    </TouchableOpacity>
                )}
                {showOtp && (
                    <View style={{ width: '80%', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
                            {otpDigits.map((digit, idx) => (
                                <TextInput
                                    key={idx}
                                    ref={ref => inputsRef.current[idx] = ref}
                                    style={[styles.input, { width: 40, textAlign: 'center', marginHorizontal: 4, paddingHorizontal: 0 }]}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={text => handleOtpChange(text, idx)}
                                    returnKeyType={idx === 5 ? 'done' : 'next'}
                                />
                            ))}
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                            <Text style={styles.buttonText}>Verify OTP</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <Text style={styles.or}>Or continue with</Text>
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialButton}><Text>Facebook</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}><Text>Google</Text></TouchableOpacity>
                </View>
                <Text style={styles.signup}>Don't have an account? <Text style={styles.signupLink}>Sign up</Text></Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 32, color: '#888' },
    input: { width: '80%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
    button: { backgroundColor: '#5B5BD6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, marginBottom: 16 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    or: { marginVertical: 8, color: '#888' },
    socialRow: { flexDirection: 'row', gap: 16, marginBottom: 24 },
    socialButton: { backgroundColor: '#eee', borderRadius: 8, padding: 10, marginHorizontal: 8 },
    signup: { color: '#888' },
    signupLink: { color: '#5B5BD6', fontWeight: '600' },
});

export default LoginScreen;
