import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import RoleSwitch from '../components/RoleSwitch';
import { useApp } from '../context/AppContext';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  isValid,
} from '../utils/validation';
import { colors } from '../theme';

export default function SignUpScreen({ navigation }) {
  const { signUp } = useApp();
  const [role, setRole] = useState('customer');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = () => {
    const e = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      password: validatePassword(form.password),
      confirm: !form.confirm
        ? 'Confirm your password'
        : form.confirm !== form.password
        ? 'Passwords do not match'
        : '',
    };
    setErrors(e);
    if (!isValid(e)) return;
    const res = signUp({ ...form, role });
    if (!res.ok) Alert.alert('Sign up failed', res.message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.form}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>🥕</Text>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.sub}>Enter your details to continue</Text>

          <RoleSwitch role={role} onChange={setRole} />

          <AppInput label="Full Name" value={form.name} onChangeText={set('name')} autoCapitalize="words" placeholder="Your name" error={errors.name} />
          <AppInput label="Email" value={form.email} onChangeText={set('email')} keyboardType="email-address" placeholder="you@example.com" error={errors.email} />
          <AppInput label="Phone" value={form.phone} onChangeText={set('phone')} keyboardType="number-pad" maxLength={10} placeholder="10 digit mobile number" error={errors.phone} />
          <AppInput label="Password" value={form.password} onChangeText={set('password')} secureTextEntry placeholder="Minimum 6 characters" error={errors.password} />
          <AppInput label="Confirm Password" value={form.confirm} onChangeText={set('confirm')} secureTextEntry placeholder="Re-enter password" error={errors.confirm} />

          <AppButton title="Sign Up" onPress={onSubmit} style={{ marginTop: 10 }} />

          <Pressable onPress={() => navigation.replace('SignIn')}>
            <Text style={styles.switch}>
              Already have an account? <Text style={{ color: colors.primary }}>Sign In</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  form: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  content: { padding: 25, paddingTop: 20, paddingBottom: 40 },
  logo: { fontSize: 48, textAlign: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  sub: { color: colors.muted, fontSize: 16, marginTop: 6, marginBottom: 22 },
  switch: { textAlign: 'center', marginTop: 24, fontSize: 15, fontWeight: '600', color: colors.text },
});
