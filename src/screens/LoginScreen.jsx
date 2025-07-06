import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from '../api/Axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [showOtp, setShowOtp] = React.useState(false);
    const [otpDigits, setOtpDigits] = React.useState(['', '', '', '', '', '']);
    const [loading, setLoading] = React.useState(false);
    const inputsRef = React.useRef([]);

    const handleGetOtp = async() => {
        console.log("email email aa bhi aaya", email);
        
        setLoading(true);
        try {
            const response = await Axios.post('/api/user/email-login', { email });
            console.log("response", response);
            if (response.status === 200) setShowOtp(true);
            else {
                alert(response.data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'An error occurred');
        }
        setLoading(false);
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

    const handleVerifyOtp = async() => {
        setLoading(true);
        try {
            const response = await Axios.post('/api/user/verify-otp', {email, otp: otpDigits.join('') });
            console.log("response", response);
            
            if(response.status === 200) {
                const token = response.data.token;
                console.log(token);
                
                await AsyncStorage.setItem('token', token);
                navigation.navigate('Main');
            } else {
                alert(response.data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'An error occurred');
        }
        setLoading(false);
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
                    <TouchableOpacity style={styles.button} onPress={handleGetOtp} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Get Otp</Text>}
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
                        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
                        </TouchableOpacity>
                    </View>
                )}
                <Text style={styles.or}>Or continue with</Text>
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.buttonSocial}><Text style={styles.buttonSocialText}>Continue with Facebook</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSocial}><Text style={styles.buttonSocialText}>Continue with Google</Text></TouchableOpacity>
                </View>
                <Text style={styles.signup}>Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>Sign up</Text></Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 32, color: '#888' },
    input: { width: '80%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
    button: { backgroundColor: '#4A55A1', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, marginBottom: 16, width: '80%', alignItems: 'center'  },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    or: { marginVertical: 8, color: '#888' },
    socialRow: { flexDirection: 'column', gap: 12, marginBottom: 24, width: '80%' },
    buttonSocial: { backgroundColor: '#f0f0f0', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, marginBottom: 12, width: '100%', alignItems: 'center', borderColor: '#ccc', borderWidth: 1 },
    buttonSocialText: { color: '#333', fontSize: 16, fontWeight: '600' },
    signup: { color: '#888' },
    signupLink: { color: '#4A55A1', fontWeight: '600' },
});

export default LoginScreen;
