import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function AppInput({ label, error, style, ...props }) {
  return (
    <View style={[{ marginBottom: 18 }, style]}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholderTextColor="#B0B0B0"
        style={[styles.input, !!error && { borderBottomColor: colors.danger }]}
        autoCapitalize="none"
        {...props}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.muted, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  input: {
    fontSize: 17,
    color: colors.text,
    paddingVertical: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
  },
  error: { color: colors.danger, fontSize: 13, marginTop: 4 },
});
