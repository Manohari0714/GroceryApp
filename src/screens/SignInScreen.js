import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import RoleSwitch from '../components/RoleSwitch';
import { useApp } from '../context/AppContext';
import { validateEmail, validatePassword, isValid } from '../utils/validation';
import { colors } from '../theme';

export default function SignInScreen({ navigation }) {
  const { signIn } = useApp();
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const e = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(e);
    if (!isValid(e)) return;
    const res = signIn({ email, password, role });
    if (!res.ok) Alert.alert('Sign in failed', res.message);
    // on success the RootNavigator switches to the main app automatically
  };

  const fillDemo = () => {
    if (role === 'admin') {
      setEmail('admin@grocery.com');
      setPassword('admin123');
    } else {
      setEmail('customer@grocery.com');
      setPassword('customer123');
    }
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>🥕</Text>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.sub}>Enter your email and password</Text>

          <RoleSwitch role={role} onChange={setRole} />

          <AppInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="you@example.com"
            error={errors.email}
          />
          <AppInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••"
            error={errors.password}
          />

          <Pressable onPress={fillDemo}>
            <Text style={styles.demo}>Use demo {role} login</Text>
          </Pressable>

          <AppButton title="Log In" onPress={onSubmit} style={{ marginTop: 10 }} />

          <Pressable onPress={() => navigation.replace('SignUp')}>
            <Text style={styles.switch}>
              Don't have an account? <Text style={{ color: colors.primary }}>Signup</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 25, paddingTop: 20 },
  logo: { fontSize: 48, textAlign: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  sub: { color: colors.muted, fontSize: 16, marginTop: 6, marginBottom: 22 },
  demo: { color: colors.primary, fontWeight: '600', textAlign: 'right' },
  switch: { textAlign: 'center', marginTop: 24, fontSize: 15, fontWeight: '600', color: colors.text },
});
