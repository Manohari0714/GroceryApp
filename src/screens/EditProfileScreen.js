import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';
import { validateName, validatePhone, validateRequired, isValid } from '../utils/validation';

// Screen 3b: Edit Profile (Customer only)
export default function EditProfileScreen({ navigation }) {
  const { user, updateProfile } = useApp();
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
  });
  const [errors, setErrors] = useState({});
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const e = {
      name: validateName(form.name),
      phone: validatePhone(form.phone),
      address: validateRequired('Address')(form.address),
    };
    setErrors(e);
    if (!isValid(e)) return;
    updateProfile({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    });
    Alert.alert('Saved', 'Your profile has been updated', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 22 }} keyboardShouldPersistTaps="handled">
          <AppInput label="Full Name" value={form.name} onChangeText={set('name')} autoCapitalize="words" error={errors.name} />
          <AppInput label="Email (cannot be changed)" value={user.email} editable={false} style={{ opacity: 0.6 }} />
          <AppInput label="Phone" value={form.phone} onChangeText={set('phone')} keyboardType="number-pad" maxLength={10} error={errors.phone} />
          <AppInput label="Address" value={form.address} onChangeText={set('address')} multiline autoCapitalize="sentences" error={errors.address} />
          <AppButton title="Save Changes" onPress={save} style={{ marginTop: 14 }} />
          <AppButton title="Cancel" variant="outline" onPress={() => navigation.goBack()} style={{ marginTop: 12 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
