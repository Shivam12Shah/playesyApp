import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from '../api/Axios';
// import AppHeader from '../components/AppHeader';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const inputsRef = useRef([]);

    const handleGetOtp = async () => {
        setLoading(true);
        try {
            const response = await Axios.post('/api/user/signup-email', { email });
            if (response.status === 200) {
                setShowOtpInput(true);
            } else {
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

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await Axios.post('/api/user/verify-signup-otp', { email, otp: otpDigits.join('') });
            if (response.status === 200) {
                setShowOtpInput(false);
                setShowNameInput(true);
            } else {
                alert(response.data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'An error occurred');
        }
        setLoading(false);
    };

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await Axios.post('/api/user/complete-signup', { email, firstName, lastName });
            if (response.status === 200) {
                navigation.navigate('Main');
            } else {
                alert(response.data.message || 'Failed to complete signup');
            }
        } catch (error) {
            console.error('Error completing signup:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'An error occurred');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <AppHeader /> */}
            <View style={styles.container}>
                {!showOtpInput && !showNameInput && (
                    <>
                        <Text style={styles.title}>Sign up</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email ID"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleGetOtp} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
                        </TouchableOpacity>
                        <Text style={styles.or}>Or</Text>
                        <TouchableOpacity style={styles.buttonSocial}><Text style={styles.buttonSocialText}>Use phone number</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSocial}><Text style={styles.buttonSocialText}>Sign up with Google</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSocial}><Text style={styles.buttonSocialText}>Sign up with Apple</Text></TouchableOpacity>
                        <Text style={styles.signup}>Already a Playaholic? <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
                    </>
                )}

                {showOtpInput && (
                    <View style={{ width: '80%', alignItems: 'center' }}>
                        <Text style={styles.title}>Enter OTP</Text>
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

                {showNameInput && (
                    <View style={{ width: '80%', alignItems: 'center' }}>
                        <Text style={styles.title}>Kindly share your details</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="First name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last name (Optional)"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 32, color: '#333' },
    input: { width: '80%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
    button: { backgroundColor: '#4A55A1', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, marginBottom: 16, width: '80%', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    or: { marginVertical: 8, color: '#888' },
    buttonSocial: { backgroundColor: '#f0f0f0', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, marginBottom: 12, width: '80%', alignItems: 'center', borderColor: '#ccc', borderWidth: 1 },
    buttonSocialText: { color: '#333', fontSize: 16, fontWeight: '600' },
    signup: { color: '#888', marginTop: 20 },
    signupLink: { color: '#4A55A1', fontWeight: '600' },
});

export default SignupScreen;